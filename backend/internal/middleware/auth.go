package middleware

import (
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/MicahParks/keyfunc/v3"
	"github.com/golang-jwt/jwt/v5"

	"github.com/KBM2795/skynet/backend/pkg/response"
)

// Context keys for extracting user info downstream.
type contextKey string

const (
	UserClaimsKey contextKey = "user_claims"
	UserIDKey     contextKey = "user_id"
	UserEmailKey  contextKey = "user_email"
)

// SupabaseClaims holds the JWT claims issued by Supabase Auth.
type SupabaseClaims struct {
	Email        string                 `json:"email"`
	Role         string                 `json:"role"`
	UserMetadata map[string]interface{} `json:"user_metadata"`
	AppMetadata  map[string]interface{} `json:"app_metadata"`
	jwt.RegisteredClaims
}

// Auth returns middleware that validates Supabase JWTs.
//
// It supports both verification methods:
//   - JWKS (asymmetric keys like ES256/RS256) — preferred, uses public keys fetched from Supabase
//   - HS256 shared secret — legacy fallback
//
// The middleware tries JWKS first. If JWKS is not configured, it falls back to the shared secret.
func Auth(supabaseProjectURL string, jwtSecret string) func(http.Handler) http.Handler {
	// ── Set up JWKS keyfunc (fetches public keys from Supabase) ──
	var jwksKeyFunc jwt.Keyfunc

	if supabaseProjectURL != "" {
		jwksURL := supabaseProjectURL + "/auth/v1/.well-known/jwks.json"
		k, err := keyfunc.NewDefault([]string{jwksURL})
		if err != nil {
			log.Printf("⚠️  Failed to create JWKS keyfunc: %v (falling back to HS256)", err)
		} else {
			jwksKeyFunc = k.Keyfunc
			log.Printf("🔑 JWKS verification enabled  [url=%s]", jwksURL)
		}
	}

	// ── HS256 fallback keyfunc ──
	hs256KeyFunc := func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(jwtSecret), nil
	}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// ── Extract token from Authorization header ──────────
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
				response.Error(w, http.StatusUnauthorized, "Missing or malformed authorization token")
				return
			}

			tokenString := strings.TrimPrefix(authHeader, "Bearer ")

			// ── Try JWKS verification first (ES256/RS256), fall back to HS256 ──
			var token *jwt.Token
			var err error

			if jwksKeyFunc != nil {
				token, err = jwt.ParseWithClaims(tokenString, &SupabaseClaims{}, jwksKeyFunc)
			}

			// If JWKS failed or wasn't available, try HS256 shared secret.
			if (jwksKeyFunc == nil || err != nil) && jwtSecret != "" {
				token, err = jwt.ParseWithClaims(tokenString, &SupabaseClaims{}, hs256KeyFunc)
			}

			if err != nil || token == nil || !token.Valid {
				response.Error(w, http.StatusUnauthorized, "Invalid or expired token")
				return
			}

			claims, ok := token.Claims.(*SupabaseClaims)
			if !ok {
				response.Error(w, http.StatusUnauthorized, "Invalid token claims")
				return
			}

			// ── Inject user info into request context ────────────
			ctx := r.Context()
			ctx = context.WithValue(ctx, UserIDKey, claims.Subject)
			ctx = context.WithValue(ctx, UserEmailKey, claims.Email)
			ctx = context.WithValue(ctx, UserClaimsKey, claims)

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// GetUserID extracts the authenticated user's ID from the request context.
func GetUserID(ctx context.Context) string {
	if id, ok := ctx.Value(UserIDKey).(string); ok {
		return id
	}
	return ""
}

// GetUserEmail extracts the authenticated user's email from the request context.
func GetUserEmail(ctx context.Context) string {
	if email, ok := ctx.Value(UserEmailKey).(string); ok {
		return email
	}
	return ""
}

// GetUserClaims extracts the full Supabase JWT claims from the request context.
func GetUserClaims(ctx context.Context) *SupabaseClaims {
	if claims, ok := ctx.Value(UserClaimsKey).(*SupabaseClaims); ok {
		return claims
	}
	return nil
}

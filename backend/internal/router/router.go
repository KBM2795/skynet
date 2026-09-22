package router

import (
	"net/http"

	"github.com/KBM2795/skynet/backend/internal/config"
	"github.com/KBM2795/skynet/backend/internal/handler"
	"github.com/KBM2795/skynet/backend/internal/middleware"
)

// Setup creates the root http.Handler with all routes and middleware applied.
func Setup(cfg *config.Config) http.Handler {
	mux := http.NewServeMux()

	// ── Public routes ───────────────────────────────────────
	mux.HandleFunc("GET /api/health", handler.HealthCheck)

	// ── Protected routes (require Supabase JWT) ─────────────
	authMw := middleware.Auth(cfg.SupabaseURL, cfg.JWTSecret)
	mux.Handle("GET /api/v1/user/profile", authMw(http.HandlerFunc(handler.GetUserProfile)))

	// ── Future route groups ─────────────────────────────────
	// mux.Handle("GET  /api/v1/...", authMw(http.HandlerFunc(handler.SomeHandler)))
	// mux.Handle("POST /api/v1/...", authMw(http.HandlerFunc(handler.AnotherHandler)))

	// Apply global middleware chain (outermost runs first).
	var h http.Handler = mux
	h = middleware.Logger(h)
	h = middleware.CORS(h)

	return h
}

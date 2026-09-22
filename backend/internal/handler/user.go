package handler

import (
	"log"
	"net/http"
	"time"

	"github.com/KBM2795/skynet/backend/internal/database"
	"github.com/KBM2795/skynet/backend/internal/middleware"
	"github.com/KBM2795/skynet/backend/internal/model"
	"github.com/KBM2795/skynet/backend/pkg/response"
)

// GetUserProfile returns the authenticated user's profile.
// If the user doesn't exist in the users table yet (first login after Supabase signup),
// it auto-creates the row from the JWT claims.
func GetUserProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	userID := middleware.GetUserID(ctx)
	claims := middleware.GetUserClaims(ctx)

	if userID == "" || claims == nil {
		response.Error(w, http.StatusUnauthorized, "Unable to identify user")
		return
	}

	var user model.User
	result := database.DB.Preload("Organization").First(&user, "id = ?", userID)

	if result.Error != nil {
		// ── Auto-sync: first login → create user + org from JWT claims ──
		fullName := ""
		avatarURL := ""
		orgName := ""
		orgSlug := ""
		role := "user"

		if claims.UserMetadata != nil {
			if name, ok := claims.UserMetadata["full_name"].(string); ok {
				fullName = name
			}
			if avatar, ok := claims.UserMetadata["avatar_url"].(string); ok {
				avatarURL = avatar
			}
			if on, ok := claims.UserMetadata["organization_name"].(string); ok {
				orgName = on
			}
			if os, ok := claims.UserMetadata["organization_slug"].(string); ok {
				orgSlug = os
			}
			if r, ok := claims.UserMetadata["role"].(string); ok {
				role = r
			}
		}

		now := time.Now()
		user = model.User{
			ID:        userID,
			Email:     claims.Email,
			FullName:  fullName,
			AvatarURL: avatarURL,
			Role:      role,
			IsActive:  true,
			LastLogin: &now,
		}

		// If the user signed up with an organization, create it and link.
		if orgName != "" {
			org := model.Organization{
				Name: orgName,
				Slug: orgSlug,
			}
			if err := database.DB.Create(&org).Error; err != nil {
				log.Printf("⚠️  Failed to create organization: %v", err)
				// Continue — user can still be created without an org.
			} else {
				user.OrganizationID = &org.ID
			}
		}

		if err := database.DB.Create(&user).Error; err != nil {
			response.Error(w, http.StatusInternalServerError, "Failed to create user profile")
			return
		}

		// Re-fetch with organization preloaded.
		database.DB.Preload("Organization").First(&user, "id = ?", userID)
	} else {
		// ── Update last_login timestamp ──────────────────────
		now := time.Now()
		database.DB.Model(&user).Update("last_login", now)
		user.LastLogin = &now
	}

	response.Success(w, "User profile retrieved", user)
}

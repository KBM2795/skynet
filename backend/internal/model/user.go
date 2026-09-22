package model

import (
	"time"
)

// Organization represents a tenant/team in SkyNet.
type Organization struct {
	ID        string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	Slug      string    `gorm:"uniqueIndex" json:"slug"`
	CreatedAt time.Time `json:"created_at"`
}

// User represents an authenticated user, linked to Supabase auth.users via ID.
type User struct {
	ID             string        `gorm:"type:uuid;primaryKey" json:"id"` // matches auth.users(id)
	Email          string        `gorm:"uniqueIndex;not null" json:"email"`
	FullName       string        `json:"full_name"`
	AvatarURL      string        `json:"avatar_url"`
	Role           string        `gorm:"default:'user'" json:"role"`
	OrganizationID *string       `gorm:"type:uuid;index" json:"organization_id"`
	Organization   *Organization `gorm:"foreignKey:OrganizationID" json:"organization,omitempty"`
	IsActive       bool          `gorm:"default:true" json:"is_active"`
	LastLogin      *time.Time    `json:"last_login"`
	CreatedAt      time.Time     `json:"created_at"`
	UpdatedAt      time.Time     `json:"updated_at"`
}

package model

import (
	"time"

	"gorm.io/gorm"
)

// BaseModel provides common fields for all models.
// Supabase tables will have these columns automatically.
type BaseModel struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

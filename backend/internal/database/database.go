package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/KBM2795/skynet/backend/internal/config"
)

// DB is the global GORM database handle.
var DB *gorm.DB

// Connect initialises the GORM PostgreSQL connection.
func Connect(cfg config.DBConfig, env string) {
	var logLevel logger.LogLevel
	if env == "development" {
		logLevel = logger.Info // log all SQL in dev
	} else {
		logLevel = logger.Warn
	}

	var err error
	DB, err = gorm.Open(postgres.Open(cfg.DSN()), &gorm.Config{
		Logger: logger.Default.LogMode(logLevel),
	})
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}

	// Configure connection pool.
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("❌ Failed to get underlying sql.DB: %v", err)
	}
	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetMaxIdleConns(10)

	log.Printf("✅ Database connected  [host=%s dbname=%s]", cfg.Host, cfg.Name)
}

// Migrate runs GORM's AutoMigrate on the provided models.
// Call this after Connect with your model structs.
//
//	database.Migrate(&model.User{}, &model.Project{})
func Migrate(models ...interface{}) {
	if err := DB.AutoMigrate(models...); err != nil {
		log.Fatalf("❌ Migration failed: %v", err)
	}
	log.Println("✅ Database migration complete")
}

// Close gracefully closes the database connection.
func Close() {
	sqlDB, err := DB.DB()
	if err != nil {
		log.Printf("⚠️  Error getting sql.DB for close: %v", err)
		return
	}
	sqlDB.Close()
	log.Println("Database connection closed")
}

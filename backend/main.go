package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/KBM2795/skynet/backend/internal/config"
	"github.com/KBM2795/skynet/backend/internal/database"
	"github.com/KBM2795/skynet/backend/internal/router"
)

func main() {
	cfg := config.Load()

	// ── Database ────────────────────────────────────────────
	database.Connect(cfg.DB, cfg.Environment)
	defer database.Close()

	// Auto-migrate models (add your model structs here).
	// database.Migrate(&model.User{})

	// ── HTTP Server ─────────────────────────────────────────
	srv := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      router.Setup(cfg),
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine so we can handle graceful shutdown.
	go func() {
		log.Printf("🚀 SkyNet backend starting on http://localhost:%s  [env=%s]", cfg.Port, cfg.Environment)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed: %v", err)
		}
	}()

	// Block until we receive SIGINT or SIGTERM.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited cleanly")
}

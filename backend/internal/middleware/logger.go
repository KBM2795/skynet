package middleware

import (
	"log"
	"net/http"
	"time"
)

// Logger logs each incoming request with method, path, and duration.
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%-6s %s  %v", r.Method, r.URL.Path, time.Since(start))
	})
}

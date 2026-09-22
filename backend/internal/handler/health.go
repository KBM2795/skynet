package handler

import (
	"net/http"

	"github.com/KBM2795/skynet/backend/pkg/response"
)

// HealthCheck returns service status — useful for uptime monitoring and k8s probes.
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	response.Success(w, "SkyNet backend is running", map[string]string{
		"status": "healthy",
	})
}

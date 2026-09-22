package response

import (
	"encoding/json"
	"net/http"
)

// APIResponse is the standard envelope for all JSON API responses.
type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

// JSON writes a JSON response with the given status code.
func JSON(w http.ResponseWriter, status int, payload APIResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

// Success sends a 200 OK response with data.
func Success(w http.ResponseWriter, message string, data interface{}) {
	JSON(w, http.StatusOK, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// Error sends an error response with the given status code.
func Error(w http.ResponseWriter, status int, message string) {
	JSON(w, status, APIResponse{
		Success: false,
		Message: message,
	})
}

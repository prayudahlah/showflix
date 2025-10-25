package utils

import "errors"

// Common application errors
var (
	ErrNotFound     = errors.New("resource not found")
	ErrInvalidInput = errors.New("invalid input")
	ErrUnauthorized = errors.New("unauthorized")
	ErrInternal     = errors.New("internal server error")
	ErrDBConnection = errors.New("database connection failed")
)

// ErrorResponse untuk JSON response yang konsisten
type ErrorResponse struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Details string `json:"details,omitempty"`
}

// Predefined error responses
var (
	ErrResponseNotFound     = &ErrorResponse{Code: "not_found", Message: "Resource not found"}
	ErrResponseInvalidInput = &ErrorResponse{Code: "invalid_input", Message: "Invalid input provided"}
	ErrResponseInternal     = &ErrorResponse{Code: "internal_error", Message: "Internal server error"}
	ErrResponseTimeout      = &ErrorResponse{Code: "timeout", Message: "Request Timeout"}
)

// Helper functions
func NewErrorResponse(code, message string) *ErrorResponse {
	return &ErrorResponse{
		Code:    code,
		Message: message,
	}
}

func WithDetails(errResp *ErrorResponse, details string) *ErrorResponse {
	return &ErrorResponse{
		Code:    errResp.Code,
		Message: errResp.Message,
		Details: details,
	}
}

package com.exploresg.authservice.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for Google OAuth authentication.
 *
 * Frontend sends this when user completes Google OAuth flow.
 * Contains the JWT token received from Google.
 *
 * Example request body:
 * {
 *   "googleToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5N..."
 * }
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoogleAuthRequest {

    /**
     * JWT token received from Google OAuth.
     * This is the token that Google returns to the frontend
     * after successful authentication.
     *
     * Validation:
     * - Must not be blank (prevents empty requests)
     * - Spring will return 400 Bad Request if validation fails
     */
    @NotBlank
    private String googleToken;

}

package com.exploresg.authservice.controller;

import com.exploresg.authservice.dto.AuthResponse;
import com.exploresg.authservice.dto.GoogleAuthRequest;
import com.exploresg.authservice.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authentication controller handling OAuth login flows.
 *
 * This controller provides endpoints for user authentication
 * via external OAuth providers (Google, GitHub, etc.).
 *
 * Endpoints:
 * - POST /api/v1/auth/google - Authenticate with Google OAuth
 *
 * All endpoints are PUBLIC (no authentication required).
 * These are configured as public in AuthSecurityConfig.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    public final AuthenticationService authenticationService;

    public ResponseEntity<AuthResponse> authenticateWithGoogle(@Valid @RequestBody GoogleAuthRequest googleAuthRequest){

        log.info("Received Google authentication request");

        // Delegate to service layer for business logic
        AuthResponse authResponse = authenticationService.authenticateWithGoogle(googleAuthRequest.getGoogleToken());

        log.info("Google authentication successful for user: {}",
                authResponse.getUserInfo().getEmail());

        return ResponseEntity.ok(authResponse);
    }
}

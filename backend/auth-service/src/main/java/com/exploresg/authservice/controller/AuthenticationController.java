    package com.exploresg.authservice.controller;

    import com.exploresg.authservice.dto.AuthResponse;
    import com.exploresg.authservice.dto.GoogleAuthRequest;
    import com.exploresg.authservice.service.AuthenticationService;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.PostMapping;
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

        private final AuthenticationService authenticationService;

        /**
         * Authenticate user with Google OAuth token.
         *
         * Frontend flow:
         * 1. User clicks "Sign in with Google"
         * 2. Google OAuth popup opens
         * 3. User authenticates with Google
         * 4. Google returns JWT token to frontend
         * 5. Frontend sends token to this endpoint
         * 6. Backend validates token and returns OUR JWT
         *
         * Request body example:
         * {
         *   "googleToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5N..."
         * }
         *
         * Response example:
         * {
         *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
         *   "requiresProfileSetup": true,
         *   "userInfo": {
         *     "userId": "a1b2c3d4-...",
         *     "email": "john@gmail.com",
         *     "givenName": "John",
         *     "familyName": "Doe",
         *     "picture": "https://..."
         *   }
         * }
         *
         * @param googleAuthRequest GoogleAuthRequest containing Google's JWT token
         * @return AuthResponse with our JWT and user information
         */
        @PostMapping("/google")
        public ResponseEntity<AuthResponse> authenticateWithGoogle(@Valid @RequestBody GoogleAuthRequest googleAuthRequest){

            log.info("Received Google authentication request");

            // Delegate to service layer for business logic
            AuthResponse authResponse = authenticationService.authenticateWithGoogle(googleAuthRequest.getGoogleToken());

            log.info("Google authentication successful for user: {}",
                    authResponse.getUserInfo().getEmail());

            return ResponseEntity.ok(authResponse);
        }
    }

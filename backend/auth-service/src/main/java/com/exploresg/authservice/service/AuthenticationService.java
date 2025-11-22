package com.exploresg.authservice.service;

import com.exploresg.authservice.dto.AuthResponse;
import com.exploresg.common.model.IdentityProvider;
import com.exploresg.common.model.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Authentication service that orchestrates the OAuth login flow.
 *
 * This service coordinates multiple components to complete authentication:
 * 1. Google JWT validation (using Spring Security's JwtDecoder)
 * 2. User provisioning (find existing or create new via UserService)
 * 3. Token generation (create our custom JWT via JwtService)
 * 4. Response building (package everything for frontend)
 *
 * Why this service exists:
 * - Separates OAuth orchestration from user management (UserService)
 * - Separates OAuth logic from token generation (JwtService)
 * - Provides single entry point for all authentication flows
 * - Makes it easy to add new providers (GitHub, Apple) later
 */
@Slf4j
@Service
@AllArgsConstructor
public class AuthenticationService {

    private final JwtDecoder jwtDecoder;
    private final UserService userService;
    private final JwtService jwtService;

    /**
     * Authenticate user with Google OAuth token.
     *
     * This is the main orchestration method for Google OAuth login.
     * It handles both first-time users (signup) and returning users (login).
     *
     * Flow:
     * 1. Validate Google's JWT token (signature, expiration, issuer)
     * 2. Extract user information from Google's JWT claims
     * 3. Find existing user OR create new user in database
     * 4. Update user info from Google (picture/name may have changed)
     * 5. Generate OUR custom JWT with our structure
     * 6. Build and return authentication response
     *
     * Security:
     * - Never trust the frontend - always validate Google's token
     * - Use Google's signature verification (prevents tampering)
     * - Check token expiration (prevents replay attacks)
     * - Verify issuer is Google (prevents token substitution)
     *
     * @param googleToken The JWT token received from Google OAuth
     * @return AuthResponse containing our custom JWT and user information
     * @throws JwtException if token is
     *                      invalid
     */
    public AuthResponse authenticateWithGoogle(String googleToken) {
        // ============================================
        // STEP 1: Validate Google's JWT
        // ============================================
        // JwtDecoder does:
        // - Signature verification (uses Google's public keys)
        // - Expiration check (exp claim)
        // - Issuer verification (iss claim = accounts.google.com)
        // - Format validation (header.payload.signature structure)
        Jwt jwt = jwtDecoder.decode(googleToken);

        // ============================================
        // STEP 2: Extract User Information from Google JWT
        // ============================================
        // Google's JWT standard claims:
        // - sub: Google's unique user ID (never changes, even if email changes)
        // - email: User's email address
        // - given_name: First name
        // - family_name: Last name
        // - picture: Profile picture URL
        String providerSub = jwt.getSubject();
        String email = jwt.getClaimAsString("email");
        String givenName = jwt.getClaimAsString("givenName");
        String familyName = jwt.getClaimAsString("familyName");
        String picture = jwt.getClaimAsString("picture");

        log.debug("Extracted User Info - email: {}, providerSub: {} ", email, providerSub);

        // ============================================
        // STEP 3: Find or Create User
        // ============================================
        // Check if user already exists with this email + provider combination
        Optional<User> existingUser = userService.findByEmailAndIdentityProvider(
                email,
                IdentityProvider.GOOGLE);

        User user;
        if (existingUser.isPresent()) {
            // Returning user - update their info (picture/name may have changed)
            user = existingUser.get();
            log.info("Existing user found with UUID: {}", user.getUserId());

            // Update profile information from Google
            // (User might have changed their Google profile picture or name)
            updateUserFromGoogle(user, givenName, familyName, picture);
        } else {
            // New user - create account
            log.info("New user signing up with email: {}", email);
            user = userService.createUser(email, providerSub, givenName, familyName, picture);
            log.info("Created new user with UUID: {}", user.getUserId());
        }

        // ============================================
        // STEP 4: Generate OUR Custom JWT
        // ============================================
        // This JWT has OUR structure:
        // - sub: Our internal UUID (not Google's sub)
        // - roles: User's roles in our system
        // - Custom claims: userId, givenName, familyName, picture
        String customJwt = jwtService.generateToken(user);
        log.debug("Generated custom JWT token for user: {}", user.getUserId());

        // ============================================
        // STEP 5: Build Authentication Response
        // ============================================
        // Return everything the frontend needs:
        // - Our JWT token (for subsequent API calls)
        // - User information (for displaying in UI)
        // - Profile setup flag (to redirect if needed)

        // Build nested UserInfo object
        AuthResponse.UserInfo userInfo = AuthResponse.UserInfo.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .givenName(user.getGivenName())
                .familyName(user.getFamilyName())
                .picture(user.getPicture())
                .build();

        // Build main AuthResponse with nested userInfo
        return AuthResponse.builder()
                .token(customJwt)
                .requiresProfileSetup(false) // TODO: Check if user has completed profile
                .userInfo(userInfo)
                .build();
    }

    private void updateUserFromGoogle(User user,
            String givenName,
            String familyName,
            String picture) {

    }

}

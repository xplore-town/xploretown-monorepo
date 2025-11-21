package com.exploresg.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Response DTO returned after successful authentication.
 *
 * Returned by:
 * - POST /api/v1/auth/google (Google OAuth login)
 *
 * Contains:
 * - JWT token for subsequent authenticated requests
 * - Flag indicating if user needs to complete profile
 * - User information for frontend display
 *
 * This DTO never exposes:
 * - Internal database ID (User.id)
 * - Password hash
 * - Provider sub
 * - Audit timestamps
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    /**
     * JWT token for authentication.
     * Frontend stores this and sends in Authorization header:
     * Authorization: Bearer {token}
     */
    private String token;

    /**
     * Indicates if user needs to complete their profile.
     *
     * true = User just signed up, needs to provide phone, DOB, license
     * false = User already has complete profile
     *
     * Frontend uses this to redirect to profile setup page.
     */
    private boolean requiresProfileSetup;

    /**
     * User information for frontend display.
     * Populated from User and UserProfile entities.
     */
    private UserInfo userInfo;

    /**
     * Nested DTO containing user details.
     *
     * Separates user info from authentication metadata (token, requiresProfileSetup).
     * Makes the API response structure clear and organized.
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInfo {

        /**
         * User's external UUID (NOT database ID).
         * This is what goes in the JWT 'sub' claim.
         */
        private UUID userId;

        /**
         * User's email address.
         */
        private String email;

        /**
         * User's given name (first name).
         */
        private String givenName;

        /**
         * User's family name (last name).
         */
        private String familyName;

        /**
         * User's profile picture URL from OAuth provider.
         */
        private String picture;

        // ============================================
        // PROFILE FIELDS (may be null if profile not set up)
        // ============================================

        /**
         * User's phone number.
         * Null if profile not completed.
         */
        private String phone;

        /**
         * User's date of birth (ISO format: YYYY-MM-DD).
         * Null if profile not completed.
         */
        private String dateOfBirth;

        /**
         * User's driving license number.
         * Null if profile not completed.
         */
        private String drivingLicenseNumber;

        /**
         * User's passport number.
         * Null if profile not completed.
         */
        private String passportNumber;

        /**
         * User's preferred language (ISO 639-1 code).
         * Examples: "en", "zh-CN", "ms"
         * Null if profile not completed.
         */
        private String preferredLanguage;

        /**
         * User's country of residence (ISO 3166-1 alpha-2 code).
         * Examples: "SG", "US", "GB"
         * Null if profile not completed.
         */
        private String countryOfResidence;
    }
}
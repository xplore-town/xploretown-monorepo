package com.exploresg.authservice.dto;

import com.exploresg.common.model.Role;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

/**
 * Request DTO for completing user profile after initial signup.
 *
 * Received by:
 * - POST /api/v1/signup
 *
 * User has already authenticated via Google OAuth and has a User entity.
 * This request creates or updates the UserProfile with additional information
 * required for booking vehicles.
 *
 * All fields are optional because:
 * - User might complete profile in multiple steps
 * - Some fields may not be applicable (e.g., passportNumber for locals)
 */
@Data
public class SignupProfileRequest {

    // ============================================
    // OPTIONAL NAME OVERRIDES
    // ============================================

    /**
     * Override given name from OAuth provider.
     * If provided, updates User.givenName.
     */
    private String givenName;

    /**
     * Override family name from OAuth provider.
     * If provided, updates User.familyName.
     */
    private String familyName;

    // ============================================
    // PROFILE FIELDS
    // ============================================

    /**
     * User's phone number.
     * Format is flexible to support international numbers.
     *
     * Examples: "+65 1234 5678", "+1-555-123-4567"
     */
    @Pattern(regexp = "^\\+?[0-9\\s\\-()]+$",
            message = "Invalid phone number format")
    private String phone;

    /**
     * User's date of birth.
     * Must be in the past (validation).
     * Required for age verification (21+ for vehicle rental).
     */
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    /**
     * User's driving license number.
     * Required for vehicle rental.
     */
    private String drivingLicenseNumber;

    /**
     * User's passport number (optional).
     * Required for international tourists renting vehicles.
     */
    private String passportNumber;

    /**
     * User's preferred language (ISO 639-1 code).
     * Used for UI localization and email notifications.
     *
     * Examples: "en", "zh-CN", "ms", "ta"
     */
    @Pattern(regexp = "^[a-z]{2}(-[A-Z]{2})?$",
            message = "Invalid language code format (use ISO 639-1)")
    private String preferredLanguage;

    /**
     * User's country of residence (ISO 3166-1 alpha-2 code).
     * Used for tax and regulatory purposes.
     *
     * Examples: "SG", "US", "GB", "CN"
     */
    @Pattern(regexp = "^[A-Z]{2}$",
            message = "Invalid country code format (use ISO 3166-1 alpha-2)")
    private String countryOfResidence;

    // ============================================
    // ROLE REQUEST (Security Consideration)
    // ============================================

    /**
     * Requested role for the user.
     *
     * ⚠️ SECURITY CONSIDERATION:
     * In production, this should either:
     * 1. Be removed entirely (users shouldn't pick their own roles)
     * 2. Be validated to only allow Role.USER (admin upgrades manually)
     *
     * Currently kept for development/testing flexibility.
    private Role requestedRole;
     */
}
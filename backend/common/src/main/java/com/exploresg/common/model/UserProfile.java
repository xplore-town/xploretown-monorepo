package com.exploresg.common.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * UserProfile entity containing additional user information.
 *
 * This is separate from User because:
 * 1. User is created immediately on OAuth login
 * 2. UserProfile is created later when user needs to book/transact
 * 3. Keeps User table lean for authentication queries
 * 4. Allows optional collection of sensitive data
 *
 * Uses @MapsId to share primary key with User entity.
 * This means UserProfile.id always equals User.id.
 *
 * Relationship: User (1) <---> (1) UserProfile
 */
@Entity
@Table(name = "user_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    /**
     * Primary key - same value as User.id.
     * This is NOT auto-generated; it's mapped from User via @MapsId.
     */
    @Id
    private Long id;

    /**
     * Reference to the User entity.
     * @MapsId tells JPA to use User.id as this entity's id.
     * This creates a perfect 1:1 relationship with shared PK.
     */
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    // ============================================
    // CONTACT INFORMATION
    // ============================================

    /**
     * User's phone number for booking confirmations and support.
     * Format is flexible to support international numbers.
     */
    private String phone;

    // ============================================
    // PERSONAL INFORMATION
    // ============================================

    /**
     * User's date of birth.
     * Required for:
     * - Age verification (21+ for vehicle rental)
     * - Insurance purposes
     * - Legal compliance
     */
    private LocalDate dateOfBirth;

    /**
     * User's driving license number.
     * Required for vehicle rental verification and insurance.
     */
    private String drivingLicenseNumber;

    /**
     * User's passport number (optional).
     * Used for international tourists and travel services.
     */
    private String passportNumber;

    // ============================================
    // PREFERENCES
    // ============================================

    /**
     * User's preferred language for UI and communications.
     * Used for localization and email notifications.
     * Examples: "en", "zh-CN", "ms", "ta"
     */
    private String preferredLanguage;

    /**
     * User's country of residence.
     * Used for tax purposes and regional compliance.
     * ISO 3166-1 alpha-2 codes recommended (e.g., "SG", "US", "GB")
     */
    private String countryOfResidence;

    // ============================================
    // AUDIT TIMESTAMPS
    // ============================================

    /**
     * When profile was created (when user completed additional info).
     * This is different from User.createdAt (when user first signed in).
     */
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    /**
     * When profile was last updated.
     */
    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
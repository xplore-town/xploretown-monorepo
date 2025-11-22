package com.exploresg.common.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * User entity representing authenticated users in the system.
 *
 * This entity implements Spring Security's UserDetails interface to integrate
 * with Spring Security's authentication and authorization mechanisms.
 *
 * Design decisions:
 * - Dual-ID pattern: Long id (database) + UUID userId (API/external)
 * - SSO-only: No password field (Google OAuth authentication)
 * - Role-based authorization via Role enum
 * - OneToOne relationship with UserProfile for additional user information
 */
@Entity
@Table(name = "app_user",
        indexes = {
                @Index(name = "idx_user_email", columnList = "email", unique = true)
        },
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_user_provider_sub",
                        columnNames = {"identity_provider", "provider_sub"}
                )
        }
)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {

    // ============================================
    // PRIMARY KEYS
    // ============================================

    /**
     * Database internal ID - used for joins and foreign keys.
     * Never exposed in API responses.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * External UUID for API usage and JWT tokens.
     * This is what goes in the JWT 'sub' claim.
     * Prevents enumeration attacks and information leakage.
     */
    @Column(unique = true, nullable = false, updatable = false)
    @Builder.Default
    private UUID userId = UUID.randomUUID();

    // ============================================
    // CORE IDENTITY
    // ============================================

    /**
     * User's email address - used as Spring Security username.
     * Must be unique across all users.
     */
    @Column(unique = true, nullable = false)
    private String email;

    /**
     * Password hash for LOCAL authentication.
     * Null for OAuth users (GOOGLE, GITHUB, etc.)
     */
    private String password;

    // ============================================
    // PROFILE INFORMATION
    // ============================================

    /**
     * Full name from identity provider.
     * Example: "John Michael Doe"
     */
    private String fullName;

    /**
     * Given name (first name in Western cultures).
     * Example: "John"
     */
    private String givenName;

    /**
     * Family name (last name in Western cultures).
     * Example: "Doe"
     */
    private String familyName;

    /**
     * Profile picture URL from identity provider.
     * Example: "https://lh3.googleusercontent.com/..."
     */
    private String picture;

    // ============================================
    // OAUTH INTEGRATION
    // ============================================

    /**
     * Identity provider's unique user identifier (sub claim from OAuth JWT).
     * Used to link user to their OAuth account.
     * Remains constant even if user changes email with the provider.
     *
     * Combined with identityProvider, this uniquely identifies a user
     * across different OAuth providers.
     */
    private String providerSub;

    // ============================================
    // STATUS & AUTHORIZATION
    // ============================================

    /**
     * Account status - false means user is disabled/banned.
     * Used for soft delete instead of hard delete.
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean isActive = true;

    /**
     * User's role for authorization.
     * Determines what actions user can perform.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    /**
     * How this user authenticated (Google, GitHub, Local, etc.)
     * Determines whether user has a password.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IdentityProvider identityProvider;

    // ============================================
    // AUDIT TIMESTAMPS
    // ============================================

    /**
     * When user account was created.
     * Automatically set by Hibernate on first save.
     */
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    /**
     * When user account was last updated.
     * Automatically updated by Hibernate on every save.
     */
    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // ============================================
    // SPRING SECURITY USERDETAILS IMPLEMENTATION
    // ============================================

    /**
     * Returns the authorities (roles) granted to the user.
     * Spring Security uses this for @PreAuthorize checks.
     *
     * Note: Adds "ROLE_" prefix because Spring Security's
     * hasRole() expects it (e.g., hasRole('ADMIN') checks for 'ROLE_ADMIN')
     *
     * @return Collection containing single authority with ROLE_ prefix
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    /**
     * Returns the username for Spring Security authentication.
     * In our system, username = email address.
     *
     * @return User's email address
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Indicates whether the user's account has expired.
     * We don't implement account expiration, so always returns true.
     *
     * @return true (account never expires)
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is locked.
     * We use isActive for this instead of a separate locked field.
     *
     * @return true (we don't implement account locking separately)
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) have expired.
     * We don't implement credential expiration, so always returns true.
     *
     * @return true (credentials never expire)
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled or disabled.
     * Disabled users cannot authenticate.
     *
     * @return true if user is active, false if disabled/banned
     */
    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
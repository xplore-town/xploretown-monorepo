package com.exploresg.common.model;

/**
 * User roles for authorization across all services
 *
 * Roles hierarchy (most to least previlaged)
 * ADMIN > FLEET_MANAGER > MANAGER > SUPPORT > USER
 *
 * Used by Spring Security's @PreAuthorize annotations:
 * - @PreAuthorize("hasRole('ADMIN')")
 * - @PreAuthorize("hasAnyRole('ADMIN', 'FLEET_MANAGER')")
 */
public enum Role {
    /**
     * Regular user - can browse, book, view own data
     */
    USER,

    /**
     * Customer support - can view user data, assist with bookings
     */
    SUPPORT,

    /**
     * Manager - can view reports, manage content
     */
    MANAGER,

    /**
     * Fleet manager - can manage vehicles, operators, availability
     */
    FLEET_MANAGER,

    /**
     * System administrator - full access to everything
     */
    ADMIN,
}

package com.exploresg.common.model;
/**
 * Identity provider used for user authentication.
 *
 * Tracks HOW the user authenticated with the system.
 * This determines:
 * - Whether user has a password (LOCAL) or not (GOOGLE/GITHUB)
 * - Which OAuth flow to use for re-authentication
 * - Audit trail for security compliance
 *
 * Future providers could include: FACEBOOK, APPLE, MICROSOFT, etc.
 */
public enum IdentityProvider {
    /**
     * User authenticated via Google OAuth 2.0
     * No password stored in our database
     */
    GOOGLE,

    /**
     * User authenticated via GitHub OAuth 2.0
     * No password stored in our database
     */
     GITHUB,

     /**
     * User authenticated via Microsoft OAuth 2.0
     * No password stored in our database
     */
    MICROSOFT,

    /**
     * User authenticated via Apple OAuth 2.0
     * No password stored in our database
     */
    APPLE,

    /**
     * User authenticated via Twitter OAuth 2.0
     * No password stored in our database
     */
    TWITTER,

    /**
     * User authenticated via Facebook OAuth 2.0
     * No password stored in our database
     */
    FACEBOOK,

    /**
     * User authenticated via LinkedIn OAuth 2.0
     * No password stored in our database
     */
    LINKEDIN,

    /**
     * User authenticated with email/password
     * Password hash stored in our database
     */
    LOCAL
}

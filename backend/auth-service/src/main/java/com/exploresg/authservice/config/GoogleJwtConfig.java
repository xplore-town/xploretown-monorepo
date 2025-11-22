package com.exploresg.authservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

/**
 * Configuration for Google OAuth JWT validation.
 *
 * This config creates a JwtDecoder bean that validates JWT tokens
 * issued by Google's OAuth service.
 *
 * How it works:
 * 1. Google signs JWTs with their private key
 * 2. Google publishes public keys at a well-known URL (JWK Set)
 * 3. This decoder fetches Google's public keys
 * 4. Uses public keys to verify JWT signatures
 * 5. Also validates issuer, expiration, audience
 *
 * Why we need this:
 * - Frontend sends us Google's JWT token
 * - We must verify it's genuinely from Google (not tampered)
 * - JwtDecoder does signature verification automatically
 */
@Configuration
public class GoogleJwtConfig {

    /**
     * Create JwtDecoder bean for validating Google OAuth tokens.
     *
     * This decoder:
     * - Fetches Google's public keys from their JWK Set endpoint
     * - Caches keys for performance (refreshes periodically)
     * - Validates signature using RSA algorithm
     * - Checks issuer = "https://accounts.google.com"
     * - Checks expiration (exp claim)
     * - Throws JwtException if validation fails
     *
     * Google's JWK Set URL:
     * https://www.googleapis.com/oauth2/v3/certs
     *
     * Named "googleJwtDecoder" to avoid conflict with the JwtDecoder
     * in BaseSecurityConfig (which validates YOUR tokens).
     *
     * This URL returns Google's current public keys in JSON format.
     * Keys rotate periodically for security.
     *
     * @return JwtDecoder configured for Google OAuth
     */
    @Bean("googleJwtDecoder")
    public JwtDecoder googleJwtDecoder(){
        // Create decoder that fetches keys from Google's JWK Set endpoint
        return NimbusJwtDecoder.withJwkSetUri(
                "https://www.googleapis.com/oauth2/v3/certs"
        ).build();
    }
}

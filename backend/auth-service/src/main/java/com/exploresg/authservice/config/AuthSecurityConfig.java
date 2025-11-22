package com.exploresg.authservice.config;

import com.exploresg.common.security.config.BaseSecurityConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;


/**
 * Security configuration for auth-service.
 *
 * Extends BaseSecurityConfig to inherit:
 * - JWT validation (decoder + converter) for YOUR tokens
 * - CORS configuration
 * - Session management (stateless)
 *
 * Only defines auth-service specific route permissions.
 *
 * Design decision: Why these routes are PUBLIC
 * - /api/v1/auth/google - Must be public (chicken-and-egg: need endpoint to GET token)
 * - /api/v1/auth/health - Public for monitoring/health checks
 * - /error - Spring Boot default error page
 *
 * All other routes (if any) require authentication.
 */
@Configuration
public class AuthSecurityConfig extends BaseSecurityConfig {

    /**
     * 🪝 HOOK METHOD: Define route permissions for this service
     * Each service MUST implement this to specify:
     * - Which routes are public (permitAll)
     * - Which routes require authentication
     *
     * Configure route-specific permissions for auth-service.
     *
     * Public routes (no authentication required):
     * - POST /api/v1/auth/google - Google OAuth login endpoint
     * - GET /api/v1/auth/health - Health check endpoint
     * - /error - Spring Boot error handling
     *
     * Protected routes (authentication required):
     * - Any other routes in this service
     * @param auth Authorization request matcher registry
     */
    @Override
    protected void configureRoutes(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth) {
        auth
                // PUBLIC ENDPOINTS - No authentication required
                .requestMatchers(
                        "/api/v1/auth/google",     // OAuth login endpoint
                        "/api/v1/auth/health",     // Health check
                        "/api/v1/auth/ping",     // Health check
                        "/error"                    // Error handling
                ).permitAll()

                // PROTECTED ENDPOINTS - Authentication required
                // (Currently none, but future endpoints like /api/v1/auth/refresh would go here)
                .anyRequest().authenticated();

    }
}

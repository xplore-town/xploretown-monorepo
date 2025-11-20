package com.exploresg.fleetservice.config;

import com.exploresg.common.security.config.BaseSecurityConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;

/**
 * Fleet Service Security Configuration
 *
 * Extends BaseSecurityConfig to inherit:
 * - JWT Validation (decoder + converter)
 * - CORS Configuration
 * - Session Management (stateless)
 *
 * Only defines fleet-specific route permissions
 */
@Configuration
public class FleetSecurityConfig extends BaseSecurityConfig {

    /**
     * 🪝 HOOK METHOD: Define route permissions for this service
     * Each service MUST implement this to specify:
     * - Which routes are public (permitAll)
     * - Which routes require authentication
     *
     * @param auth
     */
    @Override
    protected void configureRoutes(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth) {
        auth
                .requestMatchers(
                        "/",
                        "/error",
                        "/hello",
                        "/api/v1/fleet/health",
                        "/api/v1/fleet/ping",
                        "/api/v1/fleet/models",
                        "/api/v1/fleet/models/*/availability-count",
                        "/api/v1/fleet/operators/*/models",
                        "/api/v1/fleet/bookings/**",
                        "/api/v1/fleet/reservations/**",
                        // Actuator endpoints for Kubernetes
                        "/actuator/health",
                        "/actuator/health/liveness",
                        "/actuator/health/readiness",
                        "/actuator/info",
                        "/actuator/prometheus",
                        // Swagger/OpenAPI endpoints
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/openapi/**"
                )
                .permitAll()
                .anyRequest()
                .authenticated();
    }
}

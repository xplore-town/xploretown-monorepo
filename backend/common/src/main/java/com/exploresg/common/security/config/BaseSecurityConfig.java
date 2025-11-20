package com.exploresg.common.security.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

/**
 * Base Security Configuration for all the microservices
 *
 * Uses template method pattern
 * - Provides common JWT validation, CORS and session management
 * - Each service extends this and customizes route permissions
 *
 */
@EnableWebSecurity
@EnableMethodSecurity
public abstract class BaseSecurityConfig {
    @Value("${application.security.jwt.secret-key}")
    private String jwtSecretKey;

    @Value("${cors.allowed-origins:http://localhost:3000}")
    private String allowedOrigins;

    @Value("${cors.allowed-methods:GET,POST,PUT,DELETE,OPTIONS}")
    private String allowedMethods;

    @Value("${cors.allowed-headers:*}")
    private String allowedHeaders;

    @Value("${cors.allow-credentials:true}")
    private boolean allowCredentials;

    /**
     * 🔒 TEMPLATE METHOD - Configure security filter chain
     * Note: This method is not marked 'final' due to Spring CGLIB proxy limitations,
     * but it should be treated as final. Override configureRoutes() instead.
     *
     * This is the template that defines the security configuration sequence:
     * 1. CORS (same for all services)
     * 2. CSRF disabled (stateless APIs)
     * 3. Session Management (stateless)
     * 4. Route permissions (VARIES per service - hook method)
     * 5. JWT validation (same for all services)
     *
     * !! Subclasses cannot override this method
     * !! Subclasses must implement the hook(configureRoutes)
     *
     * @param http
     * @return
     * @throws Exception
     */
    @Bean
    public  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. CORS Configuration (shared)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // 2. CSRF Disabled (stateless APIs don't need CSRF protection)
                .csrf(csrf -> csrf.disable())
                // 3. Stateless Session Management (no session cookies)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 4. Route Permissions (HOOK - each service implements this)
                .authorizeHttpRequests(auth -> configureRoutes(auth))
                // 5. JWT Validation (shared)
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt
                        .decoder(jwtDecoder())
                        .jwtAuthenticationConverter(jwtAuthenticationConverter())));

        return http.build();
    }

    /**
     * 🪝 HOOK METHOD: Define route permissions for this service
     * Each service MUST implement this to specify:
     * - Which routes are public (permitAll)
     * - Which routes require authentication
     *
     * @param auth
     */
    protected abstract void configureRoutes(
            AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry auth);

    /**
     * 🔑 JWT Decoder Bean
     *
     * Validates JWT signatures using shared key (HS256)
     * All services are using the same secret to verify the tokens
     *
     * @return
     */
    @Bean
    public JwtDecoder jwtDecoder() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecretKey);
        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
        return NimbusJwtDecoder.withSecretKey(secretKey).build();
    }

    /**
     * 👤 JWT Authentication Converter
     * Extract roles from JWT "roles" claim without adding "ROLE_" prefix
     * (Your JWTs already have "ROLE_USER", "ROLE_ADMIN", etc.)
     *
     * @return
     */
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        /**
         * {
         * "sub": "a3f5c8d2-1234-5678-9abc-def012345678", // UUID (not email!)
         * "email": "user@example.com", // Email as separate claim
         * "roles": ["USER", "ADMIN"], // No "ROLE_" prefix
         * "name": "John Doe", // Full name for UI
         * "picture": "https://example.com/profile.jpg", // Profile picture URL
         * "iat": 1735689600,
         * "exp": 1735693200
         * }
         */

        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

        // Tell Spring Security to look for roles in the "roles" claim
        grantedAuthoritiesConverter.setAuthoritiesClaimName("roles");

        // Add "ROLE_" prefix (JWT has "USER", Spring needs "ROLE_USER")
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);

        return converter;
    }

    /**
     * 🌐 CORS Configuration
     *
     * Allows frontend to call backend APIs from a different origin
     *
     * Configured via application.properties
     * - cors.allowed-origins (which domains can call this API)
     * - cors.allowed-methods (GET, POST, etc.)
     * - cors.allowed-headers (Authorization, Content-Type, etc.)
     *
     * @return
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Parse comma separated values from properties
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
        configuration.setAllowedMethods(Arrays.asList(allowedMethods.split(",")));
        configuration.setAllowedHeaders(Arrays.asList(allowedHeaders.split(",")));

        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(allowCredentials);

        // Expose headers to Frontend Javascript
        configuration.setExposedHeaders(List.of("Authorization", "Content-Type"));

        // Cache preflight requests for 1 hour
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

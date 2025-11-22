package com.exploresg.authservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Health check controller for monitoring service status.
 *
 * This controller provides endpoints to verify that the auth-service
 * is running and ready to accept requests.
 *
 * Used by:
 * - Kubernetes liveness/readiness probes
 * - Docker health checks
 * - Load balancers
 * - Manual testing during development
 */
@RequestMapping("/api/v1/check")
@RestController
public class HealthController {

    /**
     * Simple health check endpoint.
     *
     * Returns 200 OK if service is running.
     * This is a public endpoint (no authentication required).
     *
     * @return Map containing service status and name
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "auth-service"));
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}

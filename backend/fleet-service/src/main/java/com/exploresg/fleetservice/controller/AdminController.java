package com.exploresg.fleetservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Admin Endpoints - require protection
 * These endpoints are PROTECTED - JWT required
 */
@RestController
@RequestMapping("/api/v1/fleet/admin")
public class AdminController {

    /**
     * Protected endpoint - requires valid JWT.
     * No role check, just authentication.
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> adminStatus(){
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin endpoint accessed successfully");
        response.put("note", "If you see this, your JWT was valid!");

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/operators")
    public ResponseEntity<Map<String,String>> getOperatorsList(){
        Map<String,String> response = new HashMap<>();
        response.put("message", "Operators list");
        response.put("note", "Only admins can see this!");

        return ResponseEntity.ok(response);
    }
}

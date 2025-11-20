package com.exploresg.fleetservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/fleet")
public class HealthController {

    @GetMapping("/ping")
    public String ping(){
        return "pong";
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health(){
        Map<String, String> response= new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "fleet-service");
        response.put("timestamp", LocalDateTime.now().toString());

        return ResponseEntity.ok(response);
    }
}

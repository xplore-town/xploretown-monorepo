package com.exploresg.authservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/check")
@RestController
public class HealthCheckController {

    @GetMapping("/ping")
    public String ping(){
        return "pong";
    }
}

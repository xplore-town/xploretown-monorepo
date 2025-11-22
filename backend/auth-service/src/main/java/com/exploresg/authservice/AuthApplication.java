package com.exploresg.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main Application class for auth-service.
 *
 * Additional configuration needed for multi-module Maven project:
 * - @EntityScan: Tells JPA to scan for @Entity classes in common module
 * - @EnableJpaRepositories: Tells Spring Data to scan for repositories in multiple packages
 *
 * Without these, Spring Boot only scans com.exploresg.authservice package
 * and misses entities/repositories from com.exploresg.common!
 */
@SpringBootApplication
@EntityScan(basePackages = {
        "com.exploresg.authservice.model",      // Local entities (if any)
        "com.exploresg.common.model"            // Entities from common module
})
@EnableJpaRepositories(basePackages = {
        "com.exploresg.authservice.repository", // Local repositories
        "com.exploresg.common.repository"       // Repositories from common module (if any)
})
public class AuthApplication {
    public static void main(String[] args){
        SpringApplication.run(AuthApplication.class, args);
    }
}

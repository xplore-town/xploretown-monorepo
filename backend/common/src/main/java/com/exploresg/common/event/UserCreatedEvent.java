package com.exploresg.common.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Event payload sent to RabbitMQ when a new user is created
 * This event is consumed by Notification service to send new emails
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCreatedEvent {
    // User Identity
    private Long userId;
    private UUID userUuid;
    private String email;

    // User Information
    private String name;
    private String givenName;
    private String familyName;

    // Auth Info
    private String identityProvider;
    private String role;

    // Timestamp
    private LocalDateTime createdAt;
    private String eventType;
    private LocalDateTime eventTimestamp;
}

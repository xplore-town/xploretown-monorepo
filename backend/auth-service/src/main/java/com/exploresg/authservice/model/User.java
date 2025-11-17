package com.exploresg.authservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "app_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID userUuid;

    private String email;

    private String name;
    private String givenName;
    private String familyName;
    private String picture;

    private Boolean isActive;
    private Role role;

    private IdentityProvider identityProvider;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}

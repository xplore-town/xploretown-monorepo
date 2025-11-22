package com.exploresg.authservice.service;

import com.exploresg.authservice.repository.UserProfileRepository;
import com.exploresg.authservice.repository.UserRepository;
import com.exploresg.common.model.IdentityProvider;
import com.exploresg.common.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service layer for User-related business operations.
 *
 * This service handles:
 * - Finding existing users by email and OAuth provider
 * - Creating new users with their profiles during OAuth registration
 * - Managing the relationship between User and UserProfile entities
 *
 * Why this layer exists:
 * - Separates business logic from data access (repositories)
 * - Provides transaction boundaries for complex operations
 * - Makes testing easier (can mock this service in controllers)
 * - Keeps AuthenticationService focused on auth flow, not user management
 */
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    /**
     * Find a user by their email and OAuth identity provider.
     *
     * This is used during OAuth login to check if a user already exists
     * in our system with this email/provider combination.
     *
     * Why we need BOTH email AND provider:
     * The same email might be used across different OAuth providers.
     * Example: john@gmail.com might sign in with Google, then later try
     * to sign in with GitHub using the same email. We treat these as
     * separate user accounts because the identity provider differs.
     *
     * @param email            User's email address from OAuth provider
     * @param identityProvider OAuth provider (GOOGLE, GITHUB, etc.)
     * @return Optional containing User if found, empty if this is first-time login
     */
    public Optional<User> findByEmailAndIdentityProvider(String email, IdentityProvider identityProvider) {
        return userRepository.findByEmailAndIdentityProvider(email, identityProvider);
    }
}

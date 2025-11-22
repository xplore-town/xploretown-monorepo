package com.exploresg.authservice.repository;

import com.exploresg.common.model.IdentityProvider;
import com.exploresg.common.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity database operations.
 *
 * Extends JpaRepository to get basic CRUD operations:
 * - save() - Create or update user
 * - findById() - Find user by primary key
 * - findAll() - Get all users
 * - delete() - Delete user
 * - count() - Count users
 *
 * Custom query methods are defined here using Spring Data JPA naming conventions.
 */
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    /**
     * Check if the user with the given email exists
     *
     * Used to prevent duplicate email registration
     *
     * @param email User's email address
     * @return true if user exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Find a User by email address
     *
     * Used during authentication to load user details
     * Email is unique, so this returns atmost one user
     *
     * @param email User's email address
     * @return Optional containing user if found,empty otherwise
     */
    Optional<User> findByEmail(String email);

    /**
     * Find a user by provider sub (OAuth provider's unique ID).
     *
     * Used during OAuth login to check if user already exists
     * with this OAuth account, even if they changed their email.
     *
     * @param providerSub OAuth provider's unique user identifier
     * @return Optional containing user if found, empty otherwise
     */
    Optional<User> findByProviderSub(String providerSub);

    /**
     * Find a user by email AND identity provider.
     *
     * This is critical for multi-provider support. The same email might exist
     * with different OAuth providers (e.g., user@example.com from Google vs GitHub).
     * We need BOTH email AND provider to uniquely identify a user.
     *
     * Example: If a user signs in with Google (email: john@gmail.com), then later
     * tries to sign in with GitHub (same email: john@gmail.com), we treat these
     * as DIFFERENT users because the identity provider differs.
     *
     * @param email User's email address
     * @param identityProvider OAuth provider (GOOGLE, GITHUB, etc.)
     * @return Optional containing user if found with this email/provider combination, empty otherwise
     */
    Optional<User> findByEmailAndIdentityProvider(String email, IdentityProvider identityProvider);
}

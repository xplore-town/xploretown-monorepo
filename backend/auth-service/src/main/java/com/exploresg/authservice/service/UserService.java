package com.exploresg.authservice.service;

import com.exploresg.authservice.repository.UserProfileRepository;
import com.exploresg.authservice.repository.UserRepository;
import com.exploresg.common.model.IdentityProvider;
import com.exploresg.common.model.Role;
import com.exploresg.common.model.User;
import com.exploresg.common.model.UserProfile;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    /**
     * Save or update an existing user.
     *
     * This is used when updating user profile information from OAuth provider
     * or when modifying user details.
     *
     * @param user The user to save
     * @return Saved user entity
     */
    @Transactional
    @SuppressWarnings("null")
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Create a new user with their profile in a single transaction.
     *
     * This method is called during first-time OAuth login when the user
     * doesn't exist in our database yet. It creates both the User entity
     * (authentication data) and UserProfile entity (personal information)
     * in a single atomic operation.
     *
     * Transaction boundary ensures:
     * - If profile creation fails, user creation is rolled back
     * - Database remains consistent (no orphaned users without profiles)
     * - Both entities are created or neither is created
     *
     * Why we save User first:
     * UserProfile has a foreign key to User (userId). The User must exist
     * in the database first to generate its ID, which UserProfile then references.
     *
     * @param email            User's email from OAuth provider
     * @param providerSub      OAuth provider's unique identifier for this user
     * @param identityProvider OAuth provider type (GOOGLE, GITHUB, etc.)
     * @param givenName        User's first name from OAuth provider
     * @param familyName       User's last name from OAuth provider
     * @param picture          User's profile picture URL from OAuth provider
     * @return Saved User entity with UserProfile relationship established
     */
    @Transactional
    @SuppressWarnings("null")
    public User createUser(
            String email,
            String providerSub,
            IdentityProvider identityProvider,
            String givenName,
            String familyName,
            String picture) {

        // User Entity
        User user = User.builder()
                .email(email)
                .providerSub(providerSub)
                .identityProvider(identityProvider)
                .fullName(givenName + " " + familyName)
                .givenName(givenName)
                .familyName(familyName)
                .picture(picture)
                .role(Role.USER)
                .isActive(true)
                .build();

        return userRepository.save(user);
    }

    /**
     * Create or update user profile with transaction-enabling data.
     *
     * This is called when user needs to make a booking and provides
     * additional information like phone, date of birth, driving license.
     *
     * @param user                 The user to create/update profile for
     * @param phone                User's phone number
     * @param dateOfBirth          User's date of birth
     * @param drivingLicenseNumber User's driving license (optional)
     * @param passportNumber       User's passport (optional)
     * @param preferredLanguage    User's language preference
     * @param countryOfResidence   User's country of residence
     * @return Saved UserProfile entity
     */
    @Transactional
    @SuppressWarnings("null")
    public UserProfile createOrUpdateUserProfile(User user,
            String phone,
            LocalDate dateOfBirth,
            String drivingLicenseNumber,
            String passportNumber,
            String preferredLanguage,
            String countryOfResidence) {
        UserProfile userProfile = UserProfile.builder()
                .user(user)
                .phone(phone)
                .dateOfBirth(dateOfBirth)
                .drivingLicenseNumber(drivingLicenseNumber)
                .passportNumber(passportNumber)
                .preferredLanguage(preferredLanguage)
                .countryOfResidence(countryOfResidence)
                .build();

        return userProfileRepository.save(userProfile);
    }
}

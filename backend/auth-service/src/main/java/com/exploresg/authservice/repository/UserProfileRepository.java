package com.exploresg.authservice.repository;

import com.exploresg.common.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for UserProfile entity database operations.
 *
 * UserProfile uses @MapsId, so profile.id always equals user.id.
 * This means we can look up profiles using the user's id directly.
 *
 * No custom query methods needed because:
 * - findById(Long id) - Provided by JpaRepository
 * - save(UserProfile profile) - Provided by JpaRepository
 *
 * Usage:
 * - userProfileRepository.findById(user.getId()) - Get user's profile
 * - userProfileRepository.save(profile) - Create/update profile
 */
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

}

package com.exploresg.authservice.dto;

import com.exploresg.common.model.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SignupProfileRequest {
    private String givenName;
    private String familyName;
    private String phone;
    private LocalDate dateOfBirth;
    private String drivingLicenseNumber;

    private String passportNumber;
    private String preferredLanguage;
    private String countryOfResidence;

    private Role role;
}

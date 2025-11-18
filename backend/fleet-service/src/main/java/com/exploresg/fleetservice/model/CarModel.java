package com.exploresg.fleetservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "car_model")
@Data
@AllArgsConstructor@NoArgsConstructor
@Builder
public class CarModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false,updatable = false)
    @Builder.Default
    private UUID carModelUuid=UUID.randomUUID();

    @Column(nullable = false)
    private String model;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Manufacturer manufacturer;

    @Column(nullable = false)
    private Integer seats;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Transmission transmission;

    @Column(name = "picture")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuelType;

    @Column(nullable = false)
    private Integer modelYear;

    private Integer engineCapacityCc;
    private Integer maxUnladenWeightKg;
    private Integer maxLadenWeightKg;

    private Integer rangeInKm;

    private boolean hasAirConditioning;

    private boolean hasInfotainmentSystem;

    private String safetyRating; // e.g., "5-Star ANCAP"

    private Integer topSpeedKph; // Top speed in km/h

    private Double zeroToHundredSec;
}

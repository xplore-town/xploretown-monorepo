package com.exploresg.authservice.service;

import com.exploresg.common.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Service for generating and validating JWT tokens.
 * 
 * JWT Structure:
 * - sub: User's UUID (NOT email)
 * - email: User's email as separate claim
 * - roles: Array of roles WITHOUT "ROLE_" prefix (e.g., ["USER", "ADMIN"])
 * - givenName, familyName, picture: User profile info
 * - iat: Issued at timestamp
 * - exp: Expiration timestamp
 * 
 * Security:
 * - Uses HMAC-SHA256 symmetric signing
 * - Secret key stored in application.properties (Base64-encoded)
 * - Tokens expire after configured duration (default: 24 hours)
 */
@Service
public class JwtService {

    /**
     * Secret key for signing JWTs (Base64-encoded).
     * Must be at least 256 bits (32 bytes) for HS256.
     * Loaded from application.properties: application.security.jwt.secret-key
     */
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    /**
     * JWT expiration time in milliseconds.
     * Default: 86400000ms = 24 hours
     * Loaded from application.properties: application.security.jwt.expiration
     */
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    /**
     * Refresh token expiration time in milliseconds.
     * Default: 604800000ms = 7 days
     * Loaded from application.properties:
     * application.security.jwt.refresh-token.expiration
     */
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    // ============================================
    // TOKEN GENERATION
    // ============================================

    /**
     * Generate JWT token with default claims for the user
     * @param userDetails user to generate token for
     * @return JWT token string
     */
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Generate JWT Token with custom claims
     *
     * This is the main token generation method
     * Add user information as claims and signs the token
     *
     * @param extraClaims Additional claims to include in the token
     * @param userDetails User to generate token for
     * @return JWT token string
     */
    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims,userDetails,jwtExpiration);
    }

    /**
     * Build JWT tokens with claims and expiration
     *
     * IMPORTANT:
     * - sub claim now contains UUID
     * - email is a separate claim
     * - roles array has no "ROLE_" prefix
     *
     * @param extraClaims Additional claims to include
     * @param userDetails User Details
     * @param jwtExpiration Token expiration time in milliseconds
     * @return JWT token string
     */
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long jwtExpiration) {

        // Cast to User to access additional fields
        User user = (User) userDetails;

        // Extract roles without the "ROLE_" prefix
        // user.getAuthorities() returns ["ROLE_USER", "ROLE_ADMIN"]
        // We want ["USER", "ADMIN"] in the JWT
        var roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .map(role->role.replace("ROLE_",""))
                .collect(Collectors.toList());

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getUserId().toString())
                .claim("email", user.getEmail())
                .claim("roles",roles)
                .claim("givenName",user.getGivenName())
                .claim("familyName",user.getFamilyName())
                .claim("picture",user.getPicture())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+jwtExpiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ============================================
    // CRYPTOGRAPHIC KEY HANDLING
    // ============================================

    /**
     * Get the signing Key for JWT Operations
     *
     * Decodes the Base64-encoded secret key and creates an HMAC key
     *
     * Process:
     * 1. Read secret key from application.properties (Base64 string)
     * 2. Decode Base64 to get raw bytes
     * 3. Create HMAC-SHA256 key from bytes
     *
     * @return Signing key for HMAC-SHA256
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    // ============================================
    // TOKEN VALIDATION
    // ============================================

    /**
     * Check if the token is valid for a given user
     *
     * @return
     */
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String tokenObject = extractSubject(token);
        User user = (User)userDetails;
        return (tokenObject.equals(user.getUserId().toString())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ============================================
    // CLAIM EXTRACTION
    // ============================================

    /**
     * Extract expiration date from token.
     *
     * @param token JWT Token
     * @return Expiration Date
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extract subject from a token
     *
     * @param token JWT Token
     * @return User's uuid as string
     */
    private String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims,T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extract all claims from token.
     *
     * This parses the JWT and validates the signature.
     * If signature is invalid or token is malformed, throws exception.
     *
     * @param token JWT token
     * @return All claims in the token
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


}

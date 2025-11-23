import { jwtDecode } from "jwt-decode";

// 1. Define the shape of your Backend's JWT
// This matches the claims set in JwtService.java

/**
 * User roles for authorization across all services.
 *
 * Roles hierarchy (most to least privileged):
 * ADMIN > FLEET_MANAGER > MANAGER > SUPPORT > USER
 *
 * @remarks
 * These string values must match the `Role` enum in the backend exactly
 * (minus the `ROLE_` prefix which Spring Security often handles internally).
 */
export enum Role {
  /** Regular user - can browse, book, and view their own data. */
  USER = "USER",

  /** Customer support - can view user data and assist with bookings. */
  SUPPORT = "SUPPORT",

  /** Manager - can view reports and manage content. */
  MANAGER = "MANAGER",

  /** Fleet manager - can manage vehicles, operators, and availability. */
  FLEET_MANAGER = "FLEET_MANAGER",

  /** System administrator - full access to everything. */
  ADMIN = "ADMIN",
}

/**
 * The shape of the JWT payload issued by our `auth-service`.
 *
 * @remarks
 * This interface matches the claims generated in `JwtService.java`.
 * All time fields (`iat`, `exp`) are in **seconds** (Unix epoch).
 */
export interface CustomJwtPayload {
  /** The user's unique UUID (Subject). Note: This is NOT the email. */
  sub: string;

  /** The user's email address. */
  email: string;

  /** List of roles assigned to the user. */
  roles: Role[];

  /** User's first name (Given Name). */
  givenName: string;

  /** User's last name (Family Name). */
  familyName: string;

  /** URL to the user's profile picture. */
  picture: string;

  /** Issued At timestamp (seconds since epoch). */
  iat: number;

  /** Expiration timestamp (seconds since epoch). */
  exp: number;
}

// 2. Helper to decode

/**
 * Decodes a JWT string to extract user information without verifying the signature.
 *
 * @remarks
 * ⚠️ **SECURITY NOTE:** This function does **not** verify the token signature.
 * It should only be used for UI logic (e.g., showing/hiding buttons).
 * Real authorization checks must always happen on the Backend.
 *
 * @param token - The raw JWT string (Header.Payload.Signature).
 * @returns The decoded payload object, or `null` if the token is invalid or malformed.
 *
 * @example
 * ```ts
 * const user = decodeToken(token);
 * if (user) {
 * console.log(`Welcome back, ${user.givenName}!`);
 * }
 * ```
 */
export const decodeToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwtDecode<CustomJwtPayload>(token);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

// 3. Helper to check if user is Admin

/**
 * Checks if the provided token belongs to a user with the `ADMIN` role.
 *
 * @param token - The raw JWT string to check.
 * @returns `true` if the token is valid AND contains the ADMIN role; otherwise `false`.
 */
export const isAdmin = (token: string): boolean => {
  const decoded = decodeToken(token);
  return decoded?.roles.includes(Role.ADMIN) ?? false;
};

export const getRoles = (token: string): Role[] => {
  const decoded = decodeToken(token);
  return decoded?.roles ?? [];
};

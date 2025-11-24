import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { logger, getRoles, Role } from "@exploresg.frontend/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    // 1. Get the ID Token provided by Google
    const googleToken = credentialResponse.credential;

    // Use logger.debug for sensitive data (hidden in production)
    logger.debug("Received Token:", credentialResponse.credential);

    // Check if google token received
    if (!googleToken) {
      logger.error("No Credential received from google");
    }

    try {
      logger.info("Phase 1: Google Auth Successful, Sending to backend...");

      // 2. Exchange Google Token for our Custom Backend Token
      // We send the Google token to our backend to verify identity and get our own session JWT
      const res = await axios.post("http://localhost:8081/api/v1/auth/google", {
        googleToken: googleToken,
      });

      // 3. Destructure the response from our Backend
      // expected structure: { token: string, userInfo: object, requiresProfileSetup: boolean }
      const { token, userInfo, requiresProfileSetup } = res.data;

      // 4. Decode Roles from the token using our Shared Utility
      // We pass the raw token string because the roles are embedded in the JWT claims
      const roles: Role[] = getRoles(token);

      logger.debug(token, userInfo, requiresProfileSetup, roles);

      // 5. Update Global State (Redux)
      // This makes the user info available to all other components (Navbar, Profile, Guards)
      dispatch(
        setUser({
          token: token,
          userInfo: userInfo,
          roles: roles,
          requiresProfileSetup: requiresProfileSetup,
        })
      );

      navigate("/");
    } catch (error) {
      logger.error("Phase 2 Failed:  Backend rejected the token", error);
    }
  };

  const handleError = () => {
    // 3. Use logger.error for failures
    logger.error("Google Login Failed");
  };

  return (
    <div className="p-8">
      <div className="pb-8">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="mt-4 text-gray-600">Signin Page</p>
      </div>

      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
    </div>
  );
};

export default SignIn;

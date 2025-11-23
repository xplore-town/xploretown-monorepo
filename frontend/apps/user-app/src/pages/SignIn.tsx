import { Card } from "@exploresg.frontend/ui";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { logger, getRoles, Role } from "@exploresg.frontend/utils";
import axios from "axios";

const SignIn = () => {
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    // Use logger.info for high-level success messages
    logger.info("Phase 1: Google Auth Successful from logger");
    const googleToken = credentialResponse.credential;

    // Use logger.debug for sensitive data (hidden in production)
    logger.debug("Received Token:", credentialResponse.credential);

    // Check if google token received
    if (!googleToken) {
      logger.error("No Credential received from google");
    }

    try {
      logger.info("Phase 2: Sending token to the backend");

      // Call Springboot backend
      const res = await axios.post("http://localhost:8081/api/v1/auth/google", {
        googleToken: googleToken,
      });

      const { token, userInfo, requiresProfileSetup } = res.data;
      const roles: Role[] = getRoles(token);
      logger.debug(token, userInfo, requiresProfileSetup, roles);
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
      <h1 className="text-3xl font-bold">Sign In</h1>
      <p className="mt-4 text-gray-600">Signin Page</p>

      <Card title="Sign In">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
      </Card>
    </div>
  );
};

export default SignIn;

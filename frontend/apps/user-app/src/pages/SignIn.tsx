import { Card } from "@exploresg.frontend/ui";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { logger } from "@exploresg.frontend/utils";

const SignIn = () => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    logger.info("Phase 1: Google Auth Successful");

    logger.debug("Received Token:", credentialResponse.credential);
  };
  const handleError = () => {
    console.log("Google login failed");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <p className="mt-4 text-gray-600">Signin Page</p>

      <Card title="signin">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
      </Card>
    </div>
  );
};

export default SignIn;

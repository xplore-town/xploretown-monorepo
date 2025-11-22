import { Card } from "@exploresg.frontend/ui";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

const SignIn = () => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("-----------------------------------");
    console.log("PHASE 1 SUCCESS: Google JWT Received");
    console.log("Token:", credentialResponse.credential);
    console.log("-----------------------------------");
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

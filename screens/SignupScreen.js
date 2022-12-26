import React from "react";
import AuthContent from "../components/Auth/AuthContent";

// Firebase
import { createUser } from "../util/auth";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  async function signupHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      await createUser(email, password);
    } catch (e) {
      Alert.alert(
        "Authentication failed",
        "Cloud not create user, please check your input and try again later."
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

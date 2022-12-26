import React from "react";
import AuthContent from "../components/Auth/AuthContent";

// Firebase
import { createUser } from "../util/auth";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

// Context
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const authCtx = React.useContext(AuthContext)

  async function signupHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      authCtx.authenticate(token)
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

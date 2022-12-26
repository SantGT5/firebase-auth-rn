import AuthContent from "../components/Auth/AuthContent";

import React from "react";

// Firebase
import { login } from "../util/auth";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

// Context
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const authCtx = React.useContext(AuthContext)

  async function loginHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await login(email, password);
      authCtx.authenticate(token)
    } catch (e) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Check your credentials or try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

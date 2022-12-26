import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Component
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IconButton from "./components/ui/IconButton";

// Context && AsyncStorage
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Style
import { Colors } from "./constants/styles";
import React from "react";

// Loading app
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTringLogin, setIsTringLogin] = React.useState(true);
  const authCtx = React.useContext(AuthContext);

  React.useEffect(() => {
    async function fetchToken() {
      try {
        await SplashScreen.hideAsync();
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.error(e);
      } finally {
        setIsTringLogin(false);
      }
    }
    fetchToken();
  }, []);

  if (isTringLogin)
    return (
      <View>
        <Text>AppLoading</Text>
      </View>
    );

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <StatusBar style="light" />
        <Root />
      </AuthContextProvider>
    </>
  );
}

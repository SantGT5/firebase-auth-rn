import { StyleSheet, Text, View } from "react-native";

import axios from "axios";
import React from "react";

import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = React.useState();

  const authCtx = React.useContext(AuthContext);
  const token = authCtx.token;

  React.useEffect(() => {
    axios
      .get(
        "https://react-native-project-9d5c7-default-rtdb.europe-west1.firebasedatabase.app/expenses/message.json?auth=" +
          token
      )
      .then((response) => setFetchedMessage(response.data));
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

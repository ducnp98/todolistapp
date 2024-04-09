import React from "react";
import { StatusBar } from "react-native";

import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routers/Routes";
import linking from "./linking";

function App(): React.JSX.Element {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor={"transparent"}
        />
        <NavigationContainer linking={linking}>
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default App;

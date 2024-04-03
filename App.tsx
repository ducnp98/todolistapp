import React from "react";
import { StatusBar } from "react-native";

import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App(): React.JSX.Element {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar
          translucent
          barStyle={"light-content"}
          backgroundColor={"transparent"}
        />
        <HomeScreen />
      </SafeAreaProvider>
    </>
  );
}

export default App;

import React from "react";
import { StatusBar } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routers/Routes";
import linking from "./linking";
import CodePush from "react-native-code-push";
import { CodePushUpdater } from "./src/components/CodePushUpdater";

// ON_APP_START: When the app is fully initialized (or more specifically, when the root component is mounted).
// ON_APP_RESUME: When the app re-enters the foreground.
// MANUAL: Don't automatically check for updates, but only do it when codePush.sync() is manully called inside app code.

const codePushOption = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

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
        <CodePushUpdater />
      </SafeAreaProvider>
    </>
  );
}

export default CodePush(codePushOption)(App);

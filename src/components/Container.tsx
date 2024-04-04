import React from "react";
import { Platform, ScrollView, View } from "react-native";
import { globalStyle } from "../styles/globalStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title?: string;
  back?: boolean;
  right?: React.ReactNode;
  children: React.ReactNode;
};

const Container = ({ title, back, right, children }: Props) => {
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + (Platform.OS === "android" ? 10 : 0) || 16;

  return (
    <View style={[globalStyle.container, { paddingTop, flex: 1 }]}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default Container;

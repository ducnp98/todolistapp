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

  const paddingTop = insets.top + (Platform.OS === 'android' ? 10 : 0) || 16;
  const paddingBottom = insets.bottom || 16;

  return (
    <ScrollView
      style={[
        globalStyle.container,
        { paddingTop: paddingTop, paddingBottom: paddingBottom },
      ]}
    >
      {children}
    </ScrollView>
  );
};

export default Container;

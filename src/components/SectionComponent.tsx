import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { globalStyle } from "../styles/globalStyle";

type Props = {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
};

const SectionComponent = ({ children, customStyle }: Props) => {
  return (
    <View style={[globalStyle.sectionComponent, customStyle]}>{children}</View>
  );
};

export default SectionComponent;

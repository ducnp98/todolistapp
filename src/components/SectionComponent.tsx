import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { globalStyle } from "../styles/globalStyle";

type Props = {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  color?: string
};

const SectionComponent = ({ children, customStyle, color }: Props) => {
  return (
    <View style={[globalStyle.sectionComponent, customStyle, { backgroundColor: color}]}>{children}</View>
  );
};

export default SectionComponent;

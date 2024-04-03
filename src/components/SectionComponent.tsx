import React from "react";
import { View } from "react-native";
import { globalStyle } from "../styles/globalStyle";

type Props = {
  children: React.ReactNode;
};

const SectionComponent = ({ children }: Props) => {
  return <View style={[globalStyle.sectionComponent]}>{children}</View>;
};

export default SectionComponent;

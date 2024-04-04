import React from "react";
import { View } from "react-native";

type Props = {
  width?: number;
  height?: number;
};

const SpaceComponent = ({ width, height }: Props) => {
  return <View style={{ width, height }} />;
};

export default SpaceComponent;

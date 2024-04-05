import React from "react";
import { FontFamily } from "../constants/fontFamily";
import { Text, TextProps } from "react-native";
import { GlobalColor } from "../constants/colors";

interface Props extends TextProps {
  children: string;
  size?: number;
  flex?: number;
  font?: keyof typeof FontFamily;
  color?: keyof typeof GlobalColor;
}

const TitleComponent = ({
  children,
  size,
  font,
  color,
  flex,
  ...res
}: Props) => {
  return (
    <Text
      {...res}
      style={[
        {
          fontSize: size ?? 20,
          fontFamily: FontFamily[font ?? "semibold"],
          color: GlobalColor[color ?? "text"],
          flex,
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default TitleComponent;

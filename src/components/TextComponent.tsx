import React from "react";
import { FontFamily } from "../constants/fontFamily";
import { Text, TextProps } from "react-native";
import { GlobalColor } from "../constants/colors";

interface Props extends TextProps {
  children: string;
  size?: number;
  font?: keyof typeof FontFamily;
  color?: keyof typeof GlobalColor;
}

const TextComponent = ({ children, size, font, color, ...res }: Props) => {
  return (
    <Text
      {...res}
      style={[
        {
          fontSize: size ?? 14,
          fontFamily: FontFamily[font ?? "regular"],
          color: GlobalColor[color ?? "desc"],
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default TextComponent;

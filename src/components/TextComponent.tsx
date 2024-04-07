import React from "react";
import { FontFamily } from "../constants/fontFamily";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { GlobalColor } from "../constants/colors";

interface Props extends TextProps {
  children: string;
  size?: number;
  flex?: number;
  hexColor?: string;
  font?: keyof typeof FontFamily;
  color?: keyof typeof GlobalColor;
  customStyle?: StyleProp<TextStyle>;
}

const TextComponent = ({
  children,
  size,
  font,
  flex = 0,
  color,
  hexColor,
  customStyle,
  ...res
}: Props) => {
  return (
    <Text
      {...res}
      style={[
        {
          fontSize: size ?? 14,
          fontFamily: FontFamily[font ?? "regular"],
          color: hexColor ? hexColor : GlobalColor[color ?? "desc"],
          flex,
        },
        customStyle,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextComponent;

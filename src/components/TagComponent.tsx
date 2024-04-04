import React from "react";
import { GlobalColor } from "../constants/colors";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import TextComponent from "./TextComponent";
import { globalStyle } from "../styles/globalStyle";

type Props = {
  children: string;
  bgColor?: keyof typeof GlobalColor;
  tagStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const TagComponent = ({
  children,
  bgColor,
  tagStyle,
  textStyle,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress?.()}
      disabled={!onPress}
      style={[
        globalStyle.tag,
        { backgroundColor: GlobalColor[bgColor ?? "blue"] },
        tagStyle,
      ]}
    >
      <TextComponent customStyle={textStyle}>{children}</TextComponent>
    </TouchableOpacity>
  );
};

export default TagComponent;

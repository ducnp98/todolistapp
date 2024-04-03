import React, { Children } from "react";
import { GlobalColor } from "../constants/colors";
import { StyleProp, View, ViewStyle } from "react-native";
import { globalStyle } from "../styles/globalStyle";

type Props = {
  children: React.ReactNode;
  bgColor?: keyof typeof GlobalColor;
  customStyle?: StyleProp<ViewStyle>;
};

const CardComponent = ({ bgColor, customStyle, children }: Props) => {
  return (
    <View
      style={[
        globalStyle.inputContainer,
        { backgroundColor: GlobalColor[bgColor ?? "gray"], padding: 12 },
        customStyle,
      ]}
    >
      {children}
    </View>
  );
};

export default CardComponent;

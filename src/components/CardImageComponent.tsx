import { View, Text, ImageBackground } from "react-native";
import React, { ReactNode } from "react";
import { globalStyle } from "../styles/globalStyle";
import TextComponent from "./TextComponent";

interface Props {
  children: ReactNode;
  color?: string;
}
const CardImageComponent = (props: Props) => {
  const { children, color } = props;
  return (
    <ImageBackground
      source={require("../assets/images/card_bg.png")}
      style={[globalStyle.card]}
      imageStyle={{ borderRadius: 12 }}
    >
      <View
        style={[
          {
            backgroundColor: color ?? "rgba(113, 77, 217, 0.9)",
            borderRadius: 12,
            padding: 12,
            flex: 1,
          },
        ]}
      >
        {children}
      </View>
    </ImageBackground>
  );
};

export default CardImageComponent;

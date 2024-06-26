import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { ReactNode } from "react";
import { globalStyle } from "../styles/globalStyle";
import TextComponent from "./TextComponent";

interface Props {
  children: ReactNode;
  color?: string;
  onPress?: () => void;
}
const CardImageComponent = (props: Props) => {
  const { children, color, onPress } = props;
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
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
    </Pressable>
  );
};

export default CardImageComponent;

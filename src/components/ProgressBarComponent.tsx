import React from "react";
import { DimensionValue, View } from "react-native";
import RowContainer from "./RowContainer";
import TextComponent from "./TextComponent";
import { GlobalColor } from "../constants/colors";
interface Props {
  size?: "small" | "default" | "large";
  color?: string;
  percent: DimensionValue;
}

const ProgressBarComponent = ({ size, color, percent }: Props) => {
  const heightContent = size === "small" ? 6 : size === "large" ? 10 : 8;

  return (
    <View style={{ marginTop: 12 }}>
      <View
        style={{
          height: heightContent,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: 100,
        }}
      >
        <View
          style={{
            backgroundColor: color ?? GlobalColor.blue,
            width: percent,
            height: 8,
            borderRadius: 100,
          }}
        />
      </View>
      <RowContainer
        justifyContent="space-between"
        customStyle={{ marginTop: 4 }}
      >
        <TextComponent size={12}>Progress</TextComponent>
        <TextComponent size={14} customStyle={{ flex: 0 }} font='semibold'>
          {`${percent}`}
        </TextComponent>
      </RowContainer>
    </View>
  );
};

export default ProgressBarComponent;

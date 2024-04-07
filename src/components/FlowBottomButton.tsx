import React from "react";
import { TouchableOpacity, View } from "react-native";
import TitleComponent from "./TitleComponent";
import { Add } from "iconsax-react-native";
import { GlobalColor } from "../constants/colors";
import { globalStyle } from "../styles/globalStyle";
import TextComponent from "./TextComponent";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  action?: () => void;
  title: string;
};

const FlowBottomButton = ({ action, title }: Props) => {
  const insets = useSafeAreaInsets();

  const paddingBottom = insets.bottom || 16;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: paddingBottom,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={!action}
        onPress={() => action?.()}
        style={[
          globalStyle.rowContainer,
          {
            backgroundColor: GlobalColor.blue,
            padding: 12,
            borderRadius: 10,
            width: "80%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <TextComponent size={16} font="bold">
          {title}
        </TextComponent>
        <Add size={22} color={GlobalColor.white} />
      </TouchableOpacity>
    </View>
  );
};

export default FlowBottomButton;

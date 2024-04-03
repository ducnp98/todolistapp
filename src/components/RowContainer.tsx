import React from "react";
import {
  FlexAlignType,
  FlexStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { globalStyle } from "../styles/globalStyle";

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
  alignItems?: FlexAlignType;
  onPress?: () => void;
  justifyContent?: FlexStyle["justifyContent"];
  customStyle?: StyleProp<ViewStyle>;
}

const RowContainer = ({
  children,
  alignItems,
  justifyContent,
  customStyle,
  onPress,
  ...res
}: Props) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={() => onPress?.()}
      style={[
        globalStyle.rowContainer,
        { alignItems: alignItems, justifyContent: justifyContent },
        customStyle,
      ]}
      {...res}
    >
      {children}
    </TouchableOpacity>
  );
};

export default RowContainer;

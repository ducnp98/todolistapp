import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import RowContainer from "./RowContainer";
import TextComponent from "./TextComponent";
import { Global } from "iconsax-react-native";
import { GlobalColor } from "../constants/colors";

interface Props extends TouchableOpacityProps {
  icon?: React.ReactNode;
  children: string | React.ReactNode;
  action: () => void;
  color?: string;
  isLoading?: boolean;
}

const ButtonComponent = ({
  icon,
  children,
  action,
  color,
  isLoading,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={{ backgroundColor: color || GlobalColor.blue, borderRadius: 14 }}
    >
      <RowContainer
        justifyContent="center"
        alignItems="center"
        customStyle={{ flex: 0, paddingVertical: 10 }}
      >
        {icon ? icon : null}
        {typeof children === "string" ? (
          <>
            <TextComponent size={14} font="medium">
              {children}
            </TextComponent>
            {isLoading ? <ActivityIndicator /> : null}
          </>
        ) : (
          children
        )}
      </RowContainer>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

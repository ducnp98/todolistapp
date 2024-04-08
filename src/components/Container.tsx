import React from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { globalStyle } from "../styles/globalStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RowContainer from "./RowContainer";
import { ArrowLeft2 } from "iconsax-react-native";
import { GlobalColor } from "../constants/colors";
import TextComponent from "./TextComponent";
import SpaceComponent from "./SpaceComponent";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title?: string;
  back?: boolean;
  right?: React.ReactNode;
  children: React.ReactNode;
  isScroll?: boolean;
};

const Container = ({ title, back, isScroll = true, children }: Props) => {
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const paddingTop = insets.top + (Platform.OS === "android" ? 10 : 0) || 16;

  return (
    <View style={[globalStyle.container, { paddingTop, flex: 1 }]}>
      {title || back ? (
        <RowContainer
          justifyContent="space-between"
          alignItems="center"
          customStyle={{ flex: 0, marginBottom: 10 }}
        >
          {back ? (
            <TouchableOpacity onPress={goBack}>
              <ArrowLeft2 color={GlobalColor.desc} size={24} />
            </TouchableOpacity>
          ) : (
            <SpaceComponent width={24} />
          )}
          {title ? (
            <TextComponent font="medium" size={16}>
              {title ?? ""}
            </TextComponent>
          ) : (
            <SpaceComponent width={24} />
          )}
          <SpaceComponent width={24} />
        </RowContainer>
      ) : null}
      {isScroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{children}</View>
      )}
    </View>
  );
};

export default Container;

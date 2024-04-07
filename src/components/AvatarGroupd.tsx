import { Global } from "iconsax-react";
import React from "react";
import { GlobalColor } from "../constants/colors";
import RowContainer from "./RowContainer";
import TextComponent from "./TextComponent";
import { Image, View } from "react-native";

interface Props {
  uuid: string[];
}

const AvatarGroup = ({ uuid }: Props) => {
  const uidLength = 10;
  const imageUrl = "https://imgupscaler.com/images/samples/animal-after.webp";
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: GlobalColor.white,
  };

  return (
    <RowContainer justifyContent="flex-start">
      {Array.from({ length: uidLength }).map(
        (item, index) =>
          index < 3 && (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={[imageStyle, { marginLeft: index > 0 ? -10 : 0 }]}
            />
          )
      )}

      {uidLength > 5 ? (
        <View
          style={[
            imageStyle,
            {
              backgroundColor: GlobalColor.white,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              marginLeft: -10,
            },
          ]}
        >
          <TextComponent size={12} font="semibold" color="gray">
            {`${uidLength - 3 > 9 ? 9 : uidLength - 3}+`}
          </TextComponent>
        </View>
      ) : null}
    </RowContainer>
  );
};

export default AvatarGroup;

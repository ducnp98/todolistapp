import { Global } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { GlobalColor } from "../constants/colors";
import RowContainer from "./RowContainer";
import TextComponent from "./TextComponent";
import { Image, View } from "react-native";
import FirebaseStorage from "@react-native-firebase/firestore";
import AvatarComponent from "./AvatarComponent";

interface Props {
  uuid: string[];
}

const AvatarGroup = ({ uuid }: Props) => {
  const [usersName, setUsersName] = useState<
    {
      name: string;
      imgUrl: string;
    }[]
  >([]);

  useEffect(() => {
    getUserAvatar();
  }, [uuid]);

  const getUserAvatar = async () => {
    const items: any = [...usersName];
    uuid.forEach(async (id) => {
      await FirebaseStorage()
        .doc(`users/${id}`)
        .get()
        .then((snap: any) => {
          if (snap.exists) {
            items.push({
              name: snap.data().displayName,
              imgUrl: snap.data().imgUrl ?? "",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setUsersName(items);
  };

  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: GlobalColor.white,
  };
  return (
    <RowContainer justifyContent="flex-start" customStyle={{ flex: 0 }}>
      {uuid.map(
        (item, index) =>
          index < 3 && <AvatarComponent uid={item} index={index} key={item} />
      )}

      {uuid.length > 5 ? (
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
            {`${uuid.length - 3 > 9 ? 9 : uuid.length - 3}+`}
          </TextComponent>
        </View>
      ) : null}
    </RowContainer>
  );
};

export default AvatarGroup;

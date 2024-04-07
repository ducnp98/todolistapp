import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { UserModal } from "../models/UserModal";
import { GlobalColor } from "../constants/colors";
import { globalStyle } from "../styles/globalStyle";

interface Props {
  uid: string;
  index?: number;
}

const AvatarComponent = (props: Props) => {
  const { uid, index } = props;

  const [userDetail, setUserDetail] = useState<UserModal>();

  useEffect(() => {
    firestore()
      .doc(`users/${uid}`)
      .get()
      .then((snap: any) => {
        snap.exists &&
          setUserDetail({
            uid,
            ...snap.data(),
          });
      })
      .catch((error) => console.log(error));
  }, [uid]);
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: GlobalColor.white,
  };
  return userDetail ? (
    userDetail.imgUrl ? (
      <Image
        source={{ uri: userDetail.imgUrl }}
        key={`image${uid}`}
        style={[imageStyle, { marginLeft: index && index > 0 ? -10 : 0 }]}
      />
    ) : (
      <View
        key={`image${uid}`}
        style={[
          imageStyle,
          {
            marginLeft: index && index > 0 ? -10 : 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: GlobalColor.lightGray,
          },
        ]}
      >
        <Text style={[{ fontFamily: "bold", fontSize: 14, color: "white" }]}>
          {userDetail.displayName.substring(0, 1).toUpperCase()}
        </Text>
      </View>
    )
  ) : (
    <></>
  );
};

export default AvatarComponent;

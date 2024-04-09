import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import FireStore from "@react-native-firebase/firestore";
import { NotificationModel } from "../../models/NotificationModel";
import Container from "../../components/Container";
import TextComponent from "../../components/TextComponent";
import { HandleDateTime } from "../../utils/handeDateTime";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routers/Routes";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "Notification"> {}

const NotificationScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);

  const user = auth().currentUser;

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    setIsLoading(true);
    try {
      FireStore()
        .collection("notifications")
        .where("uid", "==", user?.uid)
        .onSnapshot((snap) => {
          if (!snap.empty) {
            const items: NotificationModel[] = [];

            snap.forEach((item: any) => {
              items.push({
                id: item.id,
                ...item.data(),
              });
            });

            setNotifications(
              items.sort((a: any, b: any) => a.isRead - b.isRead)
            );
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleReadNotification = (item: NotificationModel) => {
    FireStore()
      .doc(`notifications/${item.id}`)
      .update({
        isRead: true,
      })
      .then(() => {
        navigation.navigate("TaskDetail", { id: item.taskId });
      });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Container back title="Notifications" isScroll={false}>
      <FlatList
        data={notifications}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleReadNotification(item)}
            style={{ marginBottom: 18, paddingHorizontal: 16 }}
          >
            <TextComponent
              size={18}
              color={item.isRead ? "lightGray" : "text"}
              font={item.isRead ? "regular" : "bold"}
            >
              {item.title}
            </TextComponent>
            <TextComponent color={"lightGray"}>{item.body}</TextComponent>
            <TextComponent size={12} color={"lightGray"}>
              {HandleDateTime.DateString(new Date(item.createdAt))}
            </TextComponent>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default NotificationScreen;

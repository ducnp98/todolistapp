import Auth from "@react-native-firebase/auth";
import Messaging from "@react-native-firebase/messaging";
import Firestore from "@react-native-firebase/firestore";
import { serverKey } from "../constants/appInfos";

const auth = Auth().currentUser;

export class HandleNotification {
  static checkNotificationPerson = async () => {
    const authStatus = await Messaging().requestPermission();

    if (
      authStatus === Messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === Messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFcmToken();
    }
  };

  static getFcmToken = async () => {
    // const token = await AsyncStorage.getItem("fcmToken");

    // if (!token) {
    //   console.log("token", token);
    //   const fcmToken = await Messaging().getToken();
    //   await AsyncStorage.setItem("fcmToken", fcmToken);
    //   console.log("Vo day", fcmToken);
    //   this.updateToken(fcmToken);
    // }

    const fcmToken = await Messaging().getToken();
    if (fcmToken) {
      this.updateToken(fcmToken);
    }
  };

  static updateToken = async (token: string) => {
    await Firestore()
      .doc(`users/${auth?.uid}`)
      .get()
      .then((snap) => {
        if (snap.exists) {
          const data: any = snap.data();

          if (!data?.token || !data?.tokens.includes(token)) {
            Firestore()
              .doc(`users/${auth?.uid}`)
              .update({ tokens: Firestore.FieldValue.arrayUnion(token) });
          }
        }
      });
  };

  static SendNotification = async ({
    memberId,
    title,
    body,
    taskId,
  }: {
    memberId: string;
    title: string;
    body: string;
    taskId: string;
  }) => {
    try {
      await Firestore()
        .collection("notifications")
        .add({
          isRead: false,
          createdAt: Date.now(),
          updatedAT: Date.now(),
          title,
          body,
          taskId,
          uid: memberId,
        })
        .then(() => {
          console.log("saved");
        });

      // send notification
      const member: any = await Firestore().doc(`users/${memberId}`).get();

      if (member && member.data().tokens) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `key=${serverKey}`);

        var raw = JSON.stringify({
          registration_ids: member.data().tokens,
          notification: {
            title,
            body,
          },
          data: {
            taskId,
          },
        });

        var requestOptions: any = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log('notification success', result))
          .catch((error) => console.log("notification error", error));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

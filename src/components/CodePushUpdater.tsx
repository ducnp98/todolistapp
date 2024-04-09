import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import codePush from "react-native-code-push";
import TextComponent from "./TextComponent";
import SpaceComponent from "./SpaceComponent";
import { GlobalColor } from "../constants/colors";
import { Slider } from "@miblanchard/react-native-slider";

export const CodePushUpdater = () => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: {
          title: "Update",
          appendReleaseDescription: true,
          optionalIgnoreButtonLabel: "Cancel",
          optionalInstallButtonLabel: "Install",
          optionalUpdateMessage: "There some new things to update",
        },
      },
      (status) => {
        switch (status) {
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log("[CodePush1] Checking for updates.");

            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log("[CodePush1] Downloading package.");

            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            console.log("[CodePush1] Installing update.");

            break;
          case codePush.SyncStatus.UP_TO_DATE:
            console.log("[CodePush1] Up-to-date.");

            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            console.log("[CodePush1] Update installed.");

            break;
        }
      },
      (data) => {
        console.log('data', data)
        let percent = (data.receivedBytes / data.totalBytes) * 100;
        percent = Math.round(percent);

        setProgress(percent);
      }
    );
  }, []);

  if (progress === 100) {
    return null;
  }

  return (
    <View style={styles.modalBackground}>
      <View style={styles.progressWrapper}>
        <View style={{ flexDirection: "row" }}>
          <TextComponent color="text" size={16} font="bold">
            {`Updating ... ${progress}`}
          </TextComponent>
        </View>

        <SpaceComponent height={8} />

        <View style={{ width: "100%" }}>
          <Slider
            disabled
            value={progress / 100}
            renderThumbComponent={() => null}
            trackStyle={{
              height: 6,
              borderRadius: 100,
            }}
            minimumTrackTintColor={GlobalColor.success}
            maximumTrackTintColor={GlobalColor.desc}
          />
        </View>

        <SpaceComponent height={8} />

        <View style={styles.progressBar}>
          <View style={[styles.progressBarInside, { width: `${progress}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
    zIndex: 99,
  },
  progressWrapper: {
    backgroundColor: GlobalColor.bgColor,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  progressBar: {
    height: 4,
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarInside: {
    height: 4,
  },
});

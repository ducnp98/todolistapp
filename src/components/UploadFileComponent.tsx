import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Attachment } from "../models/TaskModel";
import { DocumentUpload } from "iconsax-react-native";
import DocumentPicker, {
  DocumentPickerResponse,
  DocumentPickerOptions,
} from "react-native-document-picker";
import TextComponent from "./TextComponent";
import TitleComponent from "./TitleComponent";
import SpaceComponent from "./SpaceComponent";
import { Slider } from "@miblanchard/react-native-slider";
import storage from "@react-native-firebase/storage";
import { GlobalColor } from "../constants/colors";
import { globalStyle } from "../styles/globalStyle";
import RowContainer from "./RowContainer";
import { calcFileSize } from "../utils/calcFileSize";

interface Props {
  onUpload: (file: Attachment) => void;
}

const UploadFileComponent = (props: Props) => {
  const { onUpload } = props;

  const [file, setfile] = useState<DocumentPickerResponse>();
  const [isVisibleModalUpload, setIsVisibleModalUpload] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [attachmentFile, setAttachmentFile] = useState<Attachment>();

  useEffect(() => {
    file && handleUploadFileToStorage();
  }, [file]);

  useEffect(() => {
    if (attachmentFile) {
      onUpload(attachmentFile);
      setIsVisibleModalUpload(false);
      setProgressUpload(0);
      setAttachmentFile(undefined);
    }
  }, [attachmentFile]);

  const handleUploadFileToStorage = () => {
    if (file) {
      setIsVisibleModalUpload(true);

      const path = `/documents/${file.name}`;

      const res = storage().ref(path).putFile(file.uri);

      res.on("state_changed", (task) => {
        setProgressUpload(task.bytesTransferred / task.totalBytes);
      });

      res.then(() => {
        storage()
          .ref(path)
          .getDownloadURL()
          .then((url) => {
            const data: Attachment = {
              name: file.name ?? "",
              url,
              size: file.size ?? 0,
            };

            setAttachmentFile(data);
          });
      });

      res.catch((error) => console.log(error.message));
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          DocumentPicker.pick({
            allowMultiSelection: false,
            type: [
              DocumentPicker.types.pdf,
              DocumentPicker.types.doc,
              DocumentPicker.types.xls,
            ],
          })
            .then((res) => {
              setfile(res[0]);
            })
            .catch((error) => console.log(error))
        }
      >
        <DocumentUpload size={22} color={GlobalColor.white} />
      </TouchableOpacity>
      <Modal
        visible={isVisibleModalUpload}
        statusBarTranslucent
        animationType="slide"
        style={{ flex: 1 }}
        transparent
      >
        <View
          style={[
            globalStyle.container,
            {
              backgroundColor: `${GlobalColor.gray}80`,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <View
            style={{
              width: Dimensions.get("window").width * 0.8,
              height: "auto",
              padding: 12,
              backgroundColor: GlobalColor.white,
              borderRadius: 12,
            }}
          >
            <TitleComponent color={"bgColor"} flex={0}>
              Uploading
            </TitleComponent>
            <SpaceComponent height={12} />
            <View>
              <TextComponent color={"bgColor"} flex={0}>
                {file?.name ?? ""}
              </TextComponent>
              <TextComponent
                color={"lightGray"}
                size={12}
                flex={0}
              >{`${calcFileSize(file?.size as number)}`}</TextComponent>
            </View>
            <RowContainer customStyle={{ flex: 0 }} alignItems="center">
              <View style={{ flex: 1, marginRight: 0 }}>
                <Slider
                  disabled
                  value={progressUpload}
                  renderThumbComponent={() => null}
                  trackStyle={{
                    height: 6,
                    borderRadius: 100,
                  }}
                  minimumTrackTintColor={GlobalColor.success}
                  maximumTrackTintColor={GlobalColor.desc}
                />
              </View>
              <SpaceComponent width={12} />
              <TextComponent color={"bgColor"} flex={0}>
                {`${Math.floor(progressUpload * 100)}%`}
              </TextComponent>
            </RowContainer>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UploadFileComponent;

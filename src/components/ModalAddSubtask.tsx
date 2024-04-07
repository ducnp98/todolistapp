import { View, Modal, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import TextComponent from "../components/TextComponent";
import ButtonComponent from "../components/ButtonComponent";
import TitleComponent from "../components/TitleComponent";
import InputComponent from "../components/InputComponent";
import FirebaseStore from "@react-native-firebase/firestore";
import { globalStyle } from "../styles/globalStyle";
import { GlobalColor } from "../constants/colors";
import RowContainer from "./RowContainer";
import SpaceComponent from "./SpaceComponent";

interface Props {
  visible: boolean;
  subTask?: any;
  onClose: () => void;
  taskId: string;
}

const initValue = {
  title: "",
  description: "",
  isCompleted: false,
};

const ModalAddSubTask = (props: Props) => {
  const { visible, subTask, onClose, taskId } = props;
  const [subTaskForm, setSubTaskForm] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveToDatabase = async () => {
    const data = {
      ...subTaskForm,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      taskId,
    };

    setIsLoading(true);
    try {
      await FirebaseStore().collection("subTasks").add(data);
      setIsLoading(false);
      handleCloseModal();
      Alert.alert('Add subtask done')
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSubTaskForm(initValue);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      style={globalStyle.modal}
      transparent
      animationType="slide"
    >
      <View style={[globalStyle.modalContainer]}>
        <View
          style={[
            globalStyle.modalContent,
            {
              backgroundColor: GlobalColor.gray,
            },
          ]}
        >
          <TitleComponent font="bold">Add new Subtask</TitleComponent>
          <View style={{ paddingVertical: 20 }}>
            <InputComponent
              title="Title"
              placeholder="Title"
              value={subTaskForm.title}
              numberOfLines={1}
              color={"#212121"}
              customTitleStyle={{ fontSize: 16, color: GlobalColor.desc }}
              onChangeText={(val) =>
                setSubTaskForm({ ...subTaskForm, title: val })
              }
              allowClear
            />
            <SpaceComponent height={16} />
            <InputComponent
              title="Description"
              placeholder="Description"
              value={subTaskForm.description}
              customTitleStyle={{ fontSize: 16, color: GlobalColor.desc }}
              onChangeText={(val) =>
                setSubTaskForm({
                  ...subTaskForm,
                  description: val,
                })
              }
              numberOfLines={3}
              color={"#212121"}
              multiline
              allowClear
            />
          </View>
          <SpaceComponent height={20} />
          <RowContainer customStyle={{ flex: 0 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 14,
                borderColor: GlobalColor.lightGray,
              }}
            >
              <TouchableOpacity onPress={handleCloseModal}>
                <TextComponent flex={0}>Close</TextComponent>
              </TouchableOpacity>
            </View>
            <SpaceComponent width={20} />
            <View style={{ flex: 1 }}>
              <ButtonComponent
                isLoading={isLoading}
                action={handleSaveToDatabase}
              >
                Save
              </ButtonComponent>
            </View>
          </RowContainer>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddSubTask;

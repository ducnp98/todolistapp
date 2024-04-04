import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../routers/Routes";
import { TaskModel } from "../../models/TaskModel";
import Container from "../../components/Container";
import SectionComponent from "../../components/SectionComponent";
import InputComponent from "../../components/InputComponent";

const initial = {
  title: "",
  description: "",
  dueDate: "",
  start: "",
  end: "",
  uuid: [""],
  color: "",
  fileUrls: [""],
};

const AddNewTaskScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [taskDetail, setTaskDetail] = useState<TaskModel>(initial);

  const handleChangeValue = (id: string, value: string) => {
    const item: any = { ...taskDetail };
    item[`${id}`] = value;
    setTaskDetail(item);
  };
  return (
    <Container back={true} title="Add new task">
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChangeText={(value: string) => handleChangeValue("title", value)}
          title="Title"
          allowClear={true}
          placeholder="Title of task"
        />
        <InputComponent
          value={taskDetail.description}
          onChangeText={(value: string) =>
            handleChangeValue("description", value)
          }
          title="Description"
          allowClear={true}
          numberOfLines={3}
          multiline
          placeholder="Title of task"
        />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTaskScreen;

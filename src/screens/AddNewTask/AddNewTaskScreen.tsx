import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../routers/Routes";
import { TaskModel } from "../../models/TaskModel";
import Container from "../../components/Container";
import SectionComponent from "../../components/SectionComponent";
import InputComponent from "../../components/InputComponent";
import DateTimePickerComponent from "../../components/DateTimePickerComponent";
import SpaceComponent from "../../components/SpaceComponent";
import RowContainer from "../../components/RowContainer";

const initial = {
  title: "",
  description: "",
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uuid: [""],
  color: "",
  fileUrls: [""],
};

const AddNewTaskScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [taskDetail, setTaskDetail] = useState<TaskModel>(initial);

  const handleChangeValue = (id: string, value: string | Date) => {
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
        <SpaceComponent height={20} />
        <InputComponent
          value={taskDetail.description}
          onChangeText={(value: string) =>
            handleChangeValue("description", value)
          }
          title="Description"
          allowClear={true}
          numberOfLines={3}
          multiline
          placeholder="Content"
        />
        <SpaceComponent height={20} />
        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          onSelect={(val) => handleChangeValue("dueDate", val)}
          placeholder="Choice"
          type="date"
          title="Due date"
        />
        <RowContainer>
          <DateTimePickerComponent
            selected={taskDetail.start}
            onSelect={(val) => handleChangeValue("start", val)}
            placeholder="Choice"
            type="date"
            title="Start"
          />
          <SpaceComponent width={16} />
          <DateTimePickerComponent
            selected={taskDetail.end}
            onSelect={(val) => handleChangeValue("end", val)}
            placeholder="Choice"
            type="date"
            title="End"
          />
        </RowContainer>
      </SectionComponent>
    </Container>
  );
};

export default AddNewTaskScreen;

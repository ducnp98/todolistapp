import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { RootStackParamList } from "../../routers/Routes";
import { Attachment, TaskModel } from "../../models/TaskModel";
import Container from "../../components/Container";
import SectionComponent from "../../components/SectionComponent";
import InputComponent from "../../components/InputComponent";
import DateTimePickerComponent from "../../components/DateTimePickerComponent";
import SpaceComponent from "../../components/SpaceComponent";
import RowContainer from "../../components/RowContainer";
import DropdownPickerComponent from "../../components/DropdownPickerComponent";
import { SelectModel } from "../../models/SelectModel";
import FirebaseStorage from "@react-native-firebase/firestore";
import TitleComponent from "../../components/TitleComponent";
import TextComponent from "../../components/TextComponent";
import FlowBottomButton from "../../components/FlowBottomButton";
import UploadFileComponent from "../../components/UploadFileComponent";
import Auth from "@react-native-firebase/auth";

const initial = {
  id: "",
  title: "",
  description: "",
  dueDate: undefined,
  start: undefined,
  end: undefined,
  uuid: [],
  color: "",
  fileUrls: [],
  progress: 0,
  isUrgent: false,
  attachments: [],
};

const AddNewTaskScreen = () => {
  const { goBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [taskDetail, setTaskDetail] = useState<TaskModel>(initial);
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const user = Auth().currentUser;

  const handleGetAllUser = async () => {
    await FirebaseStorage()
      .collection("users")
      .get()
      .then((res) => {
        if (res.empty) {
          console.log("users not found");
        } else {
          const list: SelectModel[] = [];

          res.forEach((item) => {
            list.push({
              value: item.id,
              label: item.data().displayName,
            });
          });

          setUserSelect(list);
        }
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);

  const handleChangeValue = (id: string, value: string | Date | string[]) => {
    const item: any = { ...taskDetail };
    item[`${id}`] = value;
    setTaskDetail(item);
  };

  useEffect(() => {
    user && setTaskDetail((pre) => ({ ...pre, uuid: [user.uid] }));
  }, [user]);

  const handleAddNewTask = async () => {
    if (!user) {
      Alert.alert("You are not logged in yet!");
      return;
    }

    const data = {
      ...taskDetail,
      attachments,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await FirebaseStorage()
      .collection("task")
      .add(data)
      .then((res) => {
        Alert.alert("Add task successfully");

        goBack();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
              type="time"
              title="Start"
            />
            <SpaceComponent width={16} />
            <DateTimePickerComponent
              selected={taskDetail.end}
              onSelect={(val) => handleChangeValue("end", val)}
              placeholder="Choice"
              type="time"
              title="End"
            />
          </RowContainer>
          <DropdownPickerComponent
            title="Members"
            selected={taskDetail.uuid}
            multiple
            items={userSelect}
            onSelect={(val) => {
              handleChangeValue("uuid", val);
            }}
          />

          <View>
            <RowContainer alignItems="center">
              <TitleComponent>Attachment</TitleComponent>
              <SpaceComponent width={8} />
              <UploadFileComponent
                onUpload={(file) =>
                  file && setAttachments([...attachments, file])
                }
              />
            </RowContainer>
            {attachments.length
              ? attachments.map((item, index) => (
                  <RowContainer
                    key={index}
                    customStyle={{ paddingVertical: 12 }}
                  >
                    <TextComponent>{item.name ?? ""}</TextComponent>
                  </RowContainer>
                ))
              : null}
          </View>
        </SectionComponent>
        <SpaceComponent height={70} />
      </Container>
      <FlowBottomButton title="SAVE" action={handleAddNewTask} />
    </>
  );
};

export default AddNewTaskScreen;

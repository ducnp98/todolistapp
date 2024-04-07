import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { RootStackParamList } from "../../routers/Routes";
import { TaskModel } from "../../models/TaskModel";
import Container from "../../components/Container";
import SectionComponent from "../../components/SectionComponent";
import InputComponent from "../../components/InputComponent";
import DateTimePickerComponent from "../../components/DateTimePickerComponent";
import SpaceComponent from "../../components/SpaceComponent";
import RowContainer from "../../components/RowContainer";
import DropdownPickerComponent from "../../components/DropdownPickerComponent";
import { SelectModel } from "../../models/SelectModel";
import FirebaseStorage from "@react-native-firebase/firestore";
import ButtonComponent from "../../components/ButtonComponent";
import TitleComponent from "../../components/TitleComponent";
import { AttachSquare } from "iconsax-react-native";
import { GlobalColor } from "../../constants/colors";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import TextComponent from "../../components/TextComponent";
import Storage from "@react-native-firebase/storage";
import FlowBottomButton from "../../components/FlowBottomButton";

const initial = {
  id: "",
  title: "",
  description: "",
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uuid: [],
  color: "",
  fileUrls: [],
  progress: 0,
  isUrgent: false,
  attachments: []
};

const AddNewTaskScreen = () => {
  const { goBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [taskDetail, setTaskDetail] = useState<TaskModel>(initial);
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<DocumentPickerResponse[]>([]);
  const [attachmentURLs, setAttachmentURLs] = useState<string[]>([]);

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
              label: item.data().name,
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

  const onHandleUploadFileOnFirebase = async (item: DocumentPickerResponse) => {
    const fileName = item.name ?? `file_${Date.now}`;

    const path = `documents/${fileName}`;

    await Storage().ref(path).putFile(item.uri);

    await Storage()
      .ref(path)
      .getDownloadURL()
      .then((res) => {
        const items = [...attachmentURLs];
        items.push(res);
        setAttachmentURLs(items);
        setAttachments((pre) => [...pre, item]);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  const onPickerDocument = () => {
    DocumentPicker.pick({})
      .then((res) => {
        res.forEach((item) => onHandleUploadFileOnFirebase(item));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddNewTask = async () => {
    const data = {
      ...taskDetail,
      fileUrls: attachmentURLs,
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
            <RowContainer alignItems="center" onPress={onPickerDocument}>
              <TitleComponent>Attachment</TitleComponent>
              <SpaceComponent width={8} />
              <AttachSquare size={20} color={GlobalColor.white} />
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

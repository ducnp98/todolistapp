import { Slider } from "@miblanchard/react-native-slider";
import FirebaseStorage from "@react-native-firebase/firestore";
import {
  AddSquare,
  ArrowLeft2,
  CalendarEdit,
  Clock,
  TickCircle,
  TickSquare,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import CardComponent from "../../components/CardComponent";
import SectionComponent from "../../components/SectionComponent";
import SpaceComponent from "../../components/SpaceComponent";
import TextComponent from "../../components/TextComponent";
import TitleComponent from "../../components/TitleComponent";
import { Attachment, SubTask, TaskModel } from "../../models/TaskModel";
import auth from "@react-native-firebase/auth";
import { GlobalColor } from "../../constants/colors";
import RowContainer from "../../components/RowContainer";
import moment from "moment";
import AvatarGroup from "../../components/AvatarGroupd";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routers/Routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UploadFileComponent from "../../components/UploadFileComponent";
import { calcFileSize } from "../../utils/calcFileSize";
import FlowBottomButton from "../../components/FlowBottomButton";
import ModalAddSubTask from "../../components/ModalAddSubtask";
import { HandleNotification } from "../../utils/handleNotification";
import Auth from "@react-native-firebase/auth";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "TaskDetail"> {}

const TaskDetailScreen = ({ navigation, route }: Props) => {
  const { id, color } = route.params;

  const inset = useSafeAreaInsets();

  const user = Auth().currentUser;

  const [progress, setProgress] = useState(0);
  const [isUrgent, setIsUrgent] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isVisibleModalSubTask, setIsVisibleModalSubTask] = useState(false);

  useEffect(() => {
    getTaskDetail();
    getSubTaskById();
  }, [id]);

  useEffect(() => {
    if (taskDetail) {
      setProgress(taskDetail.progress ?? 0);
      setAttachments(taskDetail.attachments);
      setIsUrgent(taskDetail.isUrgent);
    }
  }, [taskDetail]);

  useEffect(() => {
    if (
      progress !== taskDetail?.progress ||
      attachments.length !== taskDetail.attachments.length
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [progress, taskDetail, attachments]);

  useEffect(() => {
    if (subTasks.length > 0) {
      const completedPercent =
        subTasks.filter((element) => element.isCompleted).length /
        subTasks.length;

      setProgress(completedPercent);
    }
  }, [subTasks]);

  const getTaskDetail = () => [
    FirebaseStorage()
      .doc(`task/${id}`)
      .onSnapshot((snap: any) => {
        if (snap.exists) {
          setTaskDetail({
            id,
            ...snap.data(),
          });
        }
      }),
  ];

  const handleUpdateUrgentState = () => {
    FirebaseStorage().doc(`task/${id}`).update({
      isUrgent: !isUrgent,
      updatedAt: Date.now(),
    });
  };

  const getSubTaskById = () => {
    FirebaseStorage()
      .collection("subTasks")
      .where("taskId", "==", id)
      .onSnapshot((snap) => {
        if (snap.empty) {
          console.log("Data not found");
        } else {
          const items: SubTask[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setSubTasks(items);
        }
      });
  };

  const handleUpdateTask = async () => {
    const data = {
      ...taskDetail,
      progress,
      attachments,
      updatedAt: Date.now(),
    };

    await FirebaseStorage()
      .doc(`task/${id}`)
      .update(data)
      .then(() => {
        Alert.alert("Task updated");
      })
      .catch((error) => console.log("error", error));
  };

  const handleUpdateSubTask = async (id: string, isCompleted: boolean) => {
    try {
      await FirebaseStorage()
        .doc(`subTasks/${id}`)
        .update({ isCompleted: !isCompleted });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveTask = () => {
    Alert.alert("Confirm", "Are you sure, you want delete task?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("Cancel"),
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await FirebaseStorage()
            .doc(`task/${id}`)
            .delete()
            .then(() => {
              taskDetail?.uuid.forEach((id) => {
                HandleNotification.SendNotification({
                  title: "Delete task",
                  body: `You task deleted by ${user?.email}`,
                  taskId: taskDetail.id ?? "",
                  memberId: id,
                });
              });

              navigation.goBack();
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
    ]);
  };

  return taskDetail ? (
    <>
      <StatusBar hidden />
      <View style={{ flex: 1, backgroundColor: GlobalColor.bgColor }}>
        <SectionComponent
          color={color || "rgba(113, 77, 217, 0.9)"}
          customStyle={{
            paddingTop: inset.top || 20,
            paddingBottom: 18,
            paddingHorizontal: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginBottom: 0,
          }}
        >
          <RowContainer customStyle={{ alignItems: "center", flex: 0 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft2
                size={28}
                color={GlobalColor.white}
                style={{ marginTop: -8, marginRight: 12 }}
              />
            </TouchableOpacity>
            <TitleComponent flex={1} size={22} numberOfLines={1}>
              {taskDetail.title}
            </TitleComponent>
          </RowContainer>
          <View style={{ marginTop: 20 }}>
            <TextComponent>Due date</TextComponent>
            <RowContainer
              customStyle={{ flex: 0 }}
              justifyContent="space-between"
              alignItems="center"
            >
              <RowContainer
                customStyle={{
                  flex: 1,
                  justifyContent: "flex-start",
                }}
              >
                <Clock size={20} color={GlobalColor.white} />
                <SpaceComponent width={4} />
                {taskDetail.end && taskDetail.start && (
                  <TextComponent flex={0}>
                    {`${moment(taskDetail.start).format("H A")} - ${moment(
                      taskDetail.end
                    ).format("H A")}`}
                  </TextComponent>
                )}
              </RowContainer>
              {taskDetail.dueDate && (
                <RowContainer
                  customStyle={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CalendarEdit size={20} color={GlobalColor.white} />
                  <SpaceComponent width={4} />

                  <TextComponent flex={0}>
                    {`${moment(taskDetail.dueDate).format("DD MMM YYYY")}`}
                  </TextComponent>
                </RowContainer>
              )}
              <View
                style={{
                  flex: 1,

                  alignItems: "flex-end",
                }}
              >
                <AvatarGroup uuid={taskDetail.uuid} />
              </View>
            </RowContainer>
          </View>
        </SectionComponent>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: GlobalColor.bgColor,
            paddingTop: 16,
          }}
        >
          <View style={{ paddingHorizontal: 16 }}>
            <SectionComponent>
              <TitleComponent size={22}>Description</TitleComponent>
              <CardComponent
                bgColor={"bgColor"}
                customStyle={{
                  borderWidth: 1,
                  borderColor: GlobalColor.gray,
                  borderRadius: 12,
                  marginTop: 12,
                }}
              >
                <TextComponent customStyle={{ textAlign: "justify" }}>
                  {taskDetail.description}
                </TextComponent>
              </CardComponent>
            </SectionComponent>
            <SectionComponent>
              <RowContainer onPress={handleUpdateUrgentState}>
                <TickSquare
                  variant={isUrgent ? "Bold" : "Outline"}
                  size={24}
                  color={GlobalColor.white}
                />
                <SpaceComponent width={8} />
                <TextComponent flex={1} font={"bold"} size={18}>
                  Is Urgent
                </TextComponent>
              </RowContainer>
            </SectionComponent>
            <SectionComponent>
              <CardComponent>
                <RowContainer>
                  <TitleComponent flex={1}>Files & Links</TitleComponent>
                  <UploadFileComponent
                    onUpload={(file) =>
                      file && setAttachments([...attachments, file])
                    }
                  />
                </RowContainer>
                <SpaceComponent height={8} />

                {attachments.map((item, index) => (
                  <View
                    style={{ justifyContent: "flex-start", marginBottom: 8 }}
                    key={`attachment${index}`}
                  >
                    <TextComponent flex={0}>{item.name}</TextComponent>
                    <TextComponent flex={0} size={11} font="italic">
                      {calcFileSize(item.size)}
                    </TextComponent>
                  </View>
                ))}
              </CardComponent>
            </SectionComponent>
            <SectionComponent>
              <RowContainer>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: GlobalColor.success,
                    marginRight: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: GlobalColor.success,
                      width: 16,
                      height: 16,
                      borderRadius: 100,
                    }}
                  />
                </View>
                <TextComponent flex={1} font={"medium"} size={18}>
                  Progress
                </TextComponent>
              </RowContainer>
              <SpaceComponent height={12} />
              <RowContainer>
                <View style={{ flex: 1 }}>
                  <Slider
                    disabled
                    value={progress}
                    onValueChange={(val) => setProgress(val[0])}
                    thumbTintColor={GlobalColor.success}
                    thumbStyle={{
                      borderWidth: 2,
                      borderColor: GlobalColor.white,
                    }}
                    maximumTrackTintColor={GlobalColor.lightGray}
                    minimumTrackTintColor={GlobalColor.success}
                    trackStyle={{ height: 10, borderRadius: 100 }}
                  />
                </View>
                <SpaceComponent width={20} />
                <TextComponent font="bold" size={18} flex={0}>
                  {`${Math.floor(progress * 100)}%`}
                </TextComponent>
              </RowContainer>
            </SectionComponent>
            <SectionComponent>
              <RowContainer>
                <TitleComponent flex={1} size={20}>
                  Sub tasks
                </TitleComponent>
                <TouchableOpacity
                  onPress={() => setIsVisibleModalSubTask(true)}
                >
                  <AddSquare
                    size={24}
                    color={GlobalColor.success}
                    variant="Bold"
                  />
                </TouchableOpacity>
              </RowContainer>
              <SpaceComponent height={12} />
              {subTasks.length > 0 &&
                subTasks.map((item, index) => (
                  <CardComponent
                    key={`subtask${index}`}
                    customStyle={{ marginBottom: 12 }}
                  >
                    <RowContainer
                      alignItems="center"
                      onPress={() =>
                        handleUpdateSubTask(item.id, item.isCompleted)
                      }
                    >
                      <TickCircle
                        variant={item.isCompleted ? "Bold" : "Outline"}
                        color={GlobalColor.success}
                        size={22}
                      />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <TextComponent>{item.title}</TextComponent>
                        <TextComponent size={12} hexColor={"#e0e0e0"}>
                          {moment(item.createdAt).format("DD MMM YYYY") + ""}
                        </TextComponent>
                      </View>
                    </RowContainer>
                  </CardComponent>
                ))}
            </SectionComponent>
            <SectionComponent>
              <RowContainer onPress={handleRemoveTask} justifyContent="center">
                <TextComponent color="red" flex={0}>
                  Delete task
                </TextComponent>
              </RowContainer>
            </SectionComponent>
          </View>
          <SpaceComponent height={100} />
        </ScrollView>
        <ModalAddSubTask
          visible={isVisibleModalSubTask}
          onClose={() => setIsVisibleModalSubTask(false)}
          taskId={id}
        />
        {isChanged ? (
          <FlowBottomButton title="Update" action={handleUpdateTask} />
        ) : null}
      </View>
    </>
  ) : (
    <></>
  );
};

export default TaskDetailScreen;

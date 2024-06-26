import React, { useCallback, useEffect, useState } from "react";
import Container from "../../components/Container";
import TextComponent from "../../components/TextComponent";
import SectionComponent from "../../components/SectionComponent";
import RowContainer from "../../components/RowContainer";
import TitleComponent from "../../components/TitleComponent";
import { GlobalColor } from "../../constants/colors";
import { globalStyle } from "../../styles/globalStyle";
import CardComponent from "../../components/CardComponent";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import {
  Add,
  Edit2,
  Element4,
  Logout,
  SearchNormal,
} from "iconsax-react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import TagComponent from "../../components/TagComponent";
import SpaceComponent from "../../components/SpaceComponent";
import CircularComponent from "../../components/CircularComponent";
import CardImageComponent from "../../components/CardImageComponent";
import AvatarGroup from "../../components/AvatarGroupd";
import ProgressBarComponent from "../../components/ProgressBarComponent";
import FlowBottomButton from "../../components/FlowBottomButton";
import { useLinkTo, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routers/Routes";
import Auth from "@react-native-firebase/auth";
import FirebaseStore from "@react-native-firebase/firestore";
import { TaskModel } from "../../models/TaskModel";
import moment from "moment";
import { HandleNotification } from "../../utils/handleNotification";
import Message from "@react-native-firebase/messaging";

const HomeScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [urgentTasks, setUrgentTask] = useState<TaskModel[]>([]);

  const user = Auth().currentUser;
  const linkTo = useLinkTo();

  const onSignOut = useCallback(() => {
    Auth().signOut();
  }, []);

  const getNewTask = useCallback(async () => {
    setIsLoading(true);

    await FirebaseStore()
      .collection("task")
      .where("uuid", "array-contains", user?.uid)
      .onSnapshot((res) => {
        if (res.empty) {
          console.log("Task not found");
          setTasks([]);
        } else {
          const item: any = [];

          res.forEach((x) => item.push({ ...x.data(), id: x.id }));

          const sort = item.sort(
            (a: TaskModel, b: TaskModel) => b.createdAt - a.createdAt
          );
          setTasks(sort);
        }
      });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getNewTask();

    HandleNotification.checkNotificationPerson();

    //Khi click tu thong bao, no se mo app len va navigate toi day,
    // tai day chung ta se nhan thong bao va handle no
    Message()
      .getInitialNotification()
      .then((res) => {
        const data = res?.data;
        const taskId = data?.taskId;

        if (taskId) {
          linkTo(`/task-detail/${taskId}`);
        }
      });
  }, []);

  useEffect(() => {
    if (tasks.length) {
      const urgentTaskList = tasks.filter((x) => x.isUrgent);
      setUrgentTask(urgentTaskList);
    }
  }, [tasks]);

  const navigateToTaskDetail = (id: string, color: string) => {
    navigate("TaskDetail", { id, color });
  };

  const editTask = (task: TaskModel) => {
    navigate("AddNewTask", { editable: true, task });
  };

  const navigateToTaskList = () => {
    navigate("ListTask", { tasks: tasks });
  };

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <SectionComponent>
          <RowContainer justifyContent="space-between">
            <Element4 color={GlobalColor.desc} size={24} />
            <TextComponent>{process.env.APP_NAME ?? ''}</TextComponent>
            <TouchableOpacity onPress={() => navigate("Notification")}>
              <IonIcon
                name="notifications"
                color={GlobalColor.desc}
                size={24}
              />
            </TouchableOpacity>
          </RowContainer>
        </SectionComponent>
        <SectionComponent>
          <RowContainer justifyContent="space-between" alignItems="center">
            <View>
              <TextComponent>{`Hi, ${user?.email ?? ""}`}</TextComponent>
              <TitleComponent>Be Productive today</TitleComponent>
            </View>
            <TouchableOpacity onPress={onSignOut}>
              <Logout size={25} color={GlobalColor.white} />
            </TouchableOpacity>
          </RowContainer>
        </SectionComponent>
        <SectionComponent>
          <RowContainer
            onPress={navigateToTaskList}
            justifyContent="space-between"
            customStyle={globalStyle.inputContainer}
          >
            <TextComponent color="lightGray">Search task</TextComponent>
            <SearchNormal size={20} color={GlobalColor.desc} />
          </RowContainer>
        </SectionComponent>

        <SectionComponent>
          <CardComponent>
            <RowContainer onPress={navigateToTaskList}>
              <View style={{ flex: 1 }}>
                <TitleComponent>Task progress</TitleComponent>
                <TextComponent>{`${
                  tasks.filter((x) => x.progress === 1).length
                }/${tasks.length}`}</TextComponent>
                <SpaceComponent height={12} />
                <RowContainer alignItems="flex-start">
                  <TagComponent>{moment().format("MMM DD")}</TagComponent>
                </RowContainer>
              </View>
              <View>
                <CircularComponent
                  value={Math.floor(
                    (tasks.filter((x) => x.progress === 1).length /
                      tasks.length) *
                      100
                  )}
                  maxValue={100}
                />
              </View>
            </RowContainer>
          </CardComponent>
        </SectionComponent>
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <RowContainer justifyContent="flex-end">
              <TouchableOpacity onPress={navigateToTaskList}>
                <TextComponent>See all</TextComponent>
              </TouchableOpacity>
            </RowContainer>
            <SpaceComponent height={16} />
            <RowContainer>
              <View style={{ flex: 1 }}>
                <CardImageComponent
                  onPress={() => navigateToTaskDetail(tasks[0].id ?? "", "")}
                >
                  <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View>
                      <TouchableOpacity
                        style={globalStyle.iconContainer}
                        onPress={() => editTask(tasks[0])}
                      >
                        <Edit2 color={GlobalColor.white} size={20} />
                      </TouchableOpacity>
                      <TitleComponent>{tasks[0].title}</TitleComponent>
                      <TextComponent size={13} numberOfLines={7}>
                        {tasks[0].description}
                      </TextComponent>
                    </View>

                    <View style={{ marginVertical: 16 }}>
                      <AvatarGroup uuid={tasks[0].uuid} />
                      {tasks[0].progress ? (
                        <ProgressBarComponent
                          percent={`${Math.floor(tasks[0].progress * 100)}%`}
                          color="#0AACFF"
                        />
                      ) : null}
                    </View>
                    <TextComponent size={12} color="desc">
                      {`Due ${moment(tasks[0].dueDate).format("YYYY MMM DD")}`}
                    </TextComponent>
                  </View>
                </CardImageComponent>
              </View>

              <SpaceComponent width={16} />

              <View style={{ flex: 1 }}>
                <View>
                  {tasks[1] ? (
                    <CardImageComponent
                      color="rgba(33, 150, 243, 0.9)"
                      onPress={() =>
                        navigateToTaskDetail(
                          tasks[1].id ?? "",
                          "rgba(33, 150, 243, 0.9)"
                        )
                      }
                    >
                      <TouchableOpacity
                        style={globalStyle.iconContainer}
                        onPress={() => editTask(tasks[1])}
                      >
                        <Edit2 color={GlobalColor.white} size={20} />
                      </TouchableOpacity>
                      <TitleComponent>{tasks[1].title}</TitleComponent>
                      <View style={{ marginTop: 16 }}>
                        <AvatarGroup uuid={tasks[1].uuid} />
                        {tasks[1].progress ? (
                          <ProgressBarComponent
                            percent={Math.floor(tasks[1].progress * 100)}
                            color="#A2F068"
                            size="large"
                          />
                        ) : null}
                      </View>
                    </CardImageComponent>
                  ) : null}
                  {tasks[2] ? (
                    <>
                      <SpaceComponent height={16} />
                      <CardImageComponent color="rgba(18, 181, 23, 0.9)">
                        <TouchableOpacity
                          style={globalStyle.iconContainer}
                          onPress={() => editTask(tasks[2])}
                        >
                          <Edit2 color={GlobalColor.white} size={20} />
                        </TouchableOpacity>
                        <TitleComponent>{tasks[1].title}</TitleComponent>
                        <TextComponent size={13} numberOfLines={6}>
                          {tasks[1].description}
                        </TextComponent>
                      </CardImageComponent>
                    </>
                  ) : null}
                </View>
              </View>
            </RowContainer>
          </SectionComponent>
        ) : (
          <></>
        )}
        <SectionComponent>
          <TitleComponent size={24}>Urgent task</TitleComponent>
          <SpaceComponent height={8} />
          {urgentTasks.length
            ? urgentTasks.map((item, key) => (
                <CardComponent key={key}>
                  <RowContainer
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <RowContainer alignItems="center">
                      <CircularComponent
                        value={Math.floor((item.progress || 0) * 100)}
                        maxValue={100}
                      />
                      <SpaceComponent width={16} />
                      <View>
                        <TitleComponent>{item.title}</TitleComponent>
                        <TextComponent>{item.description}</TextComponent>
                      </View>
                    </RowContainer>
                  </RowContainer>
                </CardComponent>
              ))
            : null}
        </SectionComponent>

        <SpaceComponent height={80} />
      </Container>
      <FlowBottomButton
        action={() => navigate("AddNewTask", { editable: false })}
        title="Add new tasks"
        icon={<Add size={22} color={GlobalColor.white} />}
      />
    </View>
  );
};

export default HomeScreen;

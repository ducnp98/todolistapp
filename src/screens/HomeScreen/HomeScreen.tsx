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
import { Edit2, Element4, Logout, SearchNormal } from "iconsax-react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import TagComponent from "../../components/TagComponent";
import SpaceComponent from "../../components/SpaceComponent";
import CircularComponent from "../../components/CircularComponent";
import CardImageComponent from "../../components/CardImageComponent";
import AvatarGroup from "../../components/AvatarGroupd";
import ProgressBarComponent from "../../components/ProgressBarComponent";
import FlowBottomButton from "../../components/FlowBottomButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routers/Routes";
import Auth from "@react-native-firebase/auth";
import FirebaseStore from "@react-native-firebase/firestore";
import { TaskModel } from "../../models/TaskModel";
import moment from "moment";

const HomeScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const user = Auth().currentUser;

  const onSignOut = useCallback(() => {
    Auth().signOut();
  }, []);

  const getNewTask = useCallback(async () => {
    setIsLoading(true);

    await FirebaseStore()
      .collection("task")
      .orderBy("dueDate")
      .limit(3)
      .onSnapshot((res) => {
        if (res.empty) {
          console.log("Task not found");
        } else {
          const item: any = [];

          res.forEach((x) => item.push({ ...x.data(), id: x.id }));

          setTasks(item);
        }
      });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getNewTask();
  }, []);

  const navigateToTaskDetail = (id: string, color: string) => {
    navigate("TaskDetail", { id, color });
  };

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <SectionComponent>
          <RowContainer justifyContent="space-between">
            <Element4 color={GlobalColor.desc} size={24} />
            <IonIcon name="notifications" color={GlobalColor.desc} size={24} />
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
            onPress={() => {}}
            justifyContent="space-between"
            customStyle={globalStyle.inputContainer}
          >
            <TextComponent color="lightGray">Search task</TextComponent>
            <SearchNormal size={20} color={GlobalColor.desc} />
          </RowContainer>
        </SectionComponent>

        <SectionComponent>
          <CardComponent>
            <RowContainer>
              <View style={{ flex: 1 }}>
                <TitleComponent>Task progress</TitleComponent>
                <TextComponent>30/40 tasks done</TextComponent>
                <SpaceComponent height={12} />
                <RowContainer alignItems="flex-start">
                  <TagComponent>March 24</TagComponent>
                </RowContainer>
              </View>
              <View>
                <CircularComponent value={60} maxValue={100} />
              </View>
            </RowContainer>
          </CardComponent>
        </SectionComponent>
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <RowContainer>
              <View style={{ flex: 1 }}>
                <CardImageComponent
                  onPress={() => navigateToTaskDetail(tasks[0].id ?? "", "")}
                >
                  <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View>
                      <TouchableOpacity style={globalStyle.iconContainer}>
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
                        navigateToTaskDetail(tasks[1].id ?? "", "rgba(33, 150, 243, 0.9)")
                      }
                    >
                      <TouchableOpacity style={globalStyle.iconContainer}>
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
                        <TouchableOpacity style={globalStyle.iconContainer}>
                          <Edit2 color={GlobalColor.white} size={20} />
                        </TouchableOpacity>
                        <TitleComponent>{tasks[1].title}</TitleComponent>
                        <TextComponent size={13}>
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
          <CardComponent>
            <RowContainer justifyContent="space-between" alignItems="center">
              <RowContainer alignItems="center">
                <CircularComponent value={60} maxValue={100} />
                <SpaceComponent width={16} />
                <TitleComponent>Title of task</TitleComponent>
              </RowContainer>
              <TextComponent>2 left</TextComponent>
            </RowContainer>
          </CardComponent>
        </SectionComponent>
        <SpaceComponent height={80} />
      </Container>
      <FlowBottomButton
        action={() => navigate("AddNewTask")}
        title="Add new tasks"
      />
    </View>
  );
};

export default HomeScreen;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import AddNewTaskScreen from "../screens/AddNewTask/AddNewTaskScreen";
import SearchTaskScreen from "../screens/SearchTask/SearchTaskScreen";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import TaskDetailScreen from "../screens/TaskDetail/TaskDetailScreen";
import { TaskModel } from "../models/TaskModel";
import ListTaskScreen from "../screens/ListTask/ListTaskScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import Messaging from "@react-native-firebase/messaging";
import { useLinkTo } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  AddNewTask: { editable: boolean; task?: TaskModel };
  SearchTask: undefined;
  Login: undefined;
  RegisterScreen: undefined;
  TaskDetail: { id: string; color?: string };
  ListTask: { tasks: TaskModel[] };
  Notification: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const [isLogin, setIsLogin] = useState(false);
  const linkTo = useLinkTo();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    // handle khi app chay background
    Messaging().onNotificationOpenedApp(async (mess) => {
      const data = mess.data;
      const taskId = data?.taskId;

      if (taskId) {
        linkTo(`/task-detail/${taskId}`);
      }
    });

    // handle khi app chay foreground
    Messaging().onMessage(async (remoteMessage) => {
      console.log(
        "Notification received while app is in foreground:",
        remoteMessage
      );
    });
  }, []);

  const MainRouter = (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="AddNewTask" component={AddNewTaskScreen} />
      <RootStack.Screen name="SearchTask" component={SearchTaskScreen} />
      <RootStack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <RootStack.Screen name="ListTask" component={ListTaskScreen} />
      <RootStack.Screen name="Notification" component={NotificationScreen} />
    </RootStack.Navigator>
  );

  const AuthRouter = (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </RootStack.Navigator>
  );

  return isLogin ? MainRouter : AuthRouter;
};

export default Routes;

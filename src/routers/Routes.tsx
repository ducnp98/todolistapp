import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import AddNewTaskScreen from "../screens/AddNewTask/AddNewTaskScreen";
import SearchTaskScreen from "../screens/SearchTask/SearchTaskScreen";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

export type RootStackParamList = {
  Home: undefined;
  AddNewTask: undefined;
  SearchTask: undefined;
  Login: undefined;
  RegisterScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
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

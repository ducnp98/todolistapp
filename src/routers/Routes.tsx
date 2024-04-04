import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import AddNewTaskScreen from "../screens/AddNewTask/AddNewTaskScreen";
import SearchTaskScreen from "../screens/SearchTask/SearchTaskScreen";

export type RootStackParamList = {
  Home: undefined;
  AddNewTask: undefined;
  SearchTask: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="AddNewTask" component={AddNewTaskScreen} />
      <RootStack.Screen name="SearchTask" component={SearchTaskScreen} />
    </RootStack.Navigator>
  );
};

export default Routes;

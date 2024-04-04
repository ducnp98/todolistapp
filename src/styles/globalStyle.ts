import { Platform, StyleSheet } from "react-native";
import { GlobalColor } from "../constants/colors";
import { FontFamily } from "../constants/fontFamily";

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor.bgColor,
    paddingHorizontal: 16,
  },

  rowContainer: {
    flex: 1,
    flexDirection: "row",
  },

  sectionComponent: {
    marginBottom: 16,
  },

  inputContainer: {
    paddingHorizontal: Platform.OS === "android" ? 10 : 12,
    paddingVertical: Platform.OS === "android" ? 10 : 12,
    backgroundColor: GlobalColor.gray,
    borderRadius: 12,
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 6 : 4,
    borderRadius: 100,
    backgroundColor: GlobalColor.blue,
  },

  card: {
    borderRadius: 12,
    flex: 1
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "rgba(8,0,8,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16
  },
});

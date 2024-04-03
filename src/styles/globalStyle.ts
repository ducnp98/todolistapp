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
});

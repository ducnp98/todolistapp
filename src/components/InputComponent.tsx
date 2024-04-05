import React from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import RowContainer from "./RowContainer";
import { globalStyle } from "../styles/globalStyle";
import TitleComponent from "./TitleComponent";
import { GlobalColor } from "../constants/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Props extends TextInputProps {
  placeholder: string;
  title: string;
  prefix?: React.ReactNode;
  affix?: string;
  allowClear?: React.ReactNode;
  value: string;
  onChangeText: (value: string) => void;
}

const InputComponent = ({
  value,
  onChangeText,
  placeholder,
  title,
  prefix,
  affix,
  allowClear,
  ...res
}: Props) => {
  return (
    <View>
      {title ? <TitleComponent>{title}</TitleComponent> : null}
      <RowContainer
        customStyle={[
          globalStyle.inputContainer,
          {
            marginTop: title ? 8 : 0,
            alignItems: res.multiline ? "flex-start" : "center",
            minHeight: res.numberOfLines ? 32 * res.numberOfLines : 32,
          },
        ]}
      >
        {prefix ? prefix : null}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: affix ? 8 : 0,
          }}
        >
          <TextInput
            style={{
              margin: 0,
              padding: 0,
              flex: 0,
              paddingVertical: 5,
              color: GlobalColor.white,
            }}
            value={value}
            placeholder={placeholder ?? ""}
            placeholderTextColor="#676767"
            onChangeText={(val) => onChangeText(val)}
            {...res}
          />
        </View>
        {affix ? affix : null}
        {allowClear && value ? (
          <TouchableOpacity onPress={() => onChangeText("")}>
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={GlobalColor.white}
            />
          </TouchableOpacity>
        ) : null}
      </RowContainer>
    </View>
  );
};

export default InputComponent;

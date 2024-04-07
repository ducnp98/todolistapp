import { View, Text, Modal, Button, Dimensions } from "react-native";
import React, { useState } from "react";
import TitleComponent from "./TitleComponent";
import TextComponent from "./TextComponent";
import { ArrowDown2 } from "iconsax-react-native";
import SpaceComponent from "./SpaceComponent";
import DatePicker from "react-native-date-picker";
import RowContainer from "./RowContainer";
import { GlobalColor } from "../constants/colors";
import { globalStyle } from "../styles/globalStyle";
import ButtonComponent from "./ButtonComponent";

interface Props {
  type?: "date" | "time" | "datetime";
  title?: string;
  placeholder?: string;
  selected?: any;
  onSelect: (val: any) => void;
}

const DateTimePickerComponent = (props: Props) => {
  const { selected, onSelect, placeholder, title, type } = props;

  const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);
  const [date, setDate] = useState(selected ?? new Date());
  return (
    <>
      <View style={{ marginBottom: 16, flex: 1 }}>
        {title && <TitleComponent>{title}</TitleComponent>}
        <RowContainer
          onPress={() => setIsVisibleModalDateTime(true)}
          customStyle={[
            globalStyle.inputContainer,
            { marginTop: title ? 8 : 0, paddingVertical: 16 },
          ]}
        >
          <TextComponent flex={1} color={selected ? "text" : "lightGray"}>
            {selected
              ? type === "time"
                ? `${selected.getHours()}:${selected.getMinutes()}`
                : `${selected.getDate()}/${
                    selected.getMonth() + 1
                  }/${selected.getFullYear()}`
              : placeholder
              ? placeholder
              : ""}
          </TextComponent>
          <ArrowDown2 size={20} color={GlobalColor.text} />
        </RowContainer>
      </View>

      <Modal visible={isVisibleModalDateTime} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              margin: 20,
              width: "90%",
              backgroundColor: GlobalColor.white,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <TitleComponent color={"blue"}>Date time picker</TitleComponent>
            <View>
              <DatePicker
                mode={type ? type : "datetime"}
                date={date}
                theme="light"
                onDateChange={(val) => setDate(val)}
                locale="vi"
              />
            </View>
            <SpaceComponent height={20} />

            <ButtonComponent
              action={() => {
                onSelect(date);
                setIsVisibleModalDateTime(false);
              }}
            >
              Confirm
            </ButtonComponent>
            <SpaceComponent height={8} />

            <ButtonComponent
            color={GlobalColor.lightGray}
              action={() => {
                setIsVisibleModalDateTime(false);
              }}
            >
              Close
            </ButtonComponent>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateTimePickerComponent;

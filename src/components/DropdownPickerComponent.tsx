import React, { useEffect, useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import { SelectModel } from "../models/SelectModel";
import TitleComponent from "./TitleComponent";
import RowContainer from "./RowContainer";
import { globalStyle } from "../styles/globalStyle";
import TextComponent from "./TextComponent";
import { GlobalColor } from "../constants/colors";
import { ArrowDown2, SearchNormal1, TickCircle } from "iconsax-react-native";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import SpaceComponent from "./SpaceComponent";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {
  title: string;
  items: SelectModel[];
  selected: string[];
  onSelect: (val: string[]) => void;
  multiple: boolean;
};

const DropdownPickerComponent = ({
  title,
  items,
  selected,
  onSelect,
  multiple,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState<SelectModel[]>([]);
  const [dataSelected, setDataSelected] = useState<string[]>([]);

  const handleSelected = (id: string) => {
    const data = [...dataSelected];

    if (multiple) {
      const index = data.findIndex((item) => item === id);

      if (index < 0) {
        data.push(id);
      } else {
        data.splice(index, 1);
      }
      setDataSelected(data);
    } else {
      setDataSelected([id]);
    }
  };

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      const data = items.filter((element) =>
        element.label.toLowerCase().includes(searchKey.toLowerCase())
      );

      setResults(data);
    }
  }, [searchKey]);

  const handleConfirm = () => {
    onSelect(dataSelected);

    setIsVisible(false);

    setDataSelected([]);
  };

  useEffect(() => {
    setDataSelected(selected);
  }, [selected]);

  const handleRemoveUser = (id: string) => {
    const index = selected.findIndex((x) => x === id);
    const updatedData = [...selected];

    updatedData.splice(index, 1);
    onSelect(updatedData);
  };

  const renderSelectedItem = (id: string, index: number) => {
    const item = items.find((element) => element.value === id);
    return (
      item && (
        <RowContainer
          key={index}
          alignItems="center"
          onPress={() => handleRemoveUser(id)}
          customStyle={{
            marginRight: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 100,
            flex: 0,
            borderWidth: 0.5,
            borderColor: GlobalColor.lightGray,
          }}
        >
          <TextComponent flex={0}>{item?.label}</TextComponent>
          <SpaceComponent width={8} />
          <AntDesign name="close" size={14} color={GlobalColor.text} />
        </RowContainer>
      )
    );
  };

  return (
    <View style={{ marginBottom: 16 }}>
      {title && <TitleComponent>{title}</TitleComponent>}
      <RowContainer
        onPress={() => {
          setIsVisible(true);
        }}
        customStyle={[
          globalStyle.inputContainer,
          { marginTop: title ? 8 : 0, paddingVertical: 16 },
        ]}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          {selected.length > 0 ? (
            <RowContainer customStyle={{ flexWrap: "wrap", rowGap: 8 }}>
              {selected.map((item, index) => renderSelectedItem(item, index))}
            </RowContainer>
          ) : (
            <TextComponent color="lightGray" flex={0}>
              Select
            </TextComponent>
          )}
        </View>
        <ArrowDown2 size={20} color={GlobalColor.text} />
      </RowContainer>
      <Modal
        visible={isVisible}
        style={{ flex: 1, backgroundColor: "red" }}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <View
          style={[
            globalStyle.container,
            {
              padding: 20,
              paddingTop: 60,
              paddingVertical: 30,
            },
          ]}
        >
          <FlatList
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <RowContainer
                customStyle={{ paddingVertical: 16 }}
                onPress={() => handleSelected(item.value)}
                justifyContent="space-between"
              >
                <TextComponent
                  size={16}
                  color={dataSelected.includes(item.value) ? "coral" : "text"}
                >
                  {item.label}
                </TextComponent>
                {dataSelected.includes(item.value) ? (
                  <TickCircle size={20} color="coral" />
                ) : null}
              </RowContainer>
            )}
            data={searchKey ? results : items}
            keyExtractor={(item) => item.value}
            ListHeaderComponent={
              <RowContainer
                customStyle={{ alignItems: "center", justifyContent: "center" }}
              >
                <View style={{ flex: 1, marginRight: 12 }}>
                  <InputComponent
                    value={searchKey}
                    placeholder="Search..."
                    onChangeText={(val) => setSearchKey(val)}
                    prefix={
                      <SearchNormal1 size={20} color={GlobalColor.lightGray} />
                    }
                    allowClear
                  />
                </View>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <TextComponent color="coral" flex={0}>
                    Cancel
                  </TextComponent>
                </TouchableOpacity>
              </RowContainer>
            }
          />
          <ButtonComponent action={handleConfirm}>
            <TitleComponent size={16}>Confirm</TitleComponent>
          </ButtonComponent>
        </View>
      </Modal>
    </View>
  );
};

export default DropdownPickerComponent;

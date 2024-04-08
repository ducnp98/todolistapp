import { FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import TextComponent from "../../components/TextComponent";
import TitleComponent from "../../components/TitleComponent";
import { TaskModel } from "../../models/TaskModel";
import SectionComponent from "../../components/SectionComponent";
import InputComponent from "../../components/InputComponent";
import { SearchNormal1 } from "iconsax-react-native";
import { replaceName } from "../../utils/replaceName";
import { GlobalColor } from "../../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routers/Routes";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "ListTask"> {}

const ListTaskScreen = ({ navigation, route }: Props) => {
  const { tasks } = route.params;

  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState<TaskModel[]>([]);

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      const items = tasks.filter((element) =>
        replaceName(element.title)
          .toLowerCase()
          .includes(replaceName(searchKey).toLowerCase())
      );

      setResults(items);
    }
  }, [searchKey]);

  return (
    <Container back isScroll={false}>
      <SectionComponent>
        <InputComponent
          value={searchKey}
          onChangeText={(val) => setSearchKey(val)}
          allowClear
          prefix={<SearchNormal1 size={20} color={GlobalColor.lightGray} />}
          placeholder="Search"
        />
      </SectionComponent>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={searchKey ? results : tasks}
        ListEmptyComponent={
          <SectionComponent>
            <TextComponent>Data not found!!!</TextComponent>
          </SectionComponent>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginBottom: 24,
              paddingHorizontal: 16,
            }}
            onPress={() =>
              navigation.navigate("TaskDetail", {
                id: item.id ?? "",
              })
            }
            key={item.id}
          >
            <TitleComponent>{item.title}</TitleComponent>
            <TextComponent numberOfLines={2}>{item.description}</TextComponent>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default ListTaskScreen;

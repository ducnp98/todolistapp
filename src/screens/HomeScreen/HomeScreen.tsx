import React from "react";
import Container from "../../components/Container";
import TextComponent from "../../components/TextComponent";
import SectionComponent from "../../components/SectionComponent";
import RowContainer from "../../components/RowContainer";
import TitleComponent from "../../components/TitleComponent";
import { GlobalColor } from "../../constants/colors";
import { globalStyle } from "../../styles/globalStyle";
import CardComponent from "../../components/CardComponent";
import { View } from "react-native";
import { Element4, SearchNormal } from "iconsax-react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  return (
    <Container>
      <SectionComponent>
        <RowContainer justifyContent="space-between">
          <Element4 color={GlobalColor.desc} size={24} />
          <IonIcon name="notifications" color={GlobalColor.desc} size={24} />
        </RowContainer>
      </SectionComponent>
      <SectionComponent>
        <TextComponent>Hi, Jason</TextComponent>
        <TitleComponent>Be Productive today</TitleComponent>
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
              <TextComponent>Tag</TextComponent>
            </View>
            <View>
              <TextComponent>CircleChar</TextComponent>
            </View>
          </RowContainer>
        </CardComponent>
      </SectionComponent>
    </Container>
  );
};

export default HomeScreen;

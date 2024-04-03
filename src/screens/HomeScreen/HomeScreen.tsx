import React from "react";
import Container from "../../components/Container";
import TextComponent from "../../components/TextComponent";
import SectionComponent from "../../components/SectionComponent";
import RowContainer from "../../components/RowContainer";
import TitleComponent from "../../components/TitleComponent";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GlobalColor } from "../../constants/colors";
import { globalStyle } from "../../styles/globalStyle";
import CardComponent from "../../components/CardComponent";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <Container>
      <SectionComponent>
        <RowContainer justifyContent="space-between">
          <TextComponent>dada</TextComponent>
          <TextComponent>dada</TextComponent>
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
          <TextComponent> Search</TextComponent>
          <TextComponent> Search</TextComponent>
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

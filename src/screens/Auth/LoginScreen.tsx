import React, { useState } from "react";

import auth from "@react-native-firebase/auth";
import Container from "../../components/Container";
import SectionComponent from "../../components/SectionComponent";
import RowContainer from "../../components/RowContainer";
import TitleComponent from "../../components/TitleComponent";
import InputComponent from "../../components/InputComponent";
import { Lock, Sms } from "iconsax-react-native";
import { GlobalColor } from "../../constants/colors";
import ButtonComponent from "../../components/ButtonComponent";
import { Text } from "react-native";
import SpaceComponent from "../../components/SpaceComponent";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routers/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TextComponent from "../../components/TextComponent";
import { HandleUser } from "../../utils/handleUser";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorText("Please enter your email and password!!!");
    } else {
      setErrorText("");
      setIsLoading(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (user) {
            HandleUser.SaveToDatabase(user)
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setErrorText(error.message);
          setIsLoading(false);
        });
    }
  };
  return (
    <Container>
      <SectionComponent
        customStyle={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <RowContainer customStyle={{ marginBottom: 16 }}>
          <TitleComponent size={32} flex={0}>
            LOGIN
          </TitleComponent>
        </RowContainer>
        <InputComponent
          title="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
          placeholder="Email"
          prefix={<Sms size={22} color={GlobalColor.lightGray} />}
          allowClear
          keyboardType="email-address"
        />
        <SpaceComponent height={20} />
        <InputComponent
          title="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(val) => setPassword(val)}
          placeholder="Password"
          prefix={<Lock size={22} color={GlobalColor.lightGray} />}
        />
        {errorText && (
          <TextComponent color="coral" flex={0}>
            {errorText}
          </TextComponent>
        )}
        <SpaceComponent height={40} />

        <ButtonComponent action={handleLogin}>Login</ButtonComponent>
        <SpaceComponent height={16} />

        <RowContainer>
          <Text style={{ color: GlobalColor.text }}>
            You don't have an account?{" "}
            <Text
              style={{ color: "coral" }}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Create an account
            </Text>
          </Text>
        </RowContainer>
      </SectionComponent>
    </Container>
  );
};

export default LoginScreen;

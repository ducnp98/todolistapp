import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import Container from "../../components/Container";
import SectionComponent from "../../components/SectionComponent";
import RowContainer from "../../components/RowContainer";
import TitleComponent from "../../components/TitleComponent";
import InputComponent from "../../components/InputComponent";
import { Lock, Sms } from "iconsax-react-native";
import { GlobalColor } from "../../constants/colors";
import SpaceComponent from "../../components/SpaceComponent";
import ButtonComponent from "../../components/ButtonComponent";
import TextComponent from "../../components/TextComponent";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (email) {
      setErrorText("");
    }
  }, [email]);

  const handleCreateAccount = async () => {
    if (!email) {
      setErrorText("Please enter your email!!!");
    } else if (!password || !confirmPassword) {
      setErrorText("Please enter your password!!!");
    } else if (password !== confirmPassword) {
      setErrorText("Password is not match!!!");
    } else if (password.length < 6) {
      setErrorText("Password must be to 6 characters");
    } else {
      setIsLoading(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (user) {
            console.log(user);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorText(error.message);
        });
    }
  };
  return (
    <Container back>
      <SectionComponent
        customStyle={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <RowContainer customStyle={{ marginBottom: 16 }}>
          <TitleComponent size={32} flex={0}>
            SIGN IN
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
          secureTextEntry
          value={password}
          onChangeText={(val) => setPassword(val)}
          placeholder="Password"
          prefix={<Lock size={22} color={GlobalColor.lightGray} />}
        />
        <SpaceComponent height={20} />

        <InputComponent
          title="Comfirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(val) => setConfirmPassword(val)}
          placeholder="Comfirm password"
          prefix={<Lock size={22} color={GlobalColor.lightGray} />}
        />

        {errorText && (
          <TextComponent color="coral" flex={0}>
            {errorText}
          </TextComponent>
        )}
        <SpaceComponent height={40} />

        <ButtonComponent action={handleCreateAccount}>Register</ButtonComponent>

        <RowContainer customStyle={{ marginTop: 20 }}>
          <Text style={{ color: GlobalColor.text }}>
            You have an account?{" "}
            <Text
              style={{ color: "coral" }}
              onPress={() => navigation.goBack()}
            >
              Login
            </Text>
          </Text>
        </RowContainer>
      </SectionComponent>
    </Container>
  );
};

export default RegisterScreen;

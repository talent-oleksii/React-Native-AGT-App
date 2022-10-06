import React, { Component, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { Input, Image } from "react-native-elements";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const [passwordViewMode, setPasswordViewMode] = useState(true);
  const [passwordIconName, setPasswordIconName] = useState("eye");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post("http://192.168.106.71:5000/api/users/login", {
        password: password,
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        AsyncStorage.multiSet([
          ["email", res.data["email"]],
          ["password", res.data["password"]],
          ["username", res.data["username"]],
        ]);

        alert("Welcome " + res.data["username"] + "!");
        navigation.navigate("DashboardScreen");
      })
      .catch((err) => {
        alert("Error");
      });
  };

  const signup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 150, height: 100 }}
        />

        <Text style={styles.headerText}>Sign In</Text>
        <Input
          placeholder="Email"
          onChangeText={(newText) => setEmail(newText)}
        />

        <Input
          placeholder="Password"
          secureTextEntry={passwordViewMode}
          onChangeText={(value) => setPassword(value)}
        />

        <View style={styles.signinBtn}>
          <Button
            mode="contained"
            // textColor="#FF8E00"
            buttonColor="#003F7D"
            onPress={login}
          >
            Sign In
          </Button>
        </View>

        <Text style={styles.bottomText}>Don't have a ATG account?</Text>

        <View style={styles.signupBtn}>
          <Button mode="contained" buttonColor="#FF8E00" onPress={signup}>
            Sign Up
          </Button>
        </View>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    pading: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    margin: 15,
    padding: 10,
    height: 40,
    borderColor: "green",
    borderWidth: 1,
  },
  signinBtn: {
    width: 300,
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    margin: 10,
  },
  signupBtn: {
    width: 300,
    padding: 10,
  },
  bottomText: {
    fontSize: 20,
    margin: 10,
    marginTop: 30,
  },
});

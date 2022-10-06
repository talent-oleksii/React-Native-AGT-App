import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Input, Image } from "react-native-elements";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const Signup = () => {
  const [userType, setUserType] = useState(1);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const login = () => {
    navigation.navigate("Signin");
  };

  const signup = () => {
    axios
      .post("http://192.168.106.71:5000/api/users/signup", {
        username: username,
        password: password,
        email: email,
        usertype: userType,
      })
      .then((res) => {
        AsyncStorage.multiSet([
          ["email", res.data["email"]],
          ["password", res.data["password"]],
          ["username", res.data["username"]],
        ]);
        alert("success");
        navigation.navigate("DashboardScreen");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 150, height: 100 }}
        />

        <Text style={styles.headerText}>Sign Up</Text>
        <Input
          placeholder="Name"
          onChangeText={(newText) => {
            setUserName(newText);
          }}
        />

        <Input
          placeholder="Email"
          onChangeText={(newText) => {
            setEmail(newText);
          }}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(newText) => {
            setPassword(newText);
          }}
        />

        {/* <RNPickerSelect
          //   onValueChange={(value) => setUserType(value)}
          //   placeholder={{ label: "Select User Type" }}
          //   placeholderTextColor="#EEEEEE"
          items={[
            { label: "Technician", value: "1" },
            { label: "Warehouse Personel", value: "2" },
          ]}
        /> */}

        <View style={styles.signinBtn}>
          <Button mode="contained" buttonColor="#003F7D" onPress={signup}>
            Sign Up
          </Button>
        </View>

        <Text style={styles.bottomText}>Have a ATG account?</Text>

        <View style={styles.signupBtn}>
          <Button mode="contained" buttonColor="#FF8E00" onPress={login}>
            Sign In
          </Button>
        </View>
      </View>
    </View>
  );
};
export default Signup;

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

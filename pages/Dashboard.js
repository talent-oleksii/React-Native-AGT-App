import { Component } from "react";
import { Image } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255, 255, 255)",
  },
};

const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.body}>
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          top: 0,
          height: 350,
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#FF8E00",
        }}
      >
        <Image
          source={require("./assets/avatar.png")}
          style={{ width: 150, height: 150 }}
        />
        <Text style={styles.username}>User Name</Text>
        <Button
          mode="outlined"
          style={styles.signout}
          onPress={() => navigation.navigate("Signin")}
        >
          Sign out
        </Button>
      </View>
      <View style={styles.container}>
        <View style={styles.itemStack}>
          <View
            style={styles.items}
            onTouchEnd={() => {
              navigation.navigate("ItemsScreen");
            }}
          >
            <Image
              source={require("./assets/items_icon1.png")}
              style={{ width: 75, height: 75 }}
            />
            <Text style={styles.itemText}>ITEMS</Text>
          </View>
          <View
            style={styles.items}
            onTouchEnd={() => {
              navigation.navigate("TransactionsScreen");
            }}
          >
            <Image
              source={require("./assets/transaction_icon4.png")}
              style={{ width: 75, height: 75 }}
            />
            <Text style={styles.itemText}>TRANSACTIONS</Text>
          </View>
        </View>
        <View style={styles.itemStack}>
          <View style={styles.items}>
            <Image
              source={require("./assets/reports_icon.png")}
              style={{ width: 75, height: 75 }}
            />
            <Text style={styles.itemText}>REPORTS</Text>
          </View>
          <View style={styles.items}>
            <Image
              source={require("./assets/more_icon.png")}
              style={{ width: 75, height: 75 }}
            />
            <Text style={styles.itemText}>MORE</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#EEEEEE",
    paddingBottom: 50,
  },
  container: {
    // width: '80%',
  },
  items: {
    width: 150,
    margin: 15,
    height: 150,
    borderRadius: 15,
    // backgroundColor: '#003F7D',
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  itemStack: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    marginTop: 20,
    fontSize: 18,
    color: "#003F7D",
    // color: 'white',
  },
  username: {
    margin: 10,
    fontSize: 40,
    color: "white",
  },
  signout: {
    marginTop: 20,
  },
});

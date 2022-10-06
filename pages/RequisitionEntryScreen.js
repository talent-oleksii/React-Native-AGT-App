import React, { useRef, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { List, Divider } from "react-native-paper";
import { DrawerLayoutAndroid, Text, StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import RequisitionEntry from "./RequisitionEntry";
import { useNavigation } from "@react-navigation/native";

const RequisitionEntryScreen = () => {
  const navigation = useNavigation();
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    AsyncStorage.multiGet(["email", "username"]).then((data) => {
      setEmail(data[0][1]);
      setUsername(data[1][1]);
    });
  }, []);
  const navigationView = () => (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
        <View>
          <Image
            source={require("./assets/avatar-small.png")}
            style={{ width: 75, height: 75 }}
          />
        </View>
        <View>
          <Text style={styles.drawerUsername}>{username}</Text>
          <Text style={styles.drawerUserword}>{email}</Text>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        <View>
          <List.Section>
            <List.Item
              title="Dashboard"
              onPress={() => {
                drawer.current.closeDrawer(),
                  navigation.navigate("DashboardScreen");
              }}
            />
            <Divider />
            <List.Item
              title="Items"
              onPress={() => {
                drawer.current.closeDrawer(),
                  navigation.navigate("ItemsScreen");
              }}
            />
            <Divider />
            <List.Item
              title="Transactions"
              onPress={() => {
                drawer.current.closeDrawer(),
                  navigation.navigate("TransactionsScreen");
              }}
            />
            <Divider />
            <List.Item
              title="Retailer"
              onPress={() => {
                drawer.current.closeDrawer(),
                  navigation.navigate("RetailerDataScreen");
              }}
            />
            <Divider />
          </List.Section>
        </View>
        <View>
          <Divider />
          <List.Item
            title="Sign out"
            onPress={() => {
              navigation.navigate("Signin");
            }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <RequisitionEntry />
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  drawerHeader: {
    height: 150,
    backgroundColor: "#003F7D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  drawerUsername: {
    fontSize: 25,
    color: "white",
    padding: 5,
    fontWeight: "bold",
  },
  drawerUserword: {
    fontSize: 12,
    color: "white",
    padding: 5,
  },
});

export default RequisitionEntryScreen;

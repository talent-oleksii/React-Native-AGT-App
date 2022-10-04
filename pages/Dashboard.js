import { useEffect, useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

import { Image } from "react-native-elements";
import { Button } from "react-native-paper";
import {
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    AsyncStorage.multiGet(['email', 'username']).then((data) => {
      setEmail(data[0][1]);
      setUsername(data[1][1]);
    });
  }, []);
  

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
        <Text style={styles.username}>{username}</Text>
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
  },
  items: {
    width: 150,
    margin: 15,
    height: 150,
    borderRadius: 15,
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

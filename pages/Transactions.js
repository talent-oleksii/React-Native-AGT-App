import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Divider,
  List,
  DataTable,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const Transactions = () => {
  const navigation = useNavigation();
  const status_icon = {
    pending: require("../assets/pending_icon.png"),
    save: require("../assets/saved_icon.png"),
    open: require("../assets/open_icon.png"),
    return: require("../assets/return_icon.png"),
  };

  const [transaction_list, setTransactionList] = useState([]);
  const [viewMode, setViewMode] = useState("ALL");

  const moreDetail = (child_transaction_number, transaction_status, e) => {
    if (transaction_status == "pending") {
      AsyncStorage.setItem(
        "child_transaction_number",
        child_transaction_number
      );
      console.log(child_transaction_number);
      navigation.navigate("PendingRequisitionScreen");
    } else if (transaction_status == "saved") {
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.106.71:5000/api/transactions/getalltransactions")
      .then((res) => {
        console.log(res.data);
        setTransactionList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Button
          icon="menu"
          mode="text"
          onPress={() => console.log("Pressed")}
          style={styles.headerButton}
        />
        <Text style={styles.headerText}> Transactions </Text>
        <TextInput
          style={styles.searchInput}
          label="search"
          mode="outlined"
          right={<TextInput.Icon icon="magnify" />}
        />
      </View>
      <View>
        <ScrollView horizontal={true} style={styles.viewMode}>
          {viewMode == "ALL" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>ALL</Text>
            </View>
          )}
          {viewMode != "ALL" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("ALL");
              }}
            >
              <Text style={styles.viewModeText}>ALL</Text>
            </View>
          )}
          {viewMode == "pending" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Pending Requisition</Text>
            </View>
          )}
          {viewMode != "pending" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("pending");
              }}
            >
              <Text style={styles.viewModeText}>Pending Requisition</Text>
            </View>
          )}
          {viewMode == "saved" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Saved Requisition</Text>
            </View>
          )}
          {viewMode != "saved" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("saved");
              }}
            >
              <Text style={styles.viewModeText}>Saved Requisition</Text>
            </View>
          )}
          {viewMode == "open" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Open Shipment</Text>
            </View>
          )}
          {viewMode != "open" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("open");
              }}
            >
              <Text style={styles.viewModeText}>Open Shipment</Text>
            </View>
          )}
          {viewMode == "return" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Returns</Text>
            </View>
          )}
          {viewMode != "return" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("return");
              }}
            >
              <Text style={styles.viewModeText}>Returns</Text>
            </View>
          )}
          {viewMode == "report" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Reports</Text>
            </View>
          )}
          {viewMode != "report" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("report");
              }}
            >
              <Text style={styles.viewModeText}>Reports</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.transactionList}>
        {transaction_list.map((transaction, index) => {
          return (
            (viewMode == "ALL" || viewMode == transaction["status"]) && (
              <View
                style={styles.transactionListItem}
                key={index}
                onTouchEnd={(e) =>
                  moreDetail(
                    transaction["child_transaction_number"],
                    transaction["status"],
                    e
                  )
                }
              >
                <Image
                  source={status_icon[transaction["status"]]}
                  style={{ width: 100, height: 60 }}
                />
                <Text style={styles.transactionText}>
                  {transaction["retailer"]}
                </Text>
                <Text style={styles.transactionText}>
                  {transaction["date"]}
                </Text>
              </View>
            )
          );
        })}
      </View>
      <View style={styles.footer}>
        <Button
          style={styles.addButton}
          mode="contained"
          buttonColor="green"
          onPress={() => {
            navigation.navigate("Requisition Entry Screen");
          }}
        >
          <Icon name="plus" color={"white"}></Icon>
        </Button>
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    height: 90,
    width: "100%",
    flexDirection: "row",
  },
  headerButton: {
    height: 40,
    width: 30,
    minWidth: 30,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 0,
  },
  headerText: {
    margin: 25,
    marginLeft: 0,
    marginRight: 0,
    color: "black",
    fontSize: 30,
  },
  searchInput: {
    margin: 15,
    marginLeft: 5,
    width: 150,
    fontSize: 20,
  },
  transactionList: {
    margin: 20,
  },
  transactionText: {
    padding: 5,
    fontSize: 20,
  },
  trasactionDivider: {
    height: 2,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  footerText: {
    marginTop: 10,
    marginRight: 10,
  },
  addButton: {
    // minWidth: 55,
    width: 50,
    borderColor: "black",
  },
  viewMode: {},
  viewModeBtn: {
    backgroundColor: "#003F7D",
  },
  viewModeText: {
    marginHorizontal: 10,
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  viewModeActiveBtn: {
    backgroundColor: "#FF8E00",
  },
  transactionListItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    borderRadius: 15,
    margin: 5,
    height: 60,
  },
  transactionText: {
    width: 85,
    marginTop: 17,
    fontSize: 16,
  },
});

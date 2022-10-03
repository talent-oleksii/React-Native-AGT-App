import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Divider,
} from "react-native-paper";
import {
  useNavigation,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Transactions = () => {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState("ALL");
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
          {viewMode == "Pending Requisition" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Pending Requisition</Text>
            </View>
          )}
          {viewMode != "Pending Requisition" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("Pending Requisition");
              }}
            >
              <Text style={styles.viewModeText}>Pending Requisition</Text>
            </View>
          )}
          {viewMode == "Saved Requisition" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Saved Requisition</Text>
            </View>
          )}
          {viewMode != "Saved Requisition" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("Saved Requisition");
              }}
            >
              <Text style={styles.viewModeText}>Saved Requisition</Text>
            </View>
          )}
          {viewMode == "Open Shipment" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Open Shipment</Text>
            </View>
          )}
          {viewMode != "Open Shipment" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("Open Shipment");
              }}
            >
              <Text style={styles.viewModeText}>Open Shipment</Text>
            </View>
          )}
          {viewMode == "Returns" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Returns</Text>
            </View>
          )}
          {viewMode != "Returns" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("Returns");
              }}
            >
              <Text style={styles.viewModeText}>Returns</Text>
            </View>
          )}
          {viewMode == "Reports" && (
            <View style={styles.viewModeActiveBtn}>
              <Text style={styles.viewModeText}>Reports</Text>
            </View>
          )}
          {viewMode != "Reports" && (
            <View
              style={styles.viewModeBtn}
              onTouchEnd={() => {
                setViewMode("Reports");
              }}
            >
              <Text style={styles.viewModeText}>Reports</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.transactionList}>
        <Text style={styles.transactionText}>Transaction1</Text>
        <Divider style={styles.trasactionDivider} />
        <Text style={styles.transactionText}>Transaction2</Text>
        <Divider style={styles.trasactionDivider} />
        <Text style={styles.transactionText}>Transaction3</Text>
        <Divider style={styles.trasactionDivider} />
        <Text style={styles.transactionText}>Transaction4</Text>
        <Divider style={styles.trasactionDivider} />
        <Text style={styles.transactionText}>Transaction5</Text>
        <Divider style={styles.trasactionDivider} />
      </View>
      <View style={styles.footer}>
        <Button style={styles.addButton} mode="contained" buttonColor="green" onPress={ ()=>{ navigation.navigate("Requisition Entry Screen") }}>
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
});

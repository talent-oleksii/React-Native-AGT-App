import * as React from "react";
import { Paragraph, Dialog, Portal, Provider } from "react-native-paper";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";
import { Input, Text } from "react-native-elements";
import ThemedListItem from "react-native-elements/dist/list/ListItem";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const PendingRequisition = () => {
  const navigation = useNavigation();

  const [entry_date, setEntryDate] = React.useState("");
  const [pickup_date, setPickupDate] = React.useState("");
  const [retailer, setRetailer] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [items_list, setItem_list] = React.useState([]);

  var child_transaction_number;
  React.useEffect(() => {
    AsyncStorage.multiGet(["child_transaction_number", "email"]).then(
      (data) => {
        child_transaction_number = data[0][1];
        axios
          .post(
            "http://192.168.106.71:5000/api/transactions/getpendingrequisition",
            {
              child_transaction_number: child_transaction_number,
            }
          )
          .then((res) => {
            setEntryDate(res.data.entry_date);
            setPickupDate(res.data.pickup_date);
            setRetailer(res.data.retailer);
            setDescription(res.data.description);
            setItem_list(res.data.items_qty);
          })
          .catch((err) => console.log(err));
      }
    );
  }, []);

  const Approve = (e) => {
    AsyncStorage.multiGet(["child_transaction_number", "email"]).then(
      (data) => {
        axios
          .post(
            "http://192.168.106.71:5000/api/transactions/approvependingrequisition",
            {
              child_transaction_number: data[0][1],
              entry_date: entry_date,
              pickup_date: pickup_date,
              retailer: retailer,
              description: description,
              items_qty: items_list,
            }
          )
          .then((res) => {
            navigation.navigate("TransactionsScreen");
          });
      }
    );
  };

  const Reject = (e) => {
    AsyncStorage.multiGet(["child_transaction_number", "email"]).then(
      (data) => {
        axios
          .post(
            "http://192.168.106.71:5000/api/transactions/rejectpendingrequisition",
            {
              child_transaction_number: data[0][1],
            }
          )
          .then((res) => {
            navigation.navigate("TransactionsScreen");
          });
      }
    );
  };

  return (
    <Provider>
      <View style={styles.body}>
        <View style={styles.header}>
          <Button
            icon="menu"
            mode="text"
            onPress={() => console.log("Pressed")}
            style={styles.headerButton}
          />
          <Text style={styles.headerText}>PENDING{"\n"}REQUISITION</Text>
          <TextInput
            style={styles.searchInput}
            label="Requisition Number"
            mode="outlined"
          />
        </View>
        <View style={styles.layout1}>
          <View style={styles.datePicker}>
            <Input
              placeholder="Entry Date"
              leftIcon={{ type: "font-awesome", name: "calendar" }}
              value={entry_date}
            />
          </View>

          <View style={styles.datePicker}>
            <Input
              placeholder="Pickup Date"
              leftIcon={{ type: "font-awesome", name: "calendar" }}
              value={pickup_date}
            />
          </View>
        </View>
        <View style={styles.layout3}>
          <Input placeholder="Retailer" value={retailer} />
        </View>
        <View style={styles.layout4}>
          <Input placeholder="Description" value={description} />
        </View>
        <View style={styles.layout6}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item</DataTable.Title>
              <DataTable.Title numeric style={{ marginHorizontal: 25 }}>
                QTY
              </DataTable.Title>
            </DataTable.Header>
            {items_list.map((item, index) => {
              return (
                item.visible && (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell numeric style={{ marginHorizontal: 25 }}>
                      {item.qty}
                    </DataTable.Cell>
                  </DataTable.Row>
                )
              );
            })}
          </DataTable>
        </View>
        <View style={styles.layout7}>
          <Button
            mode="contained"
            style={styles.layout7Button}
            onPress={(e) => Approve(e)}
          >
            Approve
          </Button>
          <Button
            mode="contained"
            style={styles.layout7Button}
            onPress={(e) => Reject(e)}
          >
            Reject
          </Button>
        </View>
      </View>
    </Provider>
  );
};

export default PendingRequisition;

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
    marginTop: 25,
    marginLeft: 10,
    marginRight: 0,

    color: "black",
    fontSize: 20,
  },
  searchInput: {
    margin: 15,
    marginLeft: 65,
    width: 150,
    fontSize: 10,
  },
  datePicker: {
    width: 180,
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
    width: 50,
    borderColor: "black",
  },
  layout1: {
    marginHorizontal: 10,
    height: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  layout2: {
    marginHorizontal: 20,
    padding: 10,
    height: 40,
    backgroundColor: "green",
  },
  statusText: {
    color: "blue",
  },
  layout3: {
    marginHorizontal: 10,
    marginTop: 20,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  layout4: {
    marginHorizontal: 10,
    marginTop: 0,
  },
  layout5: {
    marginHorizontal: 20,
  },
  layout6: {
    marginHorizontal: 10,
  },
  requiredText: {
    fontSize: 20,
  },
  layout7: {
    position: "absolute",
    left: 0,
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  layout7Button: {
    // minWidth: 120,
    width: 150,
    margin: 5,
  },
});

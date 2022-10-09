import * as React from "react";
import { Paragraph, Dialog, Portal, Provider } from "react-native-paper";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";
import { Input, Text } from "react-native-elements";
import ThemedListItem from "react-native-elements/dist/list/ListItem";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SavedRequisition = () => {
  const navigation = useNavigation();

  const [entry_date, setEntryDate] = React.useState("");
  const [pickup_date, setPickupDate] = React.useState("");
  const [retailer, setRetailer] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [items_list, setItem_list] = React.useState([]);
  const [username, setUsername] = React.useState("");

  var child_transaction_number;
  React.useEffect(() => {
    AsyncStorage.multiGet(["child_transaction_number", "username"]).then(
      (data) => {
        child_transaction_number = data[0][1];
        axios
          .post(
            "http://192.168.106.71:5000/api/transactions/getsavedrequisition",
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

  const submit = (e) => {
    AsyncStorage.multiGet(["child_transaction_number", "username"]).then(
      (data) => {
        axios
          .post(
            "http://192.168.106.71:5000/api/transactions/submitsavedrequisition",
            {
              child_transaction_number: data[0][1],
              entry_date: entry_date,
              pickup_date: pickup_date,
              retailer: retailer,
              description: description,
              items_qty: items_list,
              username: username,
            }
          )
          .then((res) => {
            navigation.navigate("TransactionsScreen");
          })
          .catch((err) => alert("error"));
      }
    );
  };

  const save = (e) => {
    AsyncStorage.multiGet(["child_transaction_number", "username"]).then(
      (data) => {
        child_transaction_number = data[0][1];
        axios
          .post(
            "http://192.168.106.71:5000/api/transactions/updatesavedrequisition",
            {
              child_transaction_number: child_transaction_number,
              entry_date: entry_date,
              pickup_date: pickup_date,
              retailer: retailer,
              description: description,
              items_qty: items_list,
              username: username,
            }
          )
          .then((res) => {
            navigation.navigate("TransactionsScreen");
          })
          .catch((err) => alert("error"));
      }
    );
  };

  const cancel = (e) => {
    navigation.navigate("TransactionsScreen");
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
          <Text style={styles.headerText}>SAVED REQUISITION</Text>
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
              onChangeText={(newText) => setPickupDate(newText)}
            />
          </View>
        </View>
        <View style={styles.layout3}>
          <Input placeholder="Retailer" value={retailer} />
        </View>
        <View style={styles.layout4}>
          <Input
            placeholder="Description"
            value={description}
            onChangeText={(newText) => {
              setDescription(newText);
            }}
          />
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
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric style={{ marginHorizontal: 25 }}>
                    {item.qty}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
        <View style={styles.layout7}>
          <Button
            mode="contained"
            style={styles.layout7Button}
            onPress={(e) => save(e)}
          >
            SAVE
          </Button>
          <Button
            mode="contained"
            style={styles.layout7Button}
            onPress={(e) => submit(e)}
          >
            SUBMIT
          </Button>
          <Button
            mode="contained"
            style={styles.layout7Button}
            onPress={(e) => cancel(e)}
          >
            CANCEL
          </Button>
        </View>
      </View>
    </Provider>
  );
};

export default SavedRequisition;

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
    marginTop: 35,
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
    minWidth: 120,
    width: 100,
    margin: 5,
  },
});

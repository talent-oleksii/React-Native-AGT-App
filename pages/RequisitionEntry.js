import * as React from "react";
import { Dialog, Portal, Provider } from "react-native-paper";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Button, DataTable } from "react-native-paper";
import { Input, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RequisitionEntry = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);
  const [add_item_name, setAddItemName] = React.useState("");
  const [add_item_quantity, setAddItemQuantity] = React.useState("");
  const [entry_date, setEntryDate] = React.useState("");
  const [pickup_date, setPickupDate] = React.useState("");
  const [retailer, setRetailer] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [items_list, setItem_list] = React.useState([]);
  const [username, setUsername] = React.useState("");

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const delete_item = (index) => {
    let items = [...items_list];
    items.splice(index, 1);
    setItem_list(items);
  };
  const add_item = (itemName, itemQty, e) => {
    let name = itemName;
    let qty = itemQty;
    let items = items_list.concat({ name, qty });
    console.log(items);
    setItem_list(items);
    hideDialog();
  };

  React.useEffect(() => {
    AsyncStorage.multiGet(["retailer", "username"]).then((data) => {
      setRetailer(data[0][1]);
      setUsername(data[1][1]);
    });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    setEntryDate(today);
  }, []);

  const submit = (e) => {
    axios
      .post(
        "http://192.168.106.71:5000/api/transactions/newpendingrequisition",
        {
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
  };

  const save = (e) => {
    axios
      .post("http://192.168.106.71:5000/api/transactions/newsavedrequisition", {
        entry_date: entry_date,
        pickup_date: pickup_date,
        retailer: retailer,
        description: description,
        items_qty: items_list,
        username: username,
      })
      .then((res) => {
        navigation.navigate("TransactionsScreen");
      })
      .catch((err) => alert("error"));
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
          <Text style={styles.headerText}>REQUISITION ENTRY</Text>
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
              onChangeText={(newText) => setPickupDate(newText)}
            />
          </View>
        </View>
        <View style={styles.layout3}>
          <Text style={styles.retailerText}>Reatiler : {retailer}</Text>
        </View>
        <View style={styles.layout4}>
          <Input
            placeholder="Description"
            onChangeText={(newText) => setDescription(newText)}
          />
        </View>
        <View style={styles.layout6}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item</DataTable.Title>
              <DataTable.Title numeric style={{ marginHorizontal: 25 }}>
                QTY
              </DataTable.Title>
              <DataTable.Title onPress={showDialog}>New</DataTable.Title>
            </DataTable.Header>
            {items_list.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric style={{ marginHorizontal: 25 }}>
                    {item.qty}
                  </DataTable.Cell>
                  <DataTable.Cell onPress={(e) => delete_item(index)}>
                    X
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
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Add Item</Dialog.Title>
            <Dialog.Content>
              <Input
                placeholder="Item Name"
                onChangeText={(newItemName) => setAddItemName(newItemName)}
              />
              <Input
                placeholder="Quantity"
                onChangeText={(newItemQuantity) =>
                  setAddItemQuantity(newItemQuantity)
                }
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={(e) => add_item(add_item_name, add_item_quantity, e)}
              >
                Add
              </Button>
              <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default RequisitionEntry;

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
    marginLeft: 0,
    marginRight: 0,

    color: "black",
    fontSize: 20,
  },
  searchInput: {
    margin: 15,
    marginLeft: 5,
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
    marginHorizontal: 20,
  },
  retailerText: {
    fontSize: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  layout7Button: {
    minWidth: 120,
    width: 100,
    margin: 5,
  },
});

import * as React from "react";
import { Paragraph, Dialog, Portal, Provider } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";
import { Input, Text } from "react-native-elements";
import ThemedListItem from "react-native-elements/dist/list/ListItem";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RequisitionEntry = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);
  const [add_item_name, setAddItemName] = React.useState("");
  const [add_item_quantity, setAddItemQuantity] = React.useState("");
  const [refresh, setFresh] = React.useState(false);
  const [entry_date, setEntryDate] = React.useState("");
  const [pickup_date, setPickupDate] = React.useState("");
  const [retailer, setRetailer] = React.useState("");
  const [description, setDescription] = React.useState("");

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [items_list, setItem_list] = React.useState([]);

  const delete_item = (index) => {
    let items = [...items_list];
    items[index].visible = false;
    setItem_list(items);
  };

  const add_item = (itemName, itemQty, e) => {
    // let id = items_list.length + 1;
    let name = itemName;
    let qty = itemQty;
    let visible = true;
    let items = items_list.concat({ name, qty, visible });
    console.log(items);
    setItem_list(items);
    hideDialog();
  };

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
        }
      )
      .then((res) => {
        navigation.navigate("TransactionsScreen");
      })
      .catch((err) => alert("error"));
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
              onChangeText={(newText) => setEntryDate(newText)}
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
          <Input
            placeholder="Retailer"
            onChangeText={(newText) => setRetailer(newText)}
          />
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
                item.visible && (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell numeric style={{ marginHorizontal: 25 }}>
                      {item.qty}
                    </DataTable.Cell>
                    <DataTable.Cell onPress={(e) => delete_item(index)}>
                      X
                    </DataTable.Cell>
                  </DataTable.Row>
                )
              );
            })}
          </DataTable>
        </View>
        <View style={styles.layout7}>
          <Button mode="contained" style={styles.layout7Button}>
            SAVE
          </Button>
          <Button
            mode="contained"
            style={styles.layout7Button}
            onPress={(e) => submit(e)}
          >
            SUBMIT
          </Button>
          <Button mode="contained" style={styles.layout7Button}>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  layout7Button: {
    minWidth: 120,
    width: 100,
    margin: 5,
  },
});

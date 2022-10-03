import * as React from "react";
import { Paragraph, Dialog, Portal, Provider } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";
import { Input, Text } from "react-native-elements";
import ThemedListItem from "react-native-elements/dist/list/ListItem";

const RequisitionEntry = () => {
  const [visible, setVisible] = React.useState(false);
  const [add_item_name, setAddItemName] = React.useState('');
  const [add_item_quantity, setAddItemQuantity] = React.useState('');
  const [refresh, setFresh] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const items_list = [
    {
      id: 1,
      name: "Earnest Green",
      qty: 1,
      visible: true,
    },
    {
      id: 2,
      name: "Winston Orn",
      qty: 2,
      visible: true,
    },
    {
      id: 3,
      name: "Carlton Collins",
      qty: 3,
      visible: true,
    },
    {
      id: 4,
      name: "Malcolm Labadie",
      qty: 4,
      visible: true,
    },
  ];

  const delete_item = (id, e) => {
    // items_list.slice({id: id}, 1);
    // items_list.d
    // alert("1");
    // items_list.slice(id, 1);
    // items_list.delete(id);
    items_list.forEach(item => {
        if(item.id == id) {
            item.visible = false;
        }
    });
    console.log(items_list);
    setFresh(!refresh);
  }

   const add_item = (itemName, itemQty, e) => {
    items_list.push(items_list.length + 1, itemName, itemQty, true);
    console.log(items_list);
    hideDialog();
    setFresh(!refresh);
   }

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
            />
          </View>

          <View style={styles.datePicker}>
            <Input
              placeholder="Pickup Date"
              leftIcon={{ type: "font-awesome", name: "calendar" }}
            />
          </View>
        </View>
        <View style={styles.layout2}>
          <Text style={styles.statusText}>Status</Text>
        </View>
        <View style={styles.layout3}>
          <Input placeholder="Retailer" />
        </View>
        <View style={styles.layout4}>
          <Input placeholder="Description" />
        </View>
        <View style={styles.layout5}>
          <Text style={styles.requiredText}>Part Required</Text>
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
            {items_list.map((item) => {
              return (
                item.visible && 
                <DataTable.Row>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric style={{ marginHorizontal: 25 }}>
                    {item.qty}
                  </DataTable.Cell>
                  <DataTable.Cell onPress={e => delete_item(item.id, e)}>X</DataTable.Cell>
                </DataTable.Row>
                
              );
            })}
          </DataTable>
        </View>
        <View style={styles.layout7}>
          <Button mode="contained" style={styles.layout7Button}>
            SAVE
          </Button>
          <Button mode="contained" style={styles.layout7Button}>
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
              <Input placeholder="Item Name" onChangeText={newItemName => setAddItemName(newItemName)}></Input>
              <Input placeholder="Quantity" onChangeText={newItemQuantity => setAddItemQuantity(newItemQuantity)}></Input>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={ e => add_item(add_item_name, add_item_quantity, e)}>Add</Button>
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

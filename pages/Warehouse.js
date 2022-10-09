import { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, Image } from "react-native";
import {
  TextInput,
  Button,
  DataTable,
  SegmentedButtons,
  Divider,
  Portal,
  Provider,
  Dialog,
  Paragraph,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Signature from "react-native-signature-canvas";
import { Input, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const style = `.m-signature-pad--footer
.button {
  background-color: red;
  color: #FFF;
}`;

const Warehouse = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [signature, setSign] = useState(null);
  const [entry_date, setEntryDate] = useState("");
  const [pickup_date, setPickupDate] = useState("");
  const [actualpickup_date, setActualPickupDate] = useState("");
  const [retailer, setRetailer] = useState("");
  const [requisition_number, setRequisitionNumber] = useState("");
  const [items_list, setItem_list] = useState([]);
  const [username, setUsername] = useState("");

  const handleOK = (signature) => {
    console.log(signature);
    setSign(signature);
    hideDialog();
  };

  const handleEmpty = () => {
    console.log("Empty");
  };
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const submit = () => {
    navigation.navigate("AssignReturnScreen");
  };

  useEffect(() => {
    AsyncStorage.multiGet([
      "child_transaction_number",
      "email",
      "username",
    ]).then((data) => {
      child_transaction_number = data[0][1];
      setUsername(data[2][1]);
      axios
        .post("http://192.168.106.71:5000/api/transactions/getopenshipment", {
          child_transaction_number: data[0][1],
        })
        .then((res) => {
          setEntryDate(res.data.entry_date);
          setPickupDate(res.data.pickup_date);
          setRetailer(res.data.retailer);
          setRequisitionNumber(res.data.requisition_number);
          setItem_list(res.data.items_qty);
        })
        .catch((err) => alert(err));
    });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    setActualPickupDate(today);
  }, []);

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
          <Text style={styles.headerText}>
            Warehouse Shipment{"\n"}Receival
          </Text>
          <TextInput
            style={styles.searchInput}
            label="Shipment Number"
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
          <View style={styles.titleText}>
            <Input placeholder="Retailer" value={retailer} leftIcon={{}} />
          </View>
          <View style={styles.actualPickdateText}>
            <Input
              placeholder="Actual Pickup Date"
              leftIcon={{ type: "font-awesome", name: "calendar" }}
              onChangeText={(newText) => {
                setActualPickupDate(newText);
              }}
              value={actualpickup_date}
            />
          </View>
        </View>
        <View style={styles.layout4}>
          <Input placeholder="Requisition Number" value={requisition_number} />
        </View>
        <View style={styles.layout5}>
          <Text style={styles.requiredText}>Items</Text>
        </View>
        <View style={styles.layout6}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item</DataTable.Title>
              <DataTable.Title numeric>QTY</DataTable.Title>
            </DataTable.Header>
            {items_list.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.qty}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
        <View style={styles.layout8}>
          <Text h4>
            Picked up By: {username}
            {"\n"}
          </Text>

          <View flexDirection="row" justifyContent="space-between">
            <Text h4>Signature:</Text>
            <IconButton
              icon="draw"
              iconColor={MD3Colors.error50}
              size={20}
              mode="contained"
              onPress={showDialog}
            />
          </View>
          <View>
            <View style={styles.preview}>
              {signature ? (
                <Image
                  resizeMode={"contain"}
                  style={{ width: 335, height: 114 }}
                  source={{ uri: signature }}
                />
              ) : null}
            </View>

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                  <View
                    style={{
                      width: 300,
                      height: 400,
                    }}
                  >
                    <Signature
                      onOK={handleOK}
                      onEmpty={handleEmpty}
                      descriptionText="Sign"
                      clearText="Clear"
                      confirmText="Save"
                      webStyle={style}
                    />
                  </View>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
        </View>
        <View style={styles.layout7}>
          <Button
            mode="contained"
            style={styles.layout7Button}
            onPress={submit}
          >
            SUBMIT
          </Button>
          <Button mode="contained" style={styles.layout7Button}>
            CANCEL
          </Button>
        </View>
      </View>
    </Provider>
  );
};

export default Warehouse;

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
    // minWidth: 55,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    width: 190,
    height: 10,
  },
  actualPickdateText: {
    width: 190,
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
    right: 0,
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  layout7Button: {
    minWidth: 120,
    width: 100,
    margin: 5,
  },
  layout8: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});

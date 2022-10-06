import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { List, TextInput, Button } from "react-native-paper";
import axios from "axios";

const RetailerData = () => {
  const [retailer_list, setRetailerList] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.106.71:5000/api/retailer/getretailer")
      .then((res) => {
        console.log(res.data);
        setRetailerList(res.data);
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
        <Text style={styles.headerText}> Reatiler Data </Text>
        <TextInput
          style={styles.searchInput}
          label="search"
          mode="outlined"
          right={<TextInput.Icon icon="magnify" />}
          onChangeText={(newText) => {
            setFilterText(newText);
          }}
        />
      </View>
      <View style={styles.container}>
        {retailer_list.map((retailer, index) => {
          return (
            (retailer.name
              .toLowerCase()
              .includes(filterText.toLocaleLowerCase()) ||
              retailer.description
                .toLowerCase()
                .includes(filterText.toLocaleLowerCase())) && (
              <List.Item
                style={styles.listItem}
                title={retailer.name}
                description={retailer.description}
                left={(props) => (
                  <Image
                    source={require("./assets/retailer-avatar.png")}
                    style={{ width: 50, height: 50 }}
                  />
                )}
              />
            )
          );
        })}
      </View>
      <View style={styles.footer}>
        <Button mode="contained" style={styles.addButton}>
          Read more
        </Button>
      </View>
    </View>
  );
};

export default RetailerData;

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
    color: "black",
    fontSize: 30,
  },
  searchInput: {
    margin: 15,
    marginLeft: -20,
    width: 150,
    fontSize: 20,
  },
  container: {
    paddingHorizontal: 10,
  },
  itemQuantityText: {
    marginTop: 15,
  },
  footer: {
    position: "absolute",
    width: "100%",
    bottom: 20,
  },
  addButton: {
    backgroundColor: "#003F7D",
    width: "30%",
    left: "35%",
    marginHorizontal: "auto",
  },
  listItem: {
    margin: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
  },
});

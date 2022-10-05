import { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { List, TextInput, Button } from "react-native-paper";
import axios from "axios";

const Items = () => {
  const [items_list, setItemsList] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.106.71:5000/api/items/getitems")
      .then((res) => {
        console.log(res.data);
        setItemsList(res.data);
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
        <Text style={styles.headerText}> Items </Text>
        <TextInput
          style={styles.searchInput}
          label="search"
          mode="outlined"
          right={<TextInput.Icon icon="magnify" />}
        />
      </View>
      <View style={styles.container}>
        {items_list.map((item, index) => {
          return (
            <List.Item
              key={index}
              style={styles.listItem}
              title={item.name}
              description={item.description}
              right={(props) => (
                <Text style={styles.itemQuantityText}>{item.quantity}</Text>
              )}
            />
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

export default Items;

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
    marginLeft: 75,
    width: 150,
    fontSize: 20,
  },
  container: {
    // width: "100%",
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

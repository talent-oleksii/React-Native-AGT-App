import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { List, TextInput, Button } from "react-native-paper";

class Items extends Component {
  render() {
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
          <List.Item
            style={styles.listItem}
            title="First Item"
            description="Item description"
            right={(props) => <Text style={styles.itemQuantityText}>300</Text>}
          />
          <List.Item
            style={styles.listItem}
            title="Second Item"
            description="Item description"
            right={(props) => <Text style={styles.itemQuantityText}>50</Text>}
          />
          <List.Item
            style={styles.listItem}
            title="Third Item"
            description="Item description"
            right={(props) => <Text style={styles.itemQuantityText}>3</Text>}
          />
          <List.Item
            style={styles.listItem}
            title="Forth Item"
            description="Item description"
            right={(props) => <Text style={styles.itemQuantityText}>70</Text>}
          />
          <List.Item
            style={styles.listItem}
            title="Fifth Item"
            description="Item description"
            right={(props) => <Text style={styles.itemQuantityText}>65</Text>}
          />
          <List.Item
            style={styles.listItem}
            title="Sixth Item"
            description="Item description"
            right={(props) => <Text style={styles.itemQuantityText}>0</Text>}
          />
        </View>
        <View style={styles.footer}>
          <Button
            mode="contained"
            style={styles.addButton}
          >
            Read more
          </Button>
        </View>
      </View>
    );
  }
}

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

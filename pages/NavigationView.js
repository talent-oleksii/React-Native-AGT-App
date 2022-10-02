import { View, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const NavigationView = () => {
  const navigation = useNavigation();
  
  return (
    <View style={[styles.container, styles.navigationContainer]}>
      <List.Section>
        {/* <List.Subheader>Some title</List.Subheader> */}
        <List.Item
          title="Dashboard"
          onPress={() => {
            drawer.current.closeDrawer(), navigation.navigate("Dashboard");
          }}
        />
        <List.Item
          title="Items"
          onPress={() => {
            drawer.current.closeDrawer(), navigation.navigate("Items");
          }}
        />
        <List.Item
          title="Transactions"
          onPress={() => {
            drawer.current.closeDrawer(), navigation.navigate("Transactions");
          }}
        />
        <List.Item
          title="Retailer"
          onPress={() => {
            drawer.current.closeDrawer(), navigation.navigate("Retailer");
          }}
        />
        {/* <List.Item
                title="Assign"
                onPress={() => {drawer.current.closeDrawer(), setViewMode("Assign")}}
            /> */}
      </List.Section>
    </View>
  );
};
export default NavigationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
});
import { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, DataTable, SegmentedButtons, Divider } from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text } from 'react-native-elements';

const RequisitionEntry = () =>{

    const [date, setDate] = useState('');
    const [entryDate, setEntryDate] = useState('');

    const [pickupDate, setPickupDate] = useState('');

    return(
        <View style = {styles.body}>
            <View style = {styles.header}>
                <Button icon="menu" mode="text" onPress={() => console.log('Pressed')} style = {styles.headerButton}/>
                <Text style = {styles.headerText}>REQUISITION ENTRY</Text>
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
                        leftIcon={{ type: 'font-awesome', name: 'calendar'}}
                    />
                </View>

                <View style={styles.datePicker}>
                    <Input
                        placeholder="Pickup Date"
                        leftIcon={{ type: 'font-awesome', name: 'calendar'}}
                    />
                </View>
            </View>
            <View style={styles.layout2}>
                <Text style={styles.statusText}>Status</Text>
            </View>
            <View style={styles.layout3}>
                <Input
                    placeholder="I CAN'T SEE EXACTLY"
                />
            </View>
            <View style={styles.layout4}>
                <Input
                    placeholder="Description"
                />
            </View>
            <View style={styles.layout5}>
                <Text style={styles.requiredText}>Part Required</Text>
            </View>
            <View style={styles.layout6}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title numeric>QTY</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>Item1</DataTable.Cell>
                        <DataTable.Cell numeric>14</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Item2</DataTable.Cell>
                        <DataTable.Cell numeric>15</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
            <View style={styles.layout7}>
                <Button
                    mode="contained"
                    style={styles.layout7Button}
                >
                    SAVE
                </Button>
                <Button
                    mode="contained"
                    style={styles.layout7Button}
                >
                    SUBMIT
                </Button>
                <Button
                    mode="contained"
                    style={styles.layout7Button}
                >
                    CANCEL
                </Button>
            </View>
            <View style={styles.footer}>
                <Button
                    style={styles.addButton}
                    mode="contained"
                    buttonColor="green"
                >
                    <Icon name='plus' color={'white'}></Icon>
                </Button>
            </View>
        </View>
    );
}

export default RequisitionEntry;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        height: 90,
        width: '100%',
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
        
        color: 'black',
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
        position: 'absolute',
        bottom: 30,
        right: 30,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    footerText: {
        marginTop: 10,
        marginRight: 10,
    },
    addButton: {
        // minWidth: 55,
        width: 50,
        borderColor: 'black',
    },
    layout1: {
        marginHorizontal: 10,
        height: 70,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-between',
    },
    layout2:{
        marginHorizontal: 20,
        padding: 10,
        height: 40,
        backgroundColor: 'green'
    },
    statusText:{
        color: "blue"
    },
    layout3:{
        marginHorizontal: 10,
        marginTop: 20,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    layout4:{
        marginHorizontal: 10,
        marginTop: 0,
    },
    layout5:{
        marginHorizontal: 20,
    },
    layout6:{
        marginHorizontal: 10,
    },
    requiredText:{
        fontSize: 20,
    },
    layout7: {
        position: 'absolute',
        left: 0,
        bottom: 80,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    layout7Button:{
        minWidth: 120,
        width: 100,
        margin: 5,
    }
})
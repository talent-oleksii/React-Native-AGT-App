import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Image } from 'react-native-elements';
import { Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';

const Signup = () => {
    
    const navigation = useNavigation();

    const login = () => {
        navigation.navigate('Signin')
    }

    const [selectedValue, setSelectedValue] = useState("Technician");

    // signup = (email, pass) => {
    //     alert('Signup: email: ' + email + ' password: ' + pass)
    // }

      return (
        <View style = {styles.body}>
         <View style = {styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={{ width: 150, height: 100}}
            />

            <Text style={styles.headerText}>
                Sign Up
            </Text>
            <Input
                placeholder='Name'
            />

            <Input
                placeholder='Email'
            />

            <Input
                placeholder='Password'
                secureTextEntry
            />
            
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: "Select User Type", }}
                placeholderTextColor="#EEEEEE"
                items={[
                    { label: 'Technician', value: 'technician' },
                    { label: 'Warehouse Personel', value: 'warehouse_personel' },
                ]}
            />

            <View style = {styles.signinBtn}>
                <Button
                    mode="contained"
                    // textColor="#FF8E00"
                    buttonColor="#003F7D"
                >
                    Sign Up
                </Button>
            </View>

            <Text style = {styles.bottomText}>
                Have a ATG account?
            </Text>

            <View style = {styles.signupBtn}>
                <Button
                    mode="contained"
                    buttonColor="#FF8E00"
                    onPress={login}
                >
                    Sign In
                </Button>
            </View>
         </View>
         </View>
      )
}
export default Signup

const styles = StyleSheet.create({
    body: {
        flex : 1,
        pading: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        margin: 15,
        padding: 10,
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
    },
    signinBtn: {
        width: 300,
        padding: 10,
    },
    headerText: {
        fontSize: 30,
        margin: 10,
    },
    signupBtn: {
        width: 300,
        padding: 10,
    },
    bottomText: {
        fontSize: 20,
        margin: 10,
        marginTop: 30,
    }
})
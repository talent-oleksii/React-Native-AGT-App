
import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'react-native-elements';

const Splash = () => {
    return (
        <View style={styles.body}>
            <Image
                source={require('../assets/logo.png')}
                style={{ width: 150, height: 100, }}
            />
        </View>
    );
}

export default Splash;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
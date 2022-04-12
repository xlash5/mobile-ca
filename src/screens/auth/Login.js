import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import Palette from '../../theme/Palette';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <Text>AUTH!</Text>
            <Button
                onPress={() => {
                    navigation.navigate('SignUp');
                }}
                mode="contained"
                color={Palette.primary}>
                Go to first screen
            </Button>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
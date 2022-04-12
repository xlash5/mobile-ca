import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignUpScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>SIGN UP!</Text>
        </View>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
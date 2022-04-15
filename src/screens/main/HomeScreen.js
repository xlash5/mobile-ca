import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Palette from '../../theme/Palette';
import auth from '@react-native-firebase/auth';
import { Avatar } from 'react-native-paper';

const HomeScreen = () => {
    return (
        <View style={styles.screen}>
            <Avatar.Text size={80} label={auth().currentUser.displayName.slice(0, 2)} />
            <View style={styles.empty}></View>
            <Text style={styles.text}>Welcome {auth().currentUser.displayName}!</Text>
            <View style={styles.empty}></View>
            <Text style={styles.text}>Email: {auth().currentUser.email}</Text>
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: Palette.primary,
        fontWeight: 'bold',
    },
    empty: {
        height: 20.0,
    }
})
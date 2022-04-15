import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Palette from '../../theme/Palette';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Welcome!</Text>
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
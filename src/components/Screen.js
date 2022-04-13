import { StyleSheet, View } from 'react-native'
import React from 'react'
import Palette from '../theme/Palette';

const Screen = ({ children }) => {
    return (
        <View style={styles.screen}>
            {children}
        </View>
    )
}

export default Screen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Palette.background,
    },
})
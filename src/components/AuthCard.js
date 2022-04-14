import { StyleSheet } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import Palette from '../theme/Palette';

const AuthCard = ({ children }) => {
    return (
        <Card style={styles.card}>
            {children}
        </Card>
    )
}

export default AuthCard

const styles = StyleSheet.create({
    card: {
        width: '80%',
        height: '80%',
        backgroundColor: Palette.secondary,
        borderRadius: 10,
        paddingHorizontal: 20.0,
    },
})
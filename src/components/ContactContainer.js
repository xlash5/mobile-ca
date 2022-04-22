import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Palette from '../theme/Palette';

const ContactContainer = ({ name, number }) => {
    return (
        <View style={styles.contactContainer}>
            <Text style={styles.text}>{name} - </Text>
            <Text style={styles.text}>{number}</Text>
        </View>
    )
}

export default ContactContainer

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: Palette.primary,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contactContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Palette.secondary,
        flexWrap: 'wrap',
    }
})
import { StyleSheet, Text } from 'react-native'
import React from 'react'

const RedText = ({ text }) => {
    return (
        <Text style={styles.redText}>{text}</Text>
    )
}

export default RedText

const styles = StyleSheet.create({
    redText: {
        color: 'red',

    }
})
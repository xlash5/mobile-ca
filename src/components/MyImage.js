import { StyleSheet, Image } from 'react-native'
import React from 'react'

const MyImage = ({ uri }) => {
    return (
        <Image
            style={styles.image}
            source={{ uri: uri }}
        />
    )
}

export default MyImage;

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        margin: 10.0,
    }
})
import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import Palette from '../theme/Palette';

const MyImage = ({ uri, location }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: uri }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {location}
                </Text>
            </View>
        </View>
    )
}

export default MyImage;

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 180,
        margin: 10.0,
    },
    image: {
        width: 100,
        height: 100,
    },
    textContainer: {
        backgroundColor: Palette.secondary,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18.0,
        color: Palette.black,
    }
})
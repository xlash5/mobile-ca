import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import Palette from '../theme/Palette';

const MyImage = ({ uri, location, userName }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: uri }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Added by: {userName}
                </Text>
                <Text style={styles.text}>
                    Location: {location}
                </Text>
            </View>
        </View>
    )
}

export default MyImage;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    textContainer: {
        marginHorizontal: 40,
        marginVertical: 10,
        backgroundColor: Palette.secondary,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18.0,
        color: Palette.black,
    }
})
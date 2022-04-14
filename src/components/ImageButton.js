import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Palette from '../theme/Palette';

const ImageButton = ({ text, icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.addImageButton}>
                <Text style={styles.text}>{text}</Text>
                <Ionicons name={icon} size={32} color={Palette.white} />
            </View>
        </TouchableOpacity>
    )
}

export default ImageButton

const styles = StyleSheet.create({
    addImageButton: {
        width: 100,
        height: 100,
        margin: 10.0,
        backgroundColor: Palette.primary,
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20.0,
        color: Palette.white,
    }
})
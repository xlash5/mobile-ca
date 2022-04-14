import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Palette from '../../theme/Palette';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MyImage from '../../components/MyImage';

const Images = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const imagesRef = firestore().collection('users').doc(auth().currentUser.uid).collection('images');
    const fetchImageData = () => {
        let arr = [];
        imagesRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                arr.push(doc.data());
            });
            setImage(arr);
        });
    }

    useEffect(() => {
        fetchImageData();
    }, [])

    return (
        <View style={styles.screen}>
            {image && image.map((item, index) => {
                return <MyImage key={index} uri={item.url} />
            })}

            <Button
                onPress={() => { }}
                mode="contained"
                color={Palette.primary}>
                Upload
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});

export default Images;

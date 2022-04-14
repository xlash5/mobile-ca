import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Palette from '../../theme/Palette';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MyImage from '../../components/MyImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/ImageButton';
import GetLocation from 'react-native-get-location'

const ImagesScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const imagesRef = firestore().collection('users').doc(auth().currentUser.uid).collection('images');
    const fetchImageData = () => {
        let arr = [];
        imagesRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                arr.push(doc.data());
            });
            setImage(arr.sort((a, b) => b.time - a.time));
        });
    }

    useEffect(() => {
        fetchImageData();
    }, [])

    const getCoordsString = async () => {
        let coordsString = '';
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                coordsString = `latitude: ${location.latitude}, longitude: ${location.longitude}`;
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
                return coordsString;
            })
        return coordsString;
    }

    const uploadImage = async () => {
        let coords = await getCoordsString();

        await launchImageLibrary({}, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const imageRef = storage().refFromURL(`gs://mobile-ca-40a35.appspot.com/${auth().currentUser.uid}/${response.assets[0].fileName}`);

                imageRef.putFile(response.assets[0].uri).then(() => {
                    imageRef.getDownloadURL()
                        .then(url => {
                            imagesRef
                                .add({
                                    location: coords,
                                    url: url,
                                    time: Date.now(),
                                })
                                .then(() => {
                                    fetchImageData();
                                    console.log('Image Added!');
                                }).catch(err => { console.log(err) });
                        }).catch(err => { console.log(err) });
                }).catch(err => { console.log(err) });
            }
        });
    }

    const uploadImageFromCamera = async () => {
        let coords = await getCoordsString();

        await launchCamera({}, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const imageRef = storage().refFromURL(`gs://mobile-ca-40a35.appspot.com/${auth().currentUser.uid}/${response.assets[0].fileName}`);

                imageRef.putFile(response.assets[0].uri).then(() => {
                    imageRef.getDownloadURL()
                        .then(url => {
                            imagesRef
                                .add({
                                    location: coords,
                                    url: url,
                                    time: Date.now(),
                                })
                                .then(() => {
                                    fetchImageData();
                                    console.log('Image Added!');
                                }).catch(err => { console.log(err) });
                        }).catch(err => { console.log(err) });
                }).catch(err => { console.log(err) });
            }
        });
    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttonsContainer}>
                <ImageButton text="Add From Gallery" icon="images" onPress={uploadImage} />
                <ImageButton text="Add From Camera" icon="camera" onPress={uploadImageFromCamera} />
            </View>
            {image && image.map((item, index) => {
                return <MyImage key={index} uri={item.url} location={item.location} />
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10.0,
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
});

export default ImagesScreen;

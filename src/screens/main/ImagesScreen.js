import { View, Text, Image, StyleSheet, ScrollView, Vibration } from 'react-native';
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
import API_KEY from '../../constants/API_KEY';
import axios from 'axios';

const ImagesScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const imagesRef = firestore().collection('images');
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

    const getCoords = async () => {
        let coords = {}
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                coords = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
                return coordsString;
            })
        return coords;
    }

    const getCityByCoords = async (coords) => {
        let rCity = 'Not Found';
        await axios.get(`http://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${coords.latitude},${coords.longitude}`)
            .then(res => {
                rCity = res.data.data[0].locality;
            }).catch(err => { console.log(err) });
        return rCity;
    }

    const uploadImage = async () => {
        let city = await getCityByCoords(await getCoords());

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
                                    user: auth().currentUser.displayName,
                                    location: city,
                                    url: url,
                                    time: Date.now(),
                                })
                                .then(() => {
                                    fetchImageData();
                                    console.log('Image Added!');
                                    Vibration.vibrate(3000);
                                }).catch(err => { console.log(err) });
                        }).catch(err => { console.log(err) });
                }).catch(err => { console.log(err) });
            }
        });
    }

    const uploadImageFromCamera = async () => {
        let city = await getCityByCoords(await getCoords());

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
                                    user: auth().currentUser.displayName,
                                    location: city,
                                    url: url,
                                    time: Date.now(),
                                })
                                .then(() => {
                                    fetchImageData();
                                    console.log('Image Added!');
                                    Vibration.vibrate(3000);
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
            <ScrollView style={styles.imagesContainer}>
                {image && image.map((item, index) => {
                    return <MyImage key={index} uri={item.url} location={item.location} userName={item.user} />
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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

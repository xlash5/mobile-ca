import { View, Image, StyleSheet, FlatList, Vibration } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MyImage from '../../components/MyImage';
import ImageButton from '../../components/ImageButton';
import { Notifications } from 'react-native-notifications';
import LottieView from 'lottie-react-native';
import getCoords from '../../functions/getCoords';
import getCityByCoords from '../../functions/getCityByCoords';

const ImagesScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [fullScreen, setFullScreen] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false);

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

    const uploadImage = async () => {
        let city = await getCityByCoords(await getCoords());

        await launchImageLibrary({ quality: 0.1 }, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const imageRef = storage().refFromURL(`gs://mobile-ca-40a35.appspot.com/${auth().currentUser.uid}/${response.assets[0].fileName}`);

                setLoading(true);
                imageRef.putFile(response.assets[0].uri).then(() => {
                    imageRef.getDownloadURL()
                        .then(url => {
                            imagesRef
                                .add({
                                    user: auth().currentUser.displayName ? auth().currentUser.displayName : auth().currentUser.email,
                                    location: city,
                                    url: url,
                                    time: Date.now(),
                                })
                                .then(() => {
                                    fetchImageData();
                                    setLoading(false);
                                    console.log('Image Added!');
                                    Notifications.postLocalNotification({
                                        body: "Your image has been uploaded!",
                                        title: "Uploaded!",
                                        sound: "chime.aiff",
                                        fireDate: new Date(),
                                    });
                                    Vibration.vibrate(3000);
                                }).catch(err => { console.log(err) });
                        }).catch(err => { console.log(err) });
                }).catch(err => { console.log(err) });
            }
        });
    }

    const uploadImageFromCamera = async () => {
        let city = await getCityByCoords(await getCoords());

        await launchCamera({ quality: 0.1 }, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const imageRef = storage().refFromURL(`gs://mobile-ca-40a35.appspot.com/${auth().currentUser.uid}/${response.assets[0].fileName}`);

                setLoading(true);
                imageRef.putFile(response.assets[0].uri).then(() => {
                    imageRef.getDownloadURL()
                        .then(url => {
                            imagesRef
                                .add({
                                    user: auth().currentUser.displayName ? auth().currentUser.displayName : auth().currentUser.email,
                                    location: city,
                                    url: url,
                                    time: Date.now(),
                                })
                                .then(() => {
                                    fetchImageData();
                                    setLoading(false);
                                    console.log('Image Added!');
                                    Notifications.postLocalNotification({
                                        body: "Your image has been uploaded!",
                                        title: "Uploaded!",
                                        sound: "chime.aiff",
                                        fireDate: new Date(),
                                    });
                                    Vibration.vibrate(3000);
                                }).catch(err => { console.log(err) });
                        }).catch(err => { console.log(err) });
                }).catch(err => { console.log(err) });
            }
        });
    }


    if (fullScreen) {
        return (
            <View>
                <Image
                    style={{ height: '90%', width: '100%', resizeMode: 'contain' }}
                    source={{ uri: imageUrl }}
                />
                <Button
                    mode="contained"
                    onPress={() => {
                        console.log('clicked');
                        setFullScreen(false);
                    }}>Close</Button>
            </View>
        )
    }

    if (loading) {
        return <LottieView source={require('../../assets/animations/loading.json')} autoPlay />
    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttonsContainer}>
                <ImageButton text="Add From Gallery" icon="images" onPress={uploadImage} />
                <ImageButton text="Add From Camera" icon="camera" onPress={uploadImageFromCamera} />
            </View>
            {image && <FlatList
                data={image}
                renderItem={({ item }) => <MyImage
                    uri={item.url}
                    location={item.location}
                    userName={item.user}
                    onPress={() => {
                        setImageUrl(item.url)
                        setFullScreen(true)
                    }} />}
                keyExtractor={item => item.time}
            />}
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

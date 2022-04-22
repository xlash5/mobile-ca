import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Palette from '../../theme/Palette';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';
import ContactContainer from '../../components/ContactContainer';

const HomeScreen = () => {
    const [notes, setNotes] = useState([{ note: 'Call This', number: '241-867-5309' }]);
    return (
        <ScrollView>
            <Text style={styles.text}>Welcome!</Text>
            <View style={styles.empty}></View>
            <Text style={styles.text}>Email: {auth().currentUser.email}</Text>
            {notes.map((note) => {
                return (
                    <ContactContainer note={note.note} number={note.number} />
                )
            }
            )}
            <Button
                icon="contacts"
                mode="contained"
                onPress={() => {
                    auth().signOut().then(() => {
                        console.log("Logout Success");
                    }).catch(error => {
                        console.log(error)
                    });
                }}
                style={{ marginHorizontal: 10 }}>Select From Contacts</Button>
        </ScrollView>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: Palette.primary,
        fontWeight: 'bold',
    },
    empty: {
        height: 20.0,
    },
})
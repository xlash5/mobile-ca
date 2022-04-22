import { StyleSheet, Text, View, ScrollView, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Palette from '../../theme/Palette';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';
import ContactContainer from '../../components/ContactContainer';
import { selectContactPhone } from 'react-native-select-contact';

const HomeScreen = () => {
    const [notes, setNotes] = useState([]);

    const addNotes = async () => {
        PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_CONTACTS, PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS], {
            'title': 'Contacts',
            'message': 'This app would like to view your contacts.'
        }).then(() => {
            selectContactPhone()
                .then(selection => {
                    if (!selection) {
                        return;
                    }

                    let { contact, selectedPhone } = selection;
                    setNotes([...notes, { name: contact.name, number: selectedPhone.number }]);
                }).catch(err => { console.log(err) });
        }
        ).catch(err => {
            console.log(err);
        }
        );

    }

    return (
        <ScrollView>
            <Text style={styles.text}>Welcome!</Text>
            <View style={styles.empty}></View>
            <Text style={styles.text}>Email: {auth().currentUser.email}</Text>
            <View style={styles.empty}></View>
            <Text style={styles.text}>Remember to call this phone numbers!</Text>
            {notes.map((note) => {
                return (
                    <ContactContainer name={note.name} number={note.number} />
                )
            }
            )}
            <Button
                icon="contacts"
                mode="contained"
                onPress={addNotes}
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
        height: 5.0,
    },
})
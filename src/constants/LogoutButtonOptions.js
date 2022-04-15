import React from 'react';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default {
    headerShown: true, headerRight: () => {
        return <Button
            icon="logout"
            mode="contained"
            onPress={() => {
                auth().signOut().then(() => {
                    console.log("Logout Success");
                }).catch(error => {
                    console.log(error)
                });
            }}
            style={{ marginHorizontal: 10 }}>
            Logout
        </Button>
    }
}
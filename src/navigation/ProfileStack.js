import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Palette from '../theme/Palette';

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
            <Button
                onPress={() => {
                    navigation.navigate('First');
                }}
                mode="contained"
                color={Palette.primary}>
                Go to first screen
            </Button>
        </View>
    );
}
function FirstScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>First!</Text>
            <Button
                onPress={() => {
                    navigation.navigate('Second');
                }}
                mode="contained"
                color={Palette.primary}>GO</Button>
        </View>
    );
}
function SecondScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Second!</Text>
        </View>
    );
}

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="First" component={FirstScreen} />
            <Stack.Screen name="Second" component={SecondScreen} />
        </Stack.Navigator>
    );
}
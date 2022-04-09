import React from 'react';
import { Text, View, Button } from 'react-native';
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
                color={Palette.tirdiary}
                title="GO" />
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
                color={Palette.tirdiary}
                title="GO" />
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
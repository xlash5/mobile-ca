import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Palette from '../theme/Palette';
import ImagesScreen from '../screens/main/ImagesScreen';
import LogoutButtonOptions from '../constants/LogoutButtonOptions';

const Stack = createStackNavigator();

export default function ImageStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Images"
                component={ImagesScreen}
                options={LogoutButtonOptions} />
        </Stack.Navigator>
    );
}
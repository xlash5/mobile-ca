import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/Login';
import SignUpScreen from '../screens/auth/SignUp';
import Palette from '../theme/Palette';
import HeaderOptions from '../constants/HeaderOptions';


const Stack = createStackNavigator();

export default function AuthenticationStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={HeaderOptions} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={HeaderOptions} />
        </Stack.Navigator>
    );
}
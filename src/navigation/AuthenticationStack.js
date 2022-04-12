import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Palette from '../theme/Palette';

function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>AUTH!</Text>
            <Button
                onPress={() => {
                    navigation.navigate('SignUp');
                }}
                mode="contained"
                color={Palette.primary}>
                Go to first screen
            </Button>
        </View>
    );
}
function SignUpScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>SIGN UP!</Text>
        </View>
    );
}

const Stack = createStackNavigator();

export default function AuthenticationStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
}
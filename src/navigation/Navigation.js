import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileStack from './ProfileStack';
import AuthenticationStack from './AuthenticationStack';
import Palette from '../theme/Palette';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
            <Button
                mode="contained"
                onPress={() => {
                    auth().signOut().then(() => {
                        console.log("Logout Success");
                    }).catch(error => {
                        console.log(error)
                    });
                }}
                color={Palette.primary}>
                SignOut
            </Button>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setTimeout(() => { setShowSplashScreen(false) }, 3000);
    });

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, [auth()])

    if (showSplashScreen) {
        return <LottieView source={require('../assets/animations/splash.json')} autoPlay loop={false} />
    }


    if (!loggedIn) {
        return (
            <NavigationContainer>
                <AuthenticationStack />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Texts') {
                            iconName = focused
                                ? 'pencil'
                                : 'pencil-outline';
                        } else if (route.name === 'Images') {
                            iconName = focused ? 'image' : 'image-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={32} color={color} />;
                    },
                    tabBarActiveTintColor: Palette.primary,
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Texts" component={HomeScreen} />
                <Tab.Screen name="Images" component={ProfileStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
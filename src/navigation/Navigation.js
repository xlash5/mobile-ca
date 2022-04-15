import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageStack from './ImageStack';
import AuthenticationStack from './AuthenticationStack';
import Palette from '../theme/Palette';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import HomeScreen from '../screens/main/HomeScreen';
import LogoutButtonOptions from '../constants/LogoutButtonOptions';

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

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
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
                <Tab.Screen name="Home" component={HomeScreen} options={LogoutButtonOptions} />
                <Tab.Screen name="Images" component={ImageStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
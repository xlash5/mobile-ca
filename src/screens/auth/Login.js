import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import Palette from '../../theme/Palette';
import AuthCard from '../../components/AuthCard';
import Screen from '../../components/Screen';
import auth from '@react-native-firebase/auth';
import RedText from '../../components/RedText';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const LoginEvent = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Login Success");
            })
            .catch(error => {
                setError(true);
                console.log(error);
            });
    }

    return (
        <Screen>
            <AuthCard>
                <ScrollView>
                    <TextInput
                        style={styles.marginVertical}
                        label="Email"
                        value={email}
                        onChangeText={t => setEmail(t)}
                    />
                    <TextInput
                        style={styles.marginVertical}
                        label="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={t => setPassword(t)}
                    />
                    <Button
                        style={styles.marginVertical}
                        mode="contained"
                        onPress={LoginEvent}
                        color={Palette.primary}>
                        Login
                    </Button>
                    <Button
                        style={styles.marginVertical}
                        onPress={() => {
                            navigation.navigate('SignUp');
                        }}
                        color={Palette.primary}>
                        Go to Signup
                    </Button>
                    {error && <RedText text={"Something went wrong.."} />}
                </ScrollView>
            </AuthCard>
        </Screen>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    marginVertical: {
        marginVertical: 20.0,
    }
})
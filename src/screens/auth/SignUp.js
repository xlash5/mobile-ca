import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import Palette from '../../theme/Palette';
import AuthCard from '../../components/AuthCard';
import Screen from '../../components/Screen';
import auth from '@react-native-firebase/auth';
import RedText from '../../components/RedText';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState(false);

    const SignUpEvent = () => {
        if (password !== passwordRepeat) {
            setError(true);
            return;
        }
        auth()
            .createUserWithEmailAndPassword(email, password).then((result) => {
                result.user.updateProfile({ displayName: 'name here' }).then(() => {
                    console.log("SignUp Success");
                }).catch((e) => { console.log(e) });
            }).catch(error => {
                setError(true);
                console.log(error);
            })
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
                    <TextInput
                        style={styles.marginVertical}
                        label="Password"
                        secureTextEntry={true}
                        value={passwordRepeat}
                        onChangeText={t => setPasswordRepeat(t)}
                    />
                    <Button
                        style={styles.marginVertical}
                        mode="contained"
                        onPress={SignUpEvent}
                        color={Palette.primary}>
                        Login
                    </Button>
                    {error && <RedText text={"Something went wrong.."} />}
                </ScrollView>
            </AuthCard>
        </Screen>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    marginVertical: {
        marginVertical: 20.0,
    }
})
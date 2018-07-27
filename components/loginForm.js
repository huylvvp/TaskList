import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, 
    Button, StyleSheet, StatusBar, AsyncStorage } from 'react-native';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typedUsername:'',
            typedPassword:''
        }
    }
    UserLoginFunction = () => {
        const {typedUsername} = this.state;
        const {typedPassword} = this.state;
        fetch('http://127.0.0.1:80/index.php', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: typedUsername,
                password: typedPassword
            })
        }).then((response) => {
            response.json()
        })
                .then((responseJson) => {
                    if (responseJson === 'Data Matched') {
                        this._signInAsync;
                    }
                    else {
                        Alert.alert(responseJson);
                    }
                }).catch((error) => {
                    console.error(error);
                });
    }
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.a.navigate('App');
    }
    // _onPress = () => {
    //     if (this.state.typedText === '') {
    //         alert("You must to enter username");
    //     }
    //     else if (this.state.typedPassword === '') {
    //         alert("You must to enter password");
    //     }
    //     else {
    //         if (!this.checkUserNameAndPassWord(this.state.typedText,
    //             this.state.typedPassword)) {
    //             alert("Login incorrect");
    //         }
    //         else this._signInAsync;
    //     }
    // }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType="next"
                    placeholder='Email or Mobile Num'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    onChangeText = {(text) => {
                        this.setState((previousState) =>
                            {
                                return {
                                    typedText: text
                                }
                            })
                    }}/>

                <TextInput style={styles.input}
                    underlineColorAndroid='transparent'
                    returnKeyType="go" ref={(input) => this.passwordInput = input}
                    placeholder='Password'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    secureTextEntry 
                    onChangeText={(pass) => {
                        this.setState((previousState) => {
                            return {
                                typedPassword: pass
                            }
                        })
                    }}/>
                <TouchableOpacity style={styles.buttonContainer} onPress={this._signInAsync}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton: {
        backgroundColor: '#2980b6',
        color: '#fff'
    }

});
export default LoginForm;

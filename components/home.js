import React, { Component } from 'react';
import {Button, View, Text, ImageBackground, TouchableOpacity, AsyncStorage} from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
      title: 'Home'
    };
 
 _signOutAsync = async () => {
     await AsyncStorage.removeItem('userToken');
     this.props.navigation.navigate('Auth');
 }
 _showMoreApp = () => {
     this.props.navigation.navigate('TaskListScreen')
 }
  render() {
    return (
        <ImageBackground
            source={require('../Image/background.jpg')}
            style={{
                height: '100%',
                width: '100%',
            }}
        >
        <View style={{
            justifyContent:'center',
            alignItems:'center'
        }}>
                <Text style={{
                    color: "white",
                    fontSize: 30,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    paddingTop: 150
                }}>
                    Welcome to TaskList!
                 </Text>
                <Text style={{
                    color: "white",
                    fontSize: 25,
                    fontWeight: 'normal',
                    textAlign: 'center',
                }}>
                    Have a nice day
                </Text>
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 120,
                    width: 120,
                    height: 80,
                    borderColor: 'white',
                    borderWidth: 1,
                }}
                    onPress={this._showMoreApp}
                >
                   
                    <Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 25    

                    }}>
                    Let's go!
                    </Text>
                    
                </TouchableOpacity>
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 80 ,
                    width: 120,
                    height: 80,
                    borderColor: 'white',
                    borderWidth: 1,
                }}
                    onPress={this._signOutAsync}
                >

                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 25

                    }}>
                        Log out
                    </Text>

                </TouchableOpacity>
        </View>
        
        </ImageBackground>
    );
  }
}

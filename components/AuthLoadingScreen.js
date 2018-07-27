    import React, { Component } from 'react';
    import {  View, Text,
            ActivityIndicator,
            AsyncStorage,
            StatusBar,
            StyleSheet,
            
         } from 'react-native';
    
    export default class AuthLoadingScreen extends Component {
      constructor(props) {
          super(props);
          this._bootstrapAsync();
      }
      _bootstrapAsync = async () => {
          const userToken = await AsyncStorage.getItem ('userToken');
          this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      };
      render() {
        return (
          <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            <StatusBar barStyle="default"/>
          </View>
        );
      }
    }
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
)
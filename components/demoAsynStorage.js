import React, { Component } from 'react';
import {  View, Text, Button } from 'react-native';
import {AsyncStorage} from 'react-native';
export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:''
        }
        this._storageData();
    }
  _storageData = async () => {
      try {
        await AsyncStorage.setItem('huy', 'I like to save it');
      } catch (error) {
          console.log("Error saving data")
      }
  }
  _retrieveData = async () => {
      try {
          const value = await AsyncStorage.getItem('huy');
          if (value !== null) {
              console.log(value);
          }
      } catch (error) {
          console.log(error);
      }
      
  }
  componentDidMount = () => AsyncStorage.getItem('huy').then((value) => 
    this.setState({data:value}))
  change = () => {
      
      this.setState({
          data: "huy"
      })
      console.log("Here is it");
  }
  render() {
    return (
      <View>
        
        <Text>{this.state.data}</Text>
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
    Platform,
    TextInput,
    Text,
    Dimensions,
    AsyncStorage
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
var screen = Dimensions.get('window');
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTime: '',
            newAction: '',
            tasks: []
        };
    }
    showAddModal = () => {
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharaters) => {
        return require('random-string')({
            length: numberOfCharaters
        });
    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('key_27', this.state.tasks.toString());
        } catch (error) {
            console.log("huy");
            console.log(error);
            console.log("Loi cmnr");
        }
    }
    addTask = (task) => {
        var tasks=[];
        tasks.push(task);
        this.setState({
            tasks: tasks
        })
        console.log("diem1");
        console.log(tasks);
        console.log("diem2");
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: 10,
                    shadowRadius: 20,
                    width: screen.width - 80,
                    height: 300
                }}
                position='center'
                backdrop={true}
                //onClosed={this.refs.myModal.close()}
            >
                <Text
                    style={{
                        fontSize: 30,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginTop: 40
                    }}
                >New Task</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'black',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    underlineColorAndroid='transparent'
                    placeholder="time"
                    onChangeText={(text) => this.setState({ newTime: text })}
                    value={this.state.newTime}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    underlineColorAndroid='transparent'
                    placeholder="action"
                    onChangeText={(text) => this.setState({ newAction: text })}
                    value={this.state.newAction}
                />
                <Button
                    style={{
                        color: 'white',
                        marginLeft: 100,
                        marginRight: 100,
                        height: 40,
                        borderRadius: 6,
                        padding: 8,
                        backgroundColor: 'mediumseagreen'
                    }}
                    onPress={() => {
                        if (this.state.newTime.length === 0 || this.state.newAction.length === 0) {
                            alert("You must to enter time and action!");
                            return;
                        }
                        const newKey = this.generateKey(30);
                        const newTask = {
                            key: newKey,
                            time: this.state.newTime,
                            action: this.state.newAction,
                        }
                        this.addTask(newTask);
                        this._storeData();
                        this.props.parentFlatList.refreshData();
                        this.refs.myModal.close();
                    }
                    }
                >
                    Save
            </Button>
            </Modal>
        )
    }
}

import React, { Component } from 'react';
import {
    Platform,
    TextInput,
    Text,
    Dimensions
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import tasks from '../data/tasks';
var screen = Dimensions.get('window');
export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTime: '',
            newAction: ''
        };
    }
    showEditModal = (editingTask, TaskListItem) => {
        this.setState(
            {
                key: editingTask.key,
                newTime: editingTask.time,
                newAction: editingTask.action,
                TaskListItem: TaskListItem
            }
        )
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharaters) => {
        return require('random-string')({
            length: numberOfCharaters
        });
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
                >Task</Text>
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
                        var foundIndex = tasks.findIndex(item => this.state.key === item.key);
                        if (foundIndex < 0) {
                            return;
                        }
                        tasks[foundIndex].action = this.state.newAction;
                        tasks[foundIndex].time = this.state.newTime;
                        this.state.TaskListItem.refreshTaskListItem();
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

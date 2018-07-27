import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableHighlight, FlatList, AsyncStorage} from 'react-native';
import tasks from '../data/tasks';
import AddModal from './addModal';
import EditModal from './editModal';
class TaskListItem extends Component {
  constructor(props) {
      super(props);
      this.state = {
          activeRowKey : null,
          numberOfRefresh:0
      }
  }
    refreshTaskListItem = () => {
        this.setState((prevState) => {
            return {
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });
    }
  render() {
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          height:100
      }}>

        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: "#0984e3",
            
        }}>

            <View style={{
                flex: 2,
                flexDirection: 'column',
            }}>
                <Text style={styles.textStyle1}>{this.props.item.time}</Text>
                <Text style={styles.textStyle1}>{this.props.item.action}</Text>
            </View>
            
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#e17055',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableHighlight 
                        onPress={() => {  
                        this.props.parentFlatList.refs.editModal.showEditModal(tasks[this.props.index], this);
                        }}>
                        <Text style={styles.textStyle2}>EDIT</Text>
                    </TouchableHighlight>
                   
                </View>
                {/* <View style={{
                    height: 1,
                    backgroundColor: 'white'
                }}>
                </View> */}
                 <View style={{ 
                        flex: 1,
                        backgroundColor: "#fab1a0",
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                    <TouchableHighlight 
                    onPress={
                        () => {
                            // this.setState({
                            //     activeRowKey: this.props.item.key
                            // })
                            // const deleteRowKey = this.state.activeRowKey;   
                            tasks.splice(this.props.index,1);
                            this.props.parentFlatList.refreshData(tasks);
                        }
                    }>
                        <Text style={styles.textStyle1}>DELETE</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        <View style={{
                height: 1,
                backgroundColor: 'white'
             }}>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    textStyle1 : {
        padding: 15,
        fontSize: 15,
        color: 'white'
    },
    textStyle2 : {
        fontSize: 20,
        color: 'white',
    },
    subHeader: {
        flex: 1,
        height:50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    midHeader: {
        height: 50,
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
}); 
export default class TaskList extends Component {
    static navigationOptions = {
        title: 'Tasks'
    };
    constructor(props) {
        super(props);
        this.state = (
            {
                tasks : [],
                deleteRowKey: null,
            }
        );
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    _onPressAdd = () => {
        this.refs.addModal.showAddModal();
    }
    // refreshFlatList = (deleteKey) => {
    //     this.state = (prevState) => {
    //         return {
    //              deleteRowKey: deleteKey
    //         }
    //     }
    // }
    refreshData = () => {
        AsyncStorage.getItem('key_27')
        .then((value) => {
            this.setState({ tasks: value });
            console.log("Huy1");
            console.log(this.state.tasks);
            console.log("huy2");
            this.refs.flatList.scrollToEnd();
        }).catch((error) => {
            console.log(error);
        })
        
    }
    _onPressBack = () => {
        this.props.navigation.popToTop();
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
                <View
                    style={{
                        height:50,
                        flexDirection: 'row',
                        backgroundColor: '#00b894',
                    }}
                >
                    <View style={styles.subHeader}>
                        <TouchableHighlight
                            onPress={this._onPressBack}
                            >
                            <Text style={{
                                color: 'white',
                                fontSize: 20
                            }}>
                                BACK
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.midHeader}>
                    
                    </View>
                    <View style={styles.subHeader}>
                        <TouchableHighlight
                            onPress={this._onPressAdd}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 20
                            }}>ADD</Text>
                        </TouchableHighlight>
                    </View>
                        
                </View> 
                <FlatList
                    ref={'flatList'}
                    //style={{ flex: 1 }}
                    //data={tasks}
                    data={this.state.tasks}
                    renderItem={({ item, index }) => {
                        // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                        return (
                            <TaskListItem item={item} index={index} parentFlatList={this}>
                            </TaskListItem>
                            );
                    }}
                >
                </FlatList>
                <AddModal ref={'addModal'} parentFlatList={this}>
        
                </AddModal>
                <EditModal ref={'editModal'} parentFlatList={this}>
                
                </EditModal>
            </View>
        );
    }
}


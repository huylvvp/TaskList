import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from './login';
import TaskList from './taskList'
import Home from './home'
import AuthLoadingScreen from './AuthLoadingScreen'
const AppStack = createStackNavigator(
    {
        HomeScreen: Home,
        TaskListScreen: TaskList
    }
)
const AuthStack = createStackNavigator({
    LoginScreen: Login
})
const RootStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName:'AuthLoading',
    }
);
export default RootStack;

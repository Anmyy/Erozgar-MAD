import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Main from '../screens/Main';
import CreateNote from '../screens/CreateNote';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';

const Stack = createNativeStackNavigator();  //fn that return obj with 2 props i.e, screen and navigator

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            options= {{headerShown: false}}
            name= "Splash" component={Splash} />
            <Stack.Screen 
            options= {{headerShown: false}}
            name= "Login" component={Login} />
            <Stack.Screen 
            options= {{headerShown: false}}
            name= "Signup" component={Signup} />
            <Stack.Screen 
            name= "Main" component={Main} />
            <Stack.Screen 
            name= "Create" component={CreateNote} />
        </Stack.Navigator>
    </NavigationContainer>
  )
};
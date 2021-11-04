import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Routes';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class Router extends Component {

    render() {
        return (
            <NavigationContainer>
                <View style={styles.container}>
                    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                        {Routes.map((route, key) => {
                            return (
                                <Stack.Screen key={key} name={route.name} component={route.component}/>
                            )
                        })}
                    </Stack.Navigator>
                </View>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        width: '100%'
    }
});

export default Router;
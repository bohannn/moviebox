import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MovieScreen from './Movie';
import TVScreen from './Tv';
import DiscoverScreen from './Discover';
import MeScreen from './Me';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Header centerComponent={{ text: 'MovieBox', style: { color: 'black', fontSize: 30, fontFamily: 'Cochin', fontWeight: 'bold'  } }} backgroundColor= 'orange'/>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name == 'Movie') {
              iconName = focused ? 'local-movies' : 'local-movies';
            } else if (route.name == 'TV') {
              iconName = focused ? 'live-tv' : 'live-tv';
            } else if (route.name == 'Discover') {
              iconName = focused ? 'explore' : 'explore'
            } else if (route.name == 'Me') {
              iconName = focused ? 'person' : 'person'
            }

            return <Icon name={iconName} size={size} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'black',
          // activeBackgroundColor: 'pink',
          //inactiveBackgroundColor: 'orange'
          style: {backgroundColor: 'orange'}
        }}
      >
        <Tab.Screen name="Movie" component={MovieScreen} />
        <Tab.Screen name="TV" component={TVScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Me" component={MeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50
  },
});

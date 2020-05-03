import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  
const Tab = createMaterialTopTabNavigator();

const listSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "orange",
        }}
      />
    );
};

const keyExtractor = (item, index) => index.toString();

renderItem = ({item}) => (
    <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 15, marginLeft: 5, backgroundColor: '#000000'}}>
        <Image source={{uri:'https://image.tmdb.org/t/p/w500'+item.poster_path}} style={{width: 65, height: 85}} />
        <View style={{flexDirection: 'column', marginLeft: 5}}>
            <Text style={{fontSize: 20, color: 'orange', fontFamily: 'Helvetica'}}>{item.name}</Text>
            <Text style={{marginTop:4, color: 'white', fontFamily: 'Helvetica'}}>{item.first_air_date}  Score: {item.vote_average}</Text>
            <Text numberOfLines={1} style={{marginTop: 2, color: 'white', fontFamily: 'Helvetica'}}>Overview: {item.overview}</Text>
        </View>
    </View>
)

const getTVList = (link) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        getTV();
    }, []);

    const getTV = () => {
        fetch(link)
        .then((response) => response.json())
        .then((responseData) => setList(responseData.results))
        .catch((err) => console.log(err));
    };

    return list;
}

function popularTV() {
    
    const link = 'https://api.themoviedb.org/3/tv/popular?api_key=7e2f2d4d321ce4036fc6c2fde5a24ab5&language=en-US&page=1';
    const list = getTVList(link);

    return (
        <View style={{backgroundColor: '#000000'}}>
            <FlatList 
            style={{marginLeft: 2, marginRight: 2}}
                keyExtractor={keyExtractor}
                data={list}
                renderItem={renderItem}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    )    
}

function topratedTV() {

    const link = 'https://api.themoviedb.org/3/tv/top_rated?api_key=7e2f2d4d321ce4036fc6c2fde5a24ab5&language=en-US&page=1';
    const list = getTVList(link);

    return (
        <View style={{backgroundColor: '#000000'}}>
            <FlatList 
                style={{marginLeft: 2, marginRight: 2}}
                keyExtractor={keyExtractor}
                data={list}
                renderItem={renderItem}
                ItemSeparatorComponent={listSeparator}
            />
        </View>
    ) 
}



export default function tvs() {
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator tabBarOptions={{style: {backgroundColor: 'black'}, activeTintColor: 'orange', inactiveTintColor: 'white'}}>
                <Tab.Screen name="Popular" component={popularTV} />
                <Tab.Screen name="Top Rated" component={topratedTV} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
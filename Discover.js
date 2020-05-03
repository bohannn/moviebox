import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';

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

const renderItem = ({item}) => (
    
    <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 15, marginLeft: 5, backgroundColor: 'black'}}>
        <Image source={{uri:'https://image.tmdb.org/t/p/w500'+item.poster_path}} style={{width: 65, height: 85}} />

        <View style={{flexDirection: 'column', marginLeft: 5, backgroundColor: 'black'}}>
            <Text style={{fontSize: 20, color: 'orange', fontFamily: 'Helvetica'}}>{item.title}</Text>
            <Text style={{marginTop:4, color: 'white', fontFamily: 'Helvetica'}}>{item.release_date}  Score: {item.vote_average}</Text>
            <Text numberOfLines={1} style={{marginTop: 2, color: 'white', fontFamily: 'Helvetica'}}>Overview: {item.overview}</Text>
        </View>    
    </View>
)


export default function discover() {

    const [keyword, setKeyword] = useState('');

    const [list, setList] = useState([]); 

    useEffect(() => {
        getMovie();
        getTVShow();
    }, []);

    const getMovie = () => {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=7e2f2d4d321ce4036fc6c2fde5a24ab5&language=en-US&query=' + keyword + '&page=1')
        .then((response) => response.json())
        .then((responseData) => setList(responseData.results))
        .catch((err) => console.log(err));
    };

    const getTVShow = () => {
        fetch('https://api.themoviedb.org/3/search/tv?api_key=7e2f2d4d321ce4036fc6c2fde5a24ab5&language=en-US&query=' + keyword + '&page=1')
        .then((response) => response.json())
        .then((responseData) => setList(responseData.results))
        .catch((err) => console.log(err));
    };

    const clear = () => {
        setKeyword();
        setList();
    }


    return(
        <View style={{  backgroundColor: '#000000' }}>
            <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                    <Input 
                        label="Type here to serch movies/TV shows: " 
                        value={keyword}
                        onChangeText={(keyword) => setKeyword(keyword)}
                        inputContainerStyle={{borderWidth: 0.4}}
                        labelStyle={{marginBottom: 10, marginTop: 15, color: 'orange', fontFamily:'Helvetica'}}
                        inputStyle={{color: 'white'}}
                    />
                </View>

                <View style={{flexDirection: 'row', margin: 5}}>
                    <Button 
                        title="Search movie" 
                        buttonStyle={{marginLeft: 5, width: 175, backgroundColor: 'orange'}} 
                        onPress={getMovie}
                    />
                    <Button 
                        title="Search TV show" 
                        buttonStyle={{marginLeft: 5, width: 175, backgroundColor: 'orange'}} 
                        onPress={getTVShow}
                    />                        
                </View>

                <View style={{flexDirection: "row"}}>
                    <Text style={{marginTop: 5, marginRight: 220, marginLeft: 7, fontSize: 21, color: 'white'}}>Results: </Text>
                    <Button 
                        title="Clear"
                        type="clear"
                        onPress={clear}
                        titleStyle={{fontSize: 17, color: 'orange'}}
                    />
                </View>
        
                
                <FlatList 
                    style={{marginLeft: 2, marginRight: 2}}
                    keyExtractor={keyExtractor}
                    data={list}
                    renderItem={renderItem}
                    ItemSeparatorComponent={listSeparator}
                />
                
            </View>
        </View>
    )
}
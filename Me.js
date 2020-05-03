import React, {useState} from 'react';
import { Text, View } from 'react-native';
import { Button, Avatar, Overlay, Input, SocialIcon, ListItem } from 'react-native-elements';

const list = [
    {
        title: 'Display',
        icon: 'tv'
    }, {
        title: 'Notifications',
        icon: 'notifications'
    }, {
        title: 'Storage',
        icon: 'storage'
    }, {
        title: 'Setting',
        icon: 'settings'
    }, {
        title: 'About',
        icon: 'info'
    }
]

export default function me() {
    
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const toggleOverlay = () => {
      setVisible(!visible);
    };

    return (

        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{alignItems: 'center'}}>
                <Avatar rounded icon={{name: 'user'}} size={100} containerStyle={{marginTop: 40}} />
                
                <Button title="Log In" buttonStyle={{width: 150, marginTop: 20, backgroundColor: 'orange'}} onPress={toggleOverlay} />

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{marginTop: 7, alignItems: 'center', justifyContent: 'center', height: 500}}>
                    <Text style={{fontFamily: 'Papyrus', fontSize: 25, fontWeight: 'bold'}}>Welcome to MovieBox!</Text>
                    <Input 
                        label="Enter username/email:" 
                        value={user}
                        onChangeText={(user) => setUser(user)}
                        inputContainerStyle={{borderWidth: 0.4}}
                        labelStyle={{marginBottom: 4, marginTop: 35}}
                    />
                    <Input 
                        label="Enter password:" 
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        inputContainerStyle={{borderWidth: 0.4}}
                        labelStyle={{marginBottom: 4, marginTop: 20}}
                    />
                    <Text style={{marginTop: 15}}>Do not have an account? Sign in</Text>
                    <Text style={{marginTop: 15}}>---------------or---------------</Text>

                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        type='facebook'
                        style={{marginTop: 25, width: 200}}
                        iconStyle={{alignItems: 'center'}}
                    />
                    <SocialIcon
                        title='Sign In With Google'
                        button
                        type='google'
                        style={{marginTop: 15, width: 200}}
                        iconStyle={{alignItems: 'center'}}
                    />  
                                                
                </Overlay>
            </View>
            

            <View style={{marginTop: 50}}>
                {
                    list.map((item, i) => (
                        <ListItem 
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon}}
                            bottomDivider
                            chevron
                        />
                    ))
                }
            </View>
        </View>
    )
}
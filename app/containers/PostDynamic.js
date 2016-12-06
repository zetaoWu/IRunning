'use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ListView,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    TouchableWithoutFeedback,
    StatusBar,
    Platform,
    TextInput,
    BackAndroid,
} from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;

export default class PostDynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dynamic: ''
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FFFFFF', height: heightSrc, marginTop: 20, width: widthSrc }}>
                <View style={styles.top_style}>
                    <Image source={require('../img/cha.png')} resizeMode='center' style={{ width: 15, height: 15 }}></Image>
                    <Text style={{ fontSize: 15, color: '#FFFFFF' }}>新动态</Text>
                    <Text style={{ fontSize: 15, color: '#b1b1b1' }}>动态</Text>
                </View>

                <View style={{justifyContent:'flex-start'}}>
                    <TextInput style={styles.input}
                        multiline={true}
                        autoFocus={true}
                        placeholder='分享你的健身心得和经验吧'
                        keyboardType='default'
                        onChangeText={(text) => this.setState({ dynamic: text })}
                        value={this.state.dynamic}
                        ></TextInput>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    top_style: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50,
    },
    input: {
        width: widthSrc,
        height: heightSrc,
        flex: 1,
    },
});
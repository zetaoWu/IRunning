'use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;

export default class PostScs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
            scaleValue: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.bounceValue, { toValue: 1, duration: 300, easing: Easing.linear }).start();
        Animated.timing(this.state.scaleValue, { toValue: 1, duration: 700, easing: Easing.linear }).start();
    }

    _cancel() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={{ backgroundColor: '#453d4b', marginTop: 20, height: heightSrc, width: widthSrc, alignItems: 'center', justifyContent: 'center' }}>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.View style={{ width: 60, height: 60, borderRadius: 60, borderColor: '#737373', top: 0, left: 15, position: 'absolute', borderWidth: 5, opacity: this.state.bounceValue }}>
                    </Animated.View>
                    <Animated.Image source={require('../img/yesicon.png')} resizeMode='center' style={{ width: 90, left: 10, bottom: 20, height: 90, transform: [{ scale: this.state.scaleValue }] }} />
                </View>

                <Text style={{ color: '#FFFFFF', fontSize: 15 }}>发布成功</Text>
                <Text style={{ color: '#D3D3D3', fontSize: 14, marginTop: 35 }}>分享到</Text>

                <View style={{width:widthSrc,height:150}}></View>
                <TouchableOpacity onPress={() => this._cancel()}>
                    <View style={{ width: 50, height: 50, borderRadius: 50, borderColor: '#FFFFFF', borderWidth: 0.5, marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Animated.Image source={require('../img/cha.png')} resizeMode='center' style={{ width: 15, height: 15, opacity: this.state.bounceValue }}></Animated.Image>
                    </View>
                </TouchableOpacity>
            </View>)
    }
}

const styles = StyleSheet.create({

});
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
    BackAndroid,
    PanResponder,
    Linking,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../utils/ToastUtil';
export default class PicManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isbackIcon: false,
            width: widthSrc,
            height: heightSrc,
        };
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const { navigator } = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为  
        }
        return false;//默认行为  
    };

    // componentWillMount() {
    //     this._panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: () => true,
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderGrant: () => {
    //             this._width = this.state.width
    //             this._height = this.state.height
    //         },
    //         onPanResponderMove: (evt, gs) => {

    //             this.setState({
    //                 width: this._width + gs.dy,
    //                 height: this._height + gs.dx
    //             })
    //         },
    //         onPanResponderRelease: (evt, gs) => {
    //             this.setState({
    //                 width: this.__width + gs.dy,
    //                 height: this._height + gs.dx
    //             })
    //             toastShort(this.state.width + ' ' + this.state.height)
    //         }
    //     })
    // }

    _backFunction() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 22 }}>
                <Text style={styles.overlay} onPress={() => this._backFunction()}></Text>
                <View style={[{ justifyContent: 'center' }]}>
                    <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={widthSrc}
                        imageHeight={heightSrc}>
                        <Image
                            {...this._panResponder.panHandlers}
                            style={[styles.img]} source={require('../img/head.png')} resizeMode='contain'></Image>
                    </ImageZoom>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.9,
        backgroundColor: '#000',
    },
    img: {
        width: widthSrc, height: heightSrc,
        position: 'absolute',
    }
})
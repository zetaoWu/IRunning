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
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StatusBar,
    Platform,
    TextInput,
    Keyboard,
    BackAndroid,
    Animated,
} from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../utils/ToastUtil';
var alertMessage = '你还没有发布动态,确定不发布了吗?';
export default class PostDynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dynamic: '',
            showVoice: false,
            subHeight: new Animated.Value(30),
        }
        this.keyboardHeight = 0
    }

    componentDidMount() {

        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

 componentWillMount() {
        // Keyboard events监听
        Keyboard.addListener('keyboardWillShow',(event) => this._keyboardWillShow(event));
        Keyboard.addListener('keyboardWillHide',() => this._keyboardWillHide());
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        Keyboard.removeAllListeners('keyboardWillShow');
        Keyboard.removeAllListeners('keyboardWillHide');
    }

    _keyboardWillShow = (frames) => {
        this.keyboardHeight = frames.endCoordinates.height;
        Animated.timing(this.state.subHeight, {
            toValue: this.keyboardHeight,
            duration: 300,
        }).start();

        console.log(keyboardHeight + '');

        this.setState({
            showKeyboard: true,
        })
    };

    _keyboardWillHide = () => {
        const {showVoice, showMenu, showFace} = this.state;
        if (showVoice || showMenu || showFace) return

        Animated.timing(this.state.subHeight, {
            toValue: 30,
            duration: 300,
        }).start();

        this.setState({
            showKeyboard: false,
        })
    };

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

    _returnBef() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _back() {
        if (this.state.dynamic !== '') {
            Alert.alert('', alertMessage,
                [
                    { text: '不发了', onPress: () => this._returnBef() },
                    { text: '再看看', onPress: () => console.log('再看看') },
                ]);
        }else{
            this._returnBef();
        }
    }
    _renderSub() {
        return (
            // <View style={{ justifyContent: 'flex-end', height: heightSrc - 60 }}>
            <Text style={{ fontSize: 30 }}>111</Text>
            // </View>);
        );
    }

    _surePost() {
        toastShort('发布');   
        this.props.navigator.push({
            id: 'PostScs',
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FFFFFF', height: heightSrc, marginTop: 20, width: widthSrc }}>
                <View style={styles.top_style}>
                    <TouchableOpacity onPress={() => this._back()}>
                        <Image source={require('../img/cha.png')} resizeMode='center' style={{ width: 15, height: 15 }}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, color: '#FFFFFF' }}>新动态</Text>
                    {
                        this.state.dynamic != '' ?
                            <TouchableOpacity onPress={() => this._surePost()}>
                                <Text style={{ fontSize: 15, color: '#006400' }}>发布</Text>
                            </TouchableOpacity>
                            : <Text style={{ fontSize: 15, color: '#b1b1b1' }}>发布</Text>
                    }
                </View>

                <TextInput style={styles.input}
                    multiline={true}
                    enablesReturnKeyAutomatically={true}
                    autoFocus={true}
                    blurOnSubmit={false}
                    placeholder='分享你的健身心得和经验吧'
                    keyboardType='default'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        this.setState({ dynamic: text })
                    } }

                    value={this.state.dynamic}
                    ></TextInput>

                {this._renderSub()}

            </View >
        );
    }
}

// <Animated.View
//     //subView
//     style={{ height: this.state.subHeight, flex: 1, marginHorizontal: 5 }}
//     >
// {this._renderSub()}
// </Animated.View>

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
        height: heightSrc - 200,
        textAlignVertical: "top",
        flex: 1,
    },
});
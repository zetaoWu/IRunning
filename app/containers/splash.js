import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    AsyncStorage,
    Dimensions,
    Image,
    BackAndroid,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;

import _updateConfig from '../../update.json';
import Storage from 'react-native-storage';
import mainComponent from './main.js';
import regComponent from './reg.js';
import regOrLoginCmp from './regOrLogin.js';



export default class splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        var that = this;

        AsyncStorage.getItem('loginState', function (err, result) {
            if (err) {
                return;
            }
            if (result) {
                that.timer = setTimeout(() => {
                    that._goNextScene(mainComponent, result, 'main');
                }, 3000);
            } else {
                that.timer = setTimeout(() => {
                    that._goNextScene(regOrLoginCmp, null, 'regOrLogin');
                }, 3000);
            }
        });

    }

    _goNextScene(nextRoute, result, id) {
        // this.st.navigator.resetTo(nextRoute);
        this.props.navigator.resetTo({
            title: nextRoute + '',
            id: id + '',
            name: nextRoute + '',
            params: {
                username: result,
            }
        })
    }

    _backFunction() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={{ width: widthSrc, height: heightSrc }}>

                <View style={styles.container}>
                    {/* <Image style={styles.splash_image} source={require('../img/b')}></Image> */}
                    {/* <Text style={styles.splash_text}>Keep</Text> */}
                    <View style={styles.icon_bottom}>
                        <Image style={styles.splash_icon} resizeMode='contain' source={require('../img/ic_launcher.png')}></Image>
                        <Image style={styles.splash_text} resizeMode='contain' source={require('../img/keep5.png')}></Image>
                    </View>
                </View>
            </View>
        );
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const routers = this.props.navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为  
        }
        return false;//默认行为  
    };
}

const styles = StyleSheet.create({
    icon_bottom: {
        flexDirection: 'row',
        marginBottom: 140,
    },
    splash_icon: {
        width: 30,
        height: 30,
    },
    splash_top: {
        fontSize: 37,
        color: '#FFFFFF',
    },
    splash_image: {
        marginBottom: 100
    },
    splash_text: {
        marginTop: 3,
        width: 100,
        height: 30,
    },
    gress: {
        backgroundColor: '#A3D900',
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 200
    },
    doges: {
        position: 'absolute'
    },
    content: {
        backgroundColor: '#4E76A9'
    },
    button: {
        backgroundColor: '#222222',
    },
    buttonText: {
        color: '#555555',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#453d4b',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

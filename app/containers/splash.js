import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    UIManager,
    TouchableOpacity,
    LayoutAnimation,
    Animated,
    AsyncStorage,
    Dimensions,
    Image,
    Easing,
    ToastAndroid,
    BackAndroid,
    StatusBar,
} from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;

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

        // var storage = new Storage({
        //     // 最大容量，默认值1000条数据循环存储
        //     size: 1000,
        //     // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        //     // 如果不指定则数据只会保存在内存中，重启后即丢失
        //     storageBackend: AsyncStorage,
        //     // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        //     defaultExpires: null,
        //     // 读写时在内存中缓存数据。默认启用。
        //     enableCache: true,
        //     // 如果storage中没有相应数据，或数据已过期，
        //     // 则会调用相应的sync方法，无缝返回最新数据。
        //     // sync方法的具体说明会在后文提到
        //     // 你可以在构造函数这里就写好sync的方法
        //     // 或是写到另一个文件里，这里require引入
        //     // 或是在任何时候，直接对storage.sync进行赋值修改
        //     // sync: require('./sync')
        // });

        // // 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
        // global.storage = storage;
        var that = this;

        AsyncStorage.getItem('loginState', function (err, result) {
            if (err) {
                // ToastAndroid.show(err + '----err-------', 3);
                return;
            }
            // ToastAndroid.show(result + '-----result------', 3);

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
        // storage.load({
        //     key: 'loginState',
        // }).then(ret => {
        //     console.log(ret + '');
        // }).catch(err => {
        //     //如果没有找到数据并且没有sync方法
        //     console.warn(err.message);
        // });
    }


    //   //如果找到数据  则在then中返回 异步
    //         if (ret.username && ret.password) {
    //             this.timer = setTimeout(() => {
    //                 this._goNextScene({ component: mainComponent });
    //             }, 3000);
    //         } else {
    //             this.timer = setTimeout(() => {
    //                 this._goNextScene({ component: regComponent });
    //             }, 3000);
    //         }
    _goNextScene(nextRoute, result, id) {
        // this.st.navigator.resetTo(nextRoute);
        if (this.props.navigator) {
            this.props.navigator.push({
                title: nextRoute + '',
                id: id + '',
                name: nextRoute + '',
                params: {
                    username: result,
                }
            })
        }
    }

    _backFunction() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }


    render() {
        return (
            <View style={{ width: widthSrc, height: heightSrc }}>

                <View style={styles.container}>
                    {/* <Image style={styles.splash_image} source={require('image!b')}></Image> */}
                    {/* <Text style={styles.splash_text}>Keep</Text> */}
                    <View style={styles.icon_bottom}>
                        <Image style={styles.splash_icon} resizeMode='contain' source={require('image!ic_launcher')}></Image>
                        <Image style={styles.splash_text} resizeMode='contain' source={require('image!keep5')}></Image>
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
        const { navigator } = this.props;
        const routers = navigator.getCurrentRoutes();
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

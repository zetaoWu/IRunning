import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    UIManager,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
    Easing,
    BackAndroid,
    TextInput,
    StatusBar,
} from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import Swiper from 'react-native-swiper';
import reg from './reg';
import login from './login';
export default class regOrLogin extends Component {
    constructor(props) {
        super(props);
    }

    _onBackFunction() {
        console.log(this);
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
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
        var firstClick = 0;
        var timestamp = (new Date()).valueOf();
        if (timestamp - firstClick > 2000) {
            firstClick = timestamp;
            BackAndroid.exitApp()
            return true;
        } else {
            return false;
        }
    };


    _onStartReg() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'reg',
                id:'reg',
            });
        }
    }

    _onStartLogin() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'login',
                id:'login',
            });
        }
    }

    render() {
        let self = this;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={true}
                    hidden={true}
                    animated={true}
                    />
                <Swiper style={styles.wrapper}
                    dot={<View style={{ backgroundColor: '#FFFFFF', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 75 }} />}
                    activeDot={<View style={{ backgroundColor: '#3352FF', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 75 }} />}>

                    <View style={styles.slide1}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../img/1.jpg')} />
                    </View>
                    <View style={styles.slide2}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../img/2.jpg')} />
                    </View>
                    <View style={styles.slide3}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../img/3.jpg')} />
                    </View>
                    <View style={styles.slide3}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../img/4.jpg')} />
                    </View>
                </Swiper>

                <View style={[styles.container, { zIndex: 2 }]}>
                    <View flexDirection='row' style={{paddingBottom:25}}>
                        <TouchableOpacity onPress={() => self._onStartReg()}>
                            <View style={[styles.button, { borderRadius: 2, borderColor: '#FFFFFF', borderWidth: 0.8 }]} >
                                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>注册</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => self._onStartLogin()}>
                            <View style={[styles.button, { marginLeft: 20, borderRadius: 2, borderColor: '#FFFFFF', borderWidth: 0.8 }]} >
                                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    image: {
        width: widthSrc,
        height: heightSrc,
        flex: 1
    },
    button: {
        height: 50,
        width: widthSrc / 2.0 - 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: 0.2,
        width: Dimensions.get('window').width,
        backgroundColor: '#999999',
    },
    reg: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
    },
    icon_left: {
        marginLeft: 10,
        width: 25,
        height: 25,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 20
    },
    main_top: {
        paddingLeft: -5,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50,
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
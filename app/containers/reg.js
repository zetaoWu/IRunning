import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    Image,
    BackAndroid,
    TouchableWithoutFeedback,
    TextInput,
    TouchableHighlight,
    StatusBar,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
import { toastShort } from '../utils/ToastUtil';
import { GET_CHECK_NUM, BASE_SQL } from '../url';
import { config } from '../config';
import regCheckNum from './regCheckNum';
export default class reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isDeepGreen: '',
            isReged: 0,
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
        const routers = this.props.navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            this.props.navigator.pop();
            return true;//接管默认行为  
        }
        return false;//默认行为  
    };

    _onBackFunction() {
        this.props.navigator.pop();
    }

    _onPressButton() {
        let inputnum = this.state.text;
        
        if (inputnum.length !== 11) {
            toastShort("手机号码输入错误");
            return;
        }

        if (this.state.isReged === 1) {
            toastShort('该号码已被注册');
            return;
        }

        // content: '您的验证码是：' + this._getRandomNum() + ', 有效期是10分钟。',
        //发送验证码
        fetch(GET_CHECK_NUM, {
            method: 'POST',
            headers: {
                'X-Bmob-Application-Id': config.ApplicationID,
                'X-Bmob-REST-API-Key': config.RESTAPIKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'mobilePhoneNumber': this.state.text,
                // template: "CheckNum",
                // content: '您的验证码是' + this._getRandomNum() + '，有效期为10分钟。您正在使用iRunning的验证码。',
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // toastShort('您的验证码是' + this._getRandomNum() + '，有效期为10分钟。您正在使用iRunning的验证码。');
                if (responseJson.smsId) { 
                    toastShort('已发送至您的手机');
                    //正确号码
                    this.setState({ isSendMsg: 1 });
                    this._openRegCheckNum();
                } else {
                    toastShort('发送短信异常' + response.error);
                }
            }).catch((error) => {
                toastShort('Bmob没信息了好尴尬');
            });
        // var code = this._getRandomNum();
        // //Todo 正确号码
        // toastShort(code + '');
        // this.setState({ isSendMsg: 1 });
        // this._openRegCheckNum(code);
    }

    //判断是否被注册
    _regUptoSer(number) {
        fetch(BASE_SQL + 'select * from _User where username="' + number + '"', {
            method: 'GET',
            headers: {
                'X-Bmob-Application-Id': config.ApplicationID,
                'X-Bmob-REST-API-Key': config.RESTAPIKey,
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.results.length > 0) {
                    toastShort(number + '已经被注册');
                    this.setState({
                        isReged: 1,
                    });
                } else if (responseJson.results.length === 0) {
                    this.setState({
                        isReged: 0,
                    });
                    toastShort(number + '暂未注册');
                }
            }).catch((error) => {
                toastShort('网络异常连接异常啦');
            });
    }

    //生成随机数
    _getRandomNum() {
        code = "";
        var codeLength = 4;//验证码的长度  
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);//随机数  
        for (var i = 0; i < codeLength; i++) {//循环操作  
            var index = Math.floor(Math.random() * 10);//取得随机数的索引（0~10）  
            code += random[index];//根据索引取得随机数加到code上  
        }
        return code;
    }

    _openRegCheckNum(code) {
        var tellnum = this.state.text;
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                id: 'regCheckNum',
                params: { num: tellnum, code: code }
            });
        }
    }

    render() {
        return (<View style={styles.container}>
            <StatusBar
                backgroundColor='#453d4b'
                barStyle="default"
                translucent={true}
                hidden={false}
                animated={true}
            />

            <View style={[styles.main_top, { marginTop: 20 }]}>
                <TouchableWithoutFeedback onPress={() => this._onBackFunction()}>
                    <Image style={styles.icon_left} resizeMode='contain' source={require('../img/back_icon.png')}></Image>
                </TouchableWithoutFeedback>
                <Text style={styles.reg}>注册</Text>
                <View style={styles.icon_left}></View>
            </View>
            <View style={styles.line}></View>

            <View style={styles.num}>
                <Image style={{ width: 20, height: 20, marginLeft: 5 }} resizeMode='contain' source={require('../img/icon_phone.png')}></Image>
                <Text style={{ color: '#bbbbbb' }}>+86</Text>
                <View style={{ marginTop: 3, marginBottom: 3, backgroundColor: '#bbbbbb', width: 0.5, height: 20, marginLeft: 3 }}></View>
                <TextInput style={{ marginLeft: 5, height: 30, paddingTop: 1, paddingBottom: 1, borderColor: '#453d4b', width: Dimensions.get('window').width - 100, borderWidth: 1, color: '#FFFFFF' }}
                    placeholder='Input phone number'
                    placeholderTextColor='gray'
                    keyboardType='numeric'
                    selectionColor='#FFFFFF'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        if (text.length > 0) {
                            this.setState({ isDeepGreen: '1' });
                        } else {
                            this.setState({ isDeepGreen: '' });
                        };
                        this.setState({ text })

                        if (text.length === 11) {
                            this._regUptoSer(text);
                        }
                    }}
                    value={this.state.text}></TextInput>
            </View>

            <View style={{ marginTop: 30 }}>
                <TouchableHighlight onPress={() => this._onPressButton()}>
                    <View style={this.state.isDeepGreen == '1' ? styles.buttonInputAfter : styles.button}>
                        <Text
                            style={styles.getchecknum}>获取验证码
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View style={{ marginTop: 60, width: Dimensions.get('window').width, alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                    其他方式快速注册
                </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 70, width: Dimensions.get('window').width - 50 }}>
                <Image style={{ width: 40, height: 40 }} source={require('../img/weixinshare.png')} resizeMode='contain'></Image>
                <Image style={{ width: 40, height: 40 }} source={require('../img/qqshare.png')} resizeMode='contain'></Image>
                <Image style={{ width: 40, height: 40 }} source={require('../img/sinashare.png')} resizeMode='contain'></Image>
            </View>

            <View style={{ width: widthSrc - 30, backgroundColor: '#999999', height: 0.3 }}></View>

            <Text style={{ alignItems: 'center', color: '#FFFFFF', fontSize: 11, marginTop: 20 }}>
                注册即代表同意[Keep]服务条款和隐私条款
            </Text>
        </View>);

        //  <View style={{ marginTop: 30 }}>
        //                 <TouchableHighlight onPress={() => this._onPressButton()}>
        //                     <View style={styles.button}>
        //                         <Text
        //                             style={styles.getchecknum}>请输入验证码:
        //                      </Text>
        //                     </View>
        //                 </TouchableHighlight>
        //             </View>
    }
}

const styles = StyleSheet.create({
    getchecknum: {
        color: '#EEEEEE',
        fontSize: 15,
    },
    buttonInputAfter: {
        width: Dimensions.get('window').width - 30,
        height: 50,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#008000',
    },
    button: {
        width: Dimensions.get('window').width - 30,
        height: 50,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E8B57',
    },
    num: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: Dimensions.get('window').width - 30,
        marginTop: 14,
        borderRadius: 3,
        borderColor: '#cccccc',
        borderWidth: 0.5,
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
        fontSize: 16,
    },
    icon_left: {
        width: 23,
        height: 23,
    },
    icon_image: {
        width: 23,
        height: 23,
    },
    top_icon: {
        width: 47,
        height: 45,
    },
    main_top: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50,
    },
    gress: {
        backgroundColor: '#A3D900',
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 200
    },
    content: {
        backgroundColor: '#4E76A9'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
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
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, InteractionManager, TextInput, BackAndroid, ToastAndroid, Platform, TouchableHighlight, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
var TimerMixin = require('react-timer-mixin');
var url = require('../url');
var config = require('../config');
import { toastShort } from '../utils/ToastUtil';
import mainComponent from './main';

export default class regCheckNum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkNum: '',
            password: '',
            deadtime: 10,
        };
        mixins: [TimerMixin]
    }

    componentDidMount() {
        const {navigator} = this.props;
        if (this.props.num) {
            console.log('传递过来的号码是：' + this.props.num);
        };

        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        };

        //在跳转界面完毕后  执行定时器的倒计时
        InteractionManager.runAfterInteractions(() => {
            this._setInvertTime();
        });
    }
    _setInvertTime() {
        this.interval = setInterval(() => { this.setState({ deadtime: (this.state.deadtime - 1) }); }, 1000);
    }

    _reGetCheckNum() {
        this.setState({ deadtime: 59 });
        this.interval = setInterval(() => { this.setState({ deadtime: (this.state.deadtime - 1) }); }, 1000);
        this._reGetNum();
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

    _reGetNum() {
        // content: '您的验证码是：' + this._getRandomNum() + ', 有效期是10分钟。',
        //发送验证码
        fetch(url.GET_CHECK_NUM, {
            method: 'POST',
            headers: {
                'X-Bmob-Application-Id': config.config.ApplicationID,
                'X-Bmob-REST-API-Key': config.config.RESTAPIKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobilePhoneNumber: this.props.num,
                // template: "CheckNum",
                content: '您的验证码是' + this._getRandomNum() + '，有效期为10分钟。您正在使用iRunning的验证码。',
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // ToastAndroid.show('您的验证码是' + this._getRandomNum() + '，有效期为10分钟。您正在使用iRunning的验证码。', 3);
                if (responseJson.smsId) {
                    ToastAndroid.show('已发送至您的手机', 3);
                    //正确号码
                    this.setState({ isSendMsg: 1 });
                    this._openRegCheckNum();
                } else {
                    ToastAndroid.show('异常' + responseJson, 3);
                }
            }).catch((error) => {
                ToastAndroid.show('发送失败,请重试', 3);
            });
    }

    componentWillUnmount() {
        // this.timer && clearTimeout(this.timer);
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

    _onBackFunction() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }
    /**
     * 1.先核对验证码 this.state.checkNum
     * 2.验证码true-> 输入密码  注册成功
     */
    _onNextStep() {
        //先核对验证码
        if (this.state.checkNum === this.props.code) {
            //输入密码：
            if (this.state.password) {
                if (this.state.password.length >= 6) {
                    this._regUptoSer(this.state.password);
                } else {
                    ToastAndroid.show("请输入至少6位密码", 3);
                }
            } else {
                ToastAndroid.show("请输入至少6位密码", 3);
            }
        } else {
            toastShort('请输入正确验证码');
            return;
        }
    }

    _regUptoSer(pwd) {
        //检验验证码
        fetch(url.USER_REG, {
            method: 'POST',
            headers: {
                'X-Bmob-Application-Id': config.config.ApplicationID,
                'X-Bmob-REST-API-Key': config.config.RESTAPIKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.props.num,
                password: pwd,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 202 && parseInt(('' + responseJson.error).indexOf('already')) >= 0) {
                    ToastAndroid.show(this.props.num + '已经被注册', 3);
                } else {
                    ToastAndroid.show('注册成功', 3);
                    this._onJumpMain(this.props.num, pwd);
                }
            }).catch((error) => {
                ToastAndroid.show('网络异常连接异常啦' + error, 3);
            });
    }

    _onJumpMain(username, password) {
        var tellnum = this.state.text;
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'mainComponent',
                component: mainComponent,
                params: {
                    username: username,
                    password: password
                }
            });
        }
    }


    render() {
        {
            console.log('验证码倒计时：' + this.state.deadtime);
            if (this.state.deadtime === 0) {
                this.interval && clearInterval(this.interval);
            }
        }

        let self = this;
        return (<View style={[styles.container, { marginTop: 20 }]}>
            <View style={styles.main_top}>
                <TouchableOpacity onPress={() => self._onBackFunction()} >
                    <Image style={styles.icon_left} resizeMode='contain' source={require('image!back_icon')}></Image>
                </TouchableOpacity>
                <Text style={styles.reg}>注册</Text>
                <View style={styles.icon_left}></View>
            </View>
            <View style={styles.line}></View>

            <View style={{ height: 80, width: widthSrc, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 30 }}>
                <Text style={{ color: '#FFFFFF' }}>验证码已发送至手机号: +86 {this.props.num}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: widthSrc - 30, height: 45 }}>
                <View style={styles.checkborder}>
                    <Image style={{ width: 12, height: 15, marginLeft: 10 }} resizeMode='contain' source={require('image!checknum')}></Image>
                    <TextInput style={{ marginLeft: 7, height: 30, paddingTop: 1, paddingBottom: 1, borderColor: '#453d4b', width: Dimensions.get('window').width - 170, borderWidth: 1, color: '#FFFFFF' }}
                        placeholder='验证码'
                        placeholderTextColor='gray'
                        keyboardType='numeric'
                        selectionColor='#FFFFFF'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            if (text.length > 0) {

                            } else {

                            };
                            this.setState({ checkNum: text })
                        } }
                        value={this.state.checkNum}></TextInput>
                </View>
                {
                    // 计时器===0说明  。需要修改界面，并可以重新发送验证码 
                    this.state.deadtime === 0 ? <View style={{ flex: 1, marginLeft: 15, borderRadius: 3, borderColor: '#2E8B57', borderWidth: 0.8, height: 45, width: 95, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { self._reGetCheckNum() } }>
                            <Text style={{ color: '#2e8857', fontSize: 14 }}>重获验证码</Text>
                        </TouchableOpacity>
                    </View> : <TouchableOpacity onPress={() => { } }><View style={{ flex: 1, marginLeft: 15, borderRadius: 3, borderColor: '#2E8B57', borderWidth: 0.8, height: 45, width: 95, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#2e8857', fontSize: 14 }}>重获验证码</Text>
                        <Text style={{ color: '#2e8857', fontSize: 14 }}>{this.state.deadtime}</Text>
                    </View>
                        </TouchableOpacity>
                }
            </View>

            <View style={styles.num}>
                <Image style={{ width: 15, height: 18, marginLeft: 10 }} resizeMode='contain' source={require('image!icon_pwd')}></Image>
                <TextInput style={{ marginLeft: 5, height: 30, paddingTop: 1, paddingBottom: 1, borderColor: '#453d4b', width: Dimensions.get('window').width - 100, borderWidth: 1, color: '#FFFFFF' }}
                    placeholder='设置登录密码,至少六位'
                    placeholderTextColor='gray'
                    keyboardType='numeric'
                    selectionColor='#FFFFFF'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        if (text.length > 0) {

                        } else {

                        };
                        this.setState({ password: text })
                    } }
                    value={this.state.password}></TextInput>
            </View>

            <View style={{ marginTop: 30 }}>
                <TouchableHighlight onPress={() => self._onNextStep()}>
                    <View style={styles.button}>
                        <Text
                            style={styles.nextstep}>下一步
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    nextstep: {
        color: '#EEEEEE',
        fontSize: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#453d4b',
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
    icon_left: {
        width: 23,
        height: 23,
    },
    button: {
        width: Dimensions.get('window').width - 30,
        height: 50,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E8B57',
    },
    reg: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 16,
    },
    line: {
        height: 0.2,
        width: Dimensions.get('window').width,
        backgroundColor: '#999999',
    },
    num: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        width: Dimensions.get('window').width - 30,
        marginTop: 14,
        borderRadius: 3,
        borderColor: '#cccccc',
        borderWidth: 0.5,
    },
    checkborder: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        width: Dimensions.get('window').width - 140,
        borderRadius: 3,
        borderColor: '#cccccc',
        borderWidth: 0.5,
    }
});
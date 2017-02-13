import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    TouchableHighlight,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
var url = require('../url');
var config = require('../config');
import { toastShort } from '../utils/ToastUtil';
import main from './main';
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAccount: '',
            isPwd: '',
            animating:false,
        };
    }

    _onLoginButton() {
        if (this.state.username.length === 11) {
            if (this.state.password.length < 6) {
                toastShort('密码格式不正确');
            } else {
                // this._showOrHide();
                this._reqServerLogin();
            }
        } else {
            toastShort('请输入正确账号');
        }
    }

    // 按钮响应方法，切换显示与隐藏
    _showOrHide() {
        if (this.state.animating) {
            this.setState({
                animating: false
            });
        } else {
            this.setState({
                 animating: true
            });
        }
    }

    _reqServerLogin() {
        fetch(url.LOGIN + 'username=' + this.state.username + '&password=' + this.state.password, {
            method: 'GET',
            headers: {
                'X-Bmob-Application-Id': config.config.ApplicationID,
                'X-Bmob-REST-API-Key': config.config.RESTAPIKey,
            },
        }).then((response) => response.json())
            .then((responseJSON) => {
                // this._showOrHide();

                if (responseJSON.error) {
                    toastShort('账号密码不正确');
                } else {
                    toastShort('账号密码正确 登录中');
                    this.props.navigator.push({
                            name: 'main',
                            id: 'main',
                            params: {
                                username: this.state.username,
                            }
                        });
                }
            });
    }

    _onBackFunction() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render() {
        let self = this;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#453d4b'
                    barStyle="default"
                    translucent={true}
                    hidden={false}
                    animated={true}
                    />

                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, {height: 80}]}
                    size="large" />

                <View style={[styles.main_top, { marginTop: 20 }]}>
                    <TouchableWithoutFeedback onPress={() => this._onBackFunction()}>
                        <Image style={styles.icon_left} resizeMode='contain' source={require('../img/back_icon.png')}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.reg}>登录</Text>
                    <View style={styles.icon_image}></View>
                </View>
                <View style={styles.line}></View>

                <View style={styles.num}>
                    <Image style={{ width: 20, height: 20, marginLeft: 5 }} resizeMode='contain' source={require('../img/icon_phone.png')}></Image>
                    <Text style={{ color: '#bbbbbb' }}>+86</Text>
                    <View style={{ marginTop: 3, marginBottom: 3, backgroundColor: '#bbbbbb', width: 0.5, height: 20, marginLeft: 3 }}></View>
                    <TextInput style={{ marginLeft: 5, height: 30, paddingTop: 1, paddingBottom: 1, borderColor: '#453d4b', width: Dimensions.get('window').width - 100, borderWidth: 1, color: '#FFFFFF' }}
                        placeholder=''
                        placeholderTextColor='gray'
                        keyboardType='numeric'
                        selectionColor='#FFFFFF'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            if (text.length > 0) {
                                this.state.isAccount = '1';
                            } else {
                                this.state.isAccount = '';
                            }
                            this.setState({ username: text })
                        } }
                        value={this.state.username}></TextInput>
                </View>

                <View style={styles.num}>
                    <Image style={{ width: 20, height: 20, marginLeft: 5 }} resizeMode='contain' source={require('../img/icon_pwd.png')}></Image>
                    <View style={{ marginTop: 3, marginBottom: 3, backgroundColor: '#bbbbbb', width: 0.5, height: 20, marginLeft: 3 }}></View>
                    <TextInput style={{ marginLeft: 5, height: 30, paddingTop: 1, paddingBottom: 1, borderColor: '#453d4b', width: Dimensions.get('window').width - 100, borderWidth: 1, color: '#FFFFFF' }}
                        placeholder='密码'
                        placeholderTextColor='gray'
                        keyboardType='numeric'
                        selectionColor='#FFFFFF'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            if (text.length > 0) {
                                this.state.isPwd = '1';
                            } else {
                                this.state.isPwd = '';
                            }
                            this.setState({ password: text })
                        } }
                        value={this.state.password}></TextInput>
                </View>

                <View style={{ marginTop: 30 }}>
                    <TouchableHighlight onPress={() => this._onLoginButton()}>
                        <View style={(this.state.isAccount == '1' && this.state.isPwd) ? styles.buttonInputAfter : styles.button}>
                            <Text
                                style={styles.getchecknum}>登录
                             </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={{ marginTop: 60, width: Dimensions.get('window').width, alignItems: 'center' }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                        其他方式快速登录
                </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 70, width: Dimensions.get('window').width - 50 }}>
                    <Image style={{ width: 40, height: 40 }} source={require('../img/weixinshare.png')} resizeMode='contain'></Image>
                    <Image style={{ width: 40, height: 40 }} source={require('../img/qqshare.png')} resizeMode='contain'></Image>
                    <Image style={{ width: 40, height: 40 }} source={require('../img/sinashare.png')} resizeMode='contain'></Image>
                </View>
            </View>)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#453d4b',
    },
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
    centering: {
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        zIndex:2,
    },
    reg: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 16,
    },
    icon_left: {
        width: 24,
        height: 24,
    },
    icon_image: {
        width: 24,
        height: 24,
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
});
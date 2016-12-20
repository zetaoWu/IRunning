import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    UIManager,
    LayoutAnimation,
    Animated,
    Dimensions,
    Image,
    Easing,
    BackAndroid,
    Alert,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../utils/ToastUtil';

export default class AppSet extends Component {
    constructor(props) {
        super(props);
    }

    _backFunction() {
        this.props.navigator.pop();
    }

    componentWillMount() {
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                { text: '是', onPress: () => { throw new Error('模拟启动失败,请重启应用') } },
                { text: '否', onPress: () => { markSuccess() } },
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }
    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                { text: '是', onPress: () => { switchVersion(hash); } },
                { text: '否', },
                { text: '下次启动时', onPress: () => { switchVersionLater(hash); } },
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本-'+appKey, [
                    { text: '确定', onPress: () => { info.downloadUrl && Linking.openURL(info.downloadUrl) } },
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
                    { text: '是', onPress: () => { this.doUpdate(info) } },
                    { text: '否', },
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
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
        console.log(this.state.modalVisible + '----');
        if (this.state.modalVisible) {
            this.setState({ modalVisible: false });
            return true;//接管默认行为
        }
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为  
        }
        return false;//默认行为  
    };

    render() {
        return (
            <View style={{ flex: 1, marginTop: 22, backgroundColor: '#FFFFFF' }}>
                <View style={styles.top_style}>
                    <TouchableOpacity onPress={() => this._backFunction()}>
                        <Image style={{ width: 20, height: 20 }} source={require('../img/backicon.png')} resizeMode='cover'></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, color: '#FFFFFF' }}>设置</Text>
                    <View></View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        欢迎使用热更新服务
        </Text>
                    <Text style={styles.instructions}>
                        这是版本二 {'\n'}
                        当前包版本号: {packageVersion}{'\n'}
                        当前版本Hash: {currentVersion || '(空)'}{'\n'}
                    </Text>
                    <TouchableOpacity onPress={this.checkUpdate}>
                        <Text style={styles.instructions}>
                            点击这里检查更新
          </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    top_style: {
        paddingLeft: 10,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
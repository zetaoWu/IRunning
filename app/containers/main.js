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
    Dimensions,
    Image,
    Easing,
    BackAndroid,
    AsyncStorage,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StatusBar,
} from 'react-native';


var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../utils/ToastUtil';
import HomePage from './page/homePage';
import FindPage from './page/findPage';
import ActionPage from './page/actionPage';
import MePage from './page/mePage';
import NavbarComp from './Comments/NavBar.js';

import TabNavigator from 'react-native-tab-navigator';

export default class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        var rawData = {
            username: this.props.username,
            password: this.props.password,
        }
        if (this.props.username) {
            //暂时隐藏
            AsyncStorage.setItem(
                'loginState',
                this.props.username, function (err) {
                    if (err) {
                        toastShort("存储错误" + err);
                        console.log('存储错误');
                    }
                    if (!err) {
                        toastShort("存储成功");
                    }
                }
            );
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

    render() {
        var that = this;
        var num = this.props.username;

        return (
            <View style={{ width: widthSrc, height: heightSrc, backgroundColor: '#FFFFFF' }}>
                <StatusBar
                    backgroundColor='#453d4b'
                    barStyle="default"
                    translucent={true}
                    hidden={false}
                    animated={true}
                    />

                <TabNavigator style={{ marginTop: 20 }}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="训练"
                        titleStyle={styles.textStyle}
                        selectedTitleStyle={styles.selectedTextStyle}
                        renderIcon={() => <Image style={{ width: 25, height: 25 }} source={require('../img/sharkoff.png')} />}
                        renderSelectedIcon={() => <Image style={{ width: 25, height: 25 }} source={require('../img/sharkon.png')} />}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <HomePage navigator={that.props.navigator} username={num} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'find'}
                        title="发现"
                        titleStyle={styles.textStyle}
                        selectedTitleStyle={styles.selectedTextStyle}
                        renderIcon={() => <Image style={{ width: 25, height: 25 }} source={require('../img/findoff.png')} />}
                        renderSelectedIcon={() => <Image style={{ width: 25, height: 25 }} source={require('../img/findon.png')} />}
                        onPress={() => this.setState({ selectedTab: 'find' })}>
                        <FindPage navigator={this.props.navigator} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'action'}
                        title="动态"
                        titleStyle={styles.textStyle}
                        selectedTitleStyle={styles.selectedTextStyle}
                        renderIcon={() => <Image style={{ width: 25, height: 25 }} source={require('../img/dongtaioff.png')} />}
                        renderSelectedIcon={() => <Image style={{ width: 25, height: 25 }} source={require('../img/dongtaion.png')} />}
                        onPress={() => this.setState({ selectedTab: 'action' })}>
                        <ActionPage navigator={this.props.navigator} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'me'}
                        title="我"
                        titleStyle={styles.textStyle}
                        selectedTitleStyle={styles.selectedTextStyle}
                        renderIcon={() => <Image style={{ width: 25, height: 25 }} source={require('../img/meoff.png')} />}
                        renderSelectedIcon={() => <Image style={{ width: 25, height: 25 }} source={require('../img/meon.png')} />}
                        onPress={() => this.setState({ selectedTab: 'me' })}>
                        <MePage navigator={this.props.navigator} />
                    </TabNavigator.Item>
                </TabNavigator >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        height: 82,
        alignItems: 'flex-start',
        backgroundColor: '#FF2133',
    },
    icon_left: {
        width: 17,
        height: 20,
    },
    icon_image: {
        width: 20,
        height: 20,
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
    textStyle: {
        color: '#999',
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
        backgroundColor: '#FFFFFF',
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
    selectedTextStyle: {
        color: 'black',
    }
});

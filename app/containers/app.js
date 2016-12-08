import React from 'react';
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
    Navigator,
    StatusBar,
} from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import PostScsView from './PostScs.js';
import MainView from './main.js';
import SplashView from './splash.js';
import TrainHisView from './trainHis.js';
import UserInfoView from './UserInfo';
import PostDynamicView from './PostDynamic';
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({ content: '定时器' });
        }, 3000);
    }

    render() {
        var splashName = 'splash';
        
        return (
            <View style={{ width: widthSrc, height: heightSrc }}>
                <StatusBar
                    backgroundColor='#453d4b'
                    barStyle="default"
                    translucent={true}
                    hidden={false}
                    animated={false}
                    />
                <Navigator
                    initialRoute={{ name: splashName, index: 0, id: splashName }}
                    configureScene={this._configureScene}
                    renderScene={this._renderScene}
                    />
            </View>
        );
    }

    _renderScene(route, navigator) {
        <StatusBar hidden={route.statusBarHidden} />
        switch (route.id) {
            case 'splash':
                return (
                    <SplashView  {...route.params} navigator={navigator} route={route} />
                )
            case 'main':
                return (
                    <MainView {...route.params} navigator={navigator} route={route} />
                )
            case 'trainHis':
                return (
                    <TrainHisView {...route.params} navigator={navigator} route={route} />
                )
            case 'UserInfo':
                return (
                    <UserInfoView {...route.params}  navigator={navigator} route={route} />
                )
            case 'PostDynamic':
                return (
                    <PostDynamicView  {...route.params} navigator={navigator} route={route} />
                )
            case 'PostScs':
                return (
                    <PostScsView {...route.params} navigator={navigator} route={route} />
                )
            case 'tweetDetails':
                return (
                    <TweetDetailsView {...route.params} navigator={navigator} route={route} />
                )
            case 'comment':
                return (
                    <CommentView navigator={navigator} route={route} />
                )
            case 'photoBrowser':
                return (
                    <PhotoBrowserView {...route.params} navigator={navigator} />
                )
            default:
                break
        }
    }

    _configureScene(route, routeStack) {
        switch (route.id) {
            case 'tweet':
            case 'webview':
            case 'PostScs':
                return Navigator.SceneConfigs.FloatFromBottom
            default:
                return Navigator.SceneConfigs.FloatFromRight
        }
    }
}

const styles = StyleSheet.create({
    splash_text: {
        marginBottom: 140,
        fontSize: 37,
        color: '#FFFFFF',
        fontWeight: 'bold'
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
        backgroundColor: '#808080',
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

export default App;
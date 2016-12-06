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

import splashComponent from './splash.js';

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
        var splashName = 'splashName';
        var defaultComponent = splashComponent;
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
                    initialRoute={{ name: splashName, component: defaultComponent, statusBarHidden: true }}
                    configureScene={(route) => {
                        //转换动画
                        return Navigator.SceneConfigs.PushFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        <StatusBar hidden={route.statusBarHidden} />

                        let Component = route.component;
                        if (route.component) {
                            return <Component {...route.params} navigator={navigator} />
                        }
                    } }
                    />
            </View>
        );
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
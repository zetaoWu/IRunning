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
    ToastAndroid,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StatusBar,
    PanResponder,
    WebView,
    ScrollView,
} from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../../utils/ToastUtil';
var _scrollView;
export default class findPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://xiaowublog.sxl.cn/',
            top: 0,
            enableScroll: true,
            oldtop:0,
        }
    }
    render() {
        return (
            <View style={styles.container}
                >
                <ScrollView
                    ref={(scrollview) => _scrollview = scrollview}
                    style={styles.container}
                    scrollEnabled={this.state.enableScroll}
                    >
                    <View
                        style={[styles.top]}
                        >
                        <Text style={{ color: '#FFFFFF', fontSize: 16 }} onPress={() => this.__scrollView()}>博客</Text>
                    </View>
                    <View
                        >
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                        <Text style={{ fontSize: 50 }}>wwwwwww</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    webView: {
        width: widthSrc,
        height: heightSrc,
    },
    container: {
        flex: 1,
    },
    top: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50,
    }
});
import React, { Component } from 'react';

import {
    StyleSheet,
    WebView,
    View,
    Text,
    Dimensions,
} from 'react-native';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
        }
    }

    render() {
        return (
            <View>
                <View style={styles.top}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16 }}>博客</Text>
                </View>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    mediaPlaybackRequiresUserAction={true}
                    source={{ uri: this.state.url }}
                    javaScriptEnabled={true}
                    ></WebView>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    webView: {
        width: widthSrc,
        height: heightSrc,
    },
    top: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#453d4b',
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 50,
    }
});
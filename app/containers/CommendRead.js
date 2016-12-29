import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, BackAndroid, Text, Image, Dimensions, WebView } from 'react-native'

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
export default class CommendRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.data.articleUrl,
        }
    }
    _backFunction() {
        const {navigator} = this.props;
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
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', marginTop: 22 }}>
                <View style={[styles.main_top]}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this._backFunction()}>
                            <Image style={{ width: 23, height: 23 }} source={require('../img/backicon.png')} resizeMode='cover'></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, color: '#FFFFFF', marginLeft: 10 }}>{this.props.data.title}</Text>
                    </View>
                    <View></View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 23, height: 23 }} source={require('../img/share1.png')} resizeMode='cover'>
                        </Image>
                        <Image style={{ width: 23, height: 23, marginLeft: 10, marginRight: 7 }} source={require('../img/more.png')} resizeMode='cover'></Image>
                    </View>
                </View>

                <WebView
                    style={styles.webView}
                    source={{ uri: this.state.url }}
                    >
                </WebView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    main_top: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50
    },
    webView: {
        width: widthSrc,
        height: heightSrc,
    },
});
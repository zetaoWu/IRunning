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
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
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
});
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    Image,
    BackAndroid,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
import RunSetComponent from './runSet.js'
export default class run extends Component {
    constructor(props) {
        super(props);
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
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为  
        }
        return false;//默认行为  
    };

    _setFunction() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                id:'runSetComponent',
            });
        }
    }

    _backFunction() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _clickFunc(ops){
        switch(ops){
            case 'mapview':
                this.props.navigator.push({
                    id:'mapview'
                });
            break;
        }
    }
    render() {

        var _this=this;
        return (
            <View style={styles.container}>

                <StatusBar
                    backgroundColor='#453d4b'
                    barStyle="default"
                    translucent={true}
                    hidden={false}
                    animated={true}
                    />

                <View style={[styles.top_bar,{marginTop:20}]}>
                    <TouchableWithoutFeedback onPress={this._backFunction.bind(this)}>
                        <Image style={styles.icon_left} resizeMode='contain' source={require('../img/back_icon.png')}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.top_title}>户外跑步</Text>
                    <TouchableWithoutFeedback onPress={this._setFunction.bind(this)}>
                        <Image style={styles.icon_right} resizeMode='contain' source={require('../img/more_icon.png')}></Image>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.backlocation}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 40 }}>
                    <Text style={{ fontSize: 100, color: "#FFFFFF", }}>0.00</Text>
                    <Text style={{ fontSize: 17, color: "#FFFFFF", marginBottom: 23 }}>公里</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginLeft:25,marginRight:25,marginTop: 20,width:widthSrc-50, alignItems: 'center'}}>
                    <Text style={{ color: '#FFFFFF' }}>GPS</Text>
                    <View style={{ backgroundColor: '#FFFFFF', marginLeft: 10, height: 0.25, width: Dimensions.get('window').width - 140 }}></View>
                    <TouchableWithoutFeedback onPress={()=>this._clickFunc('mapview')}>
                        <Image style={[styles.icon_right]} resizeMode='contain' source={require('../img/local.png')}></Image>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, marginTop: 40 }}>
                    <Image source={require('../img/back_icon.png')}></Image>
                    <Image source={require('../img/back_icon.png')}></Image>
                    <Image source={require('../img/back_icon.png')}></Image>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 35, paddingRight: 35, marginTop: 20 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 20 }} >- -</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 20 }} >00:00:00</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 20 }}>0</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 35, paddingRight: 35, marginTop: 10 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 10 }} >分钟</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 10 }} >用时</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 10 }} >千卡</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backlocation: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#123532'
    },
    icon_right: {
        width: 23,
        height: 23,
    },
    icon_left: {
        width: 23,
        height: 23,
    },
    top_title: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    top_bar: {
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: Dimensions.get('window').width,
        backgroundColor: '#453d4b',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: '#453d4b',
    },
});

import React, {Component}from 'react';
import {
    View,
    Dimensions,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    BackAndroid,
    Platform,
    Text,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import {DATA} from '../config.js';

export default class RecomTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollOffset: 0,
        };
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
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为
    };

    _backFunction() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _setNavOpacity() {
        var opacity;
        var maxDistance = 100;
        if (this.state.scrollOffset <= 0) {
            opacity = 0;
        } else if (this.state.scrollOffset <= maxDistance) {
            opacity = this.state.scrollOffset / maxDistance * 1;
        } else {
            opacity = 1;
        }
        return opacity;
    }

    render() {
        var opacity = this._setNavOpacity();
        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <StatusBar
                    translucent={true}
                    hidden={true}
                    animated={true}
                />

                <ScrollView
                    onScroll={(event)=> {
                        this.setState({scrollOffset: event.nativeEvent.contentOffset.y});
                    }}
                    scrollEventThrottle={15}>

                    <Image style={{width: widthSrc, height: heightSrc / 2 - 20}} resizeMode='stretch'
                           source={{uri: this.props.data.platImg}}>
                        <View style={[styles.imageback, {width: widthSrc, alignItems: 'center'}]}>
                            <Text style={{
                                fontSize: 30,
                                color: '#FFFFFF',
                                marginTop: 80
                            }}>{this.props.data.name}</Text>
                        </View>

                        <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>
                            <View></View>
                            <View style={styles.imageback}>
                                <Text style={{fontSize: 12, color: '#FFFFFF'}}>训练说明</Text>
                            </View>
                            <View style={styles.imageback}>
                                <Text style={{fontSize: 12, color: '#FFFFFF', marginLeft: 15}}>音乐设置</Text>
                            </View>
                        </View>

                        <View style={{position: 'absolute', width: widthSrc, bottom: 15}}>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                justifyContent: 'space-between',
                                marginLeft: 10,
                                marginRight: 10,
                            }}>
                                <Text style={{fontSize: 11, color: '#FFFFFF'}}>训练</Text>
                                <Text style={{fontSize: 11, color: '#FFFFFF'}}>平均</Text>
                                <Text style={{fontSize: 11, color: '#FFFFFF'}}>难度</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                justifyContent: 'space-between',
                                marginLeft: 10,
                                marginRight: 10,
                                bottom:10,
                            }}>
                                <Text style={{fontSize: 12, color: '#FFFFFF'}}>10节</Text>
                                <Text style={{fontSize: 12, color: '#FFFFFF'}}>23分钟</Text>
                                <Text style={{fontSize: 12, color: '#FFFFFF'}}> K1</Text>
                            </View>

                            <View style={styles.button}>
                                <Text
                                    style={styles.getchecknum}> 加入训练
                                </Text>
                            </View>

                        </View>
                    </Image>


                    <Text style={{fontSize: 30, height: 200}}>数据数据</Text>
                    <Text style={{fontSize: 30, height: 200}}>数据数据</Text>
                    <Text style={{fontSize: 30, height: 200}}>数据数据</Text>
                </ScrollView>

                <View style={[styles.main_top, {
                    position: 'absolute',
                    "backgroundColor": 'rgba(69,61,75,' + opacity + ')'
                }]}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this._backFunction()}>
                            <Image style={{width: 23, height: 23}} source={require('../img/backicon.png')}
                                   resizeMode='cover'></Image>
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 18,
                            color: '#FFFFFF',
                            marginLeft: 10
                        }}>{opacity > 0.8 ? this.props.data.name : ''}</Text>
                    </View>
                    <View></View>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{width: 23, height: 23, marginLeft: 15, marginRight: 10}}
                               source={require('../img/share1.png')} resizeMode='cover'></Image>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageback: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    button: {
        width: Dimensions.get('window').width - 30,
        left: 15,
        height: 45,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E8B57',
    },
    getchecknum: {
        color: '#EEEEEE',
        fontSize: 15,
    },
    main_top: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 80,
        top: 0,
        left: 0,
        zIndex: 99,
        paddingTop: 27
    }
});
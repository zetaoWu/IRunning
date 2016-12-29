import React, { Component } from 'react';
import {
    StyleSheet, Text, Image, View, TouchableOpacity, Animated, Easing,BackAndroid,Platform,
} from 'react-native';

var dimensions = require('Dimensions');
var bgHeight = dimensions.get('window').height;   //屏幕width
var bgWidth = dimensions.get('window').width;     //屏幕height
var redWidth = 256.5;                             //红包width
var redHeight = 324.5;                            //红包height
var redCoverLayout = (bgHeight - redHeight) / 2;      //红包盖头距离顶部距离
var redTitleHeight = 100;                         //红包盖头高度
var redOpenButton = 100;                           //开启按钮宽度
var redGap = redTitleHeight * 0.09;                //间隙差
var redTitleTop = redCoverLayout - redGap;        //图片有10像素落差
var redBottomTop = redCoverLayout + redGap;       //图片有10像素落差
var TimerMixin = require('react-timer-mixin');
var topLayout = function () {
    if (bgWidth >= 375) {
        return 157;
    } else {
        return 100;
    }
};

export default class addClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //开启按钮动画属性
            left_openPressValue: new Animated.Value((redWidth - redOpenButton) / 2),
            top_openPressValue: new Animated.Value(redTitleTop + redTitleHeight / 2),
            small_openPressValue: new Animated.Value(1),
            //红包盖头
            red_headTransformValue: new Animated.Value(0),
            //红包盖底
            red_bottomTransformValue: new Animated.Value(0),
            //钱币显隐
            goldHidden: new Animated.Value(0),
            //星星闪现
            starleftHidden: new Animated.Value(0),
            starrightHidden: new Animated.Value(0),
        };
        mixins: [TimerMixin];
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


    _ChangeToShake() {
        //动画顺序执行
        Animated.sequence([
            //开启按钮左右晃动动画顺序执行
            Animated.sequence([
                Animated.timing(this.state.left_openPressValue, { toValue: (redWidth - redOpenButton) / 3, duration: 50, }),
                Animated.timing(this.state.left_openPressValue, { toValue: (redWidth - redOpenButton) * 3 / 4, duration: 100, }),
                Animated.timing(this.state.left_openPressValue, { toValue: (redWidth - redOpenButton) / 2, duration: 100, }),
            ]),
            //开启按钮下落变小动画同时执行
            Animated.parallel([
                Animated.timing(this.state.top_openPressValue, { toValue: (redTitleTop + redTitleHeight / 2) * 1.5, duration: 500 }),
                Animated.timing(this.state.small_openPressValue, { toValue: 0.7, duration: 500 }),
            ]),
            //翻开红包
            Animated.parallel([
                Animated.timing(this.state.red_headTransformValue, { toValue: 1, duration: 300 }),
            ]),
            Animated.parallel([
                Animated.timing(this.state.red_bottomTransformValue, { toValue: 1, duration: 300 }),
            ]),
            //钱币显示
            Animated.delay(500),
            Animated.timing(this.state.goldHidden, { toValue: 1, duration: 500 }),
            //星星显示
            Animated.parallel([
                Animated.timing(this.state.starleftHidden, { toValue: 1, duration: 1 }),
                Animated.timing(this.state.starrightHidden, { toValue: 1, duration: 1 }),
            ]),
        ]).start();

        setInterval(() => this._starShowAnimation(), 2100);
    }
    _timerStarAnimation() {
        this.setTimeout(() => this._starShowAnimation(), 1);
    }
    _starShowAnimation() {
        //星星闪现
        Animated.sequence([
            Animated.sequence([
                Animated.timing(this.state.starleftHidden, { toValue: 0, duration: 500 }),
                Animated.timing(this.state.starleftHidden, { toValue: 1, duration: 500 }),
            ]),
            Animated.delay(900),
            Animated.sequence([
                Animated.timing(this.state.starrightHidden, { toValue: 0, duration: 500 }),
                Animated.timing(this.state.starrightHidden, { toValue: 1, duration: 500 }),
            ]),
        ]).start();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={layouts.bgViewLayout}>
                    <View style={layouts.blackViewLayout} />
                    <View style={layouts.bgRedCoverViewLayout}>
                        <View style={[layouts.bgLayerLayout, { zIndex: 2 }]}>
                            {/*{'底'}*/}
                            <Image style={layouts.bgRedCoverLayout} source={require('image!icon_redbagopen')} />
                        </View>
                        <View style={[layouts.bgLayerLayout, { zIndex: 2, flexDirection: 'row' }]}>
                            {/*{'钱币插在两个底之间'}*/}
                            <Animated.Image style={[layouts.gold01Layout, { opacity: this.state.goldHidden }]} source={require('image!icon_gold01')} />
                            <Animated.Image style={[layouts.gold02Layout, { opacity: this.state.goldHidden }]} source={require('image!icon_gold02')} />
                            <Animated.Image style={[layouts.gold03Layout, { opacity: this.state.goldHidden }]} source={require('image!icon_gold03')} />
                            <Animated.Image style={[layouts.gold04Layout, { opacity: this.state.goldHidden }]} source={require('image!icon_gold04')} />
                            <Animated.Image style={[layouts.gold05Layout, { opacity: this.state.goldHidden }]} source={require('image!icon_gold05')} />
                            <Animated.Image style={[layouts.gold06Layout, { opacity: this.state.goldHidden }]} source={require('image!icon_gold06')} />
                            <Animated.Image style={[layouts.gold07Layout, { opacity: this.state.goldHidden }]} source={require('image!icon_gold07')} />
                        </View>
                        <View style={[layouts.bgLayerLayout, { zIndex: 2 }]}>
                            {/*{'底2'}*/}
                            <Image style={layouts.bgRedCoverLayout2} source={require('image!icon_redbaghalf')} />
                        </View>
                        <View style={[layouts.bgLayerLayout, { zIndex: 2 }]}>
                            <Animated.Image
                                //红包头
                                source={require('image!icon_redbagtitle')}
                                style={[layouts.bgRedTitleLayout,
                                {
                                    transform: [
                                        { translateY: -(redTitleHeight / 2 + 2 * redGap) },
                                        {
                                            rotateX: this.state.red_headTransformValue.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '90deg']
                                            })
                                        },
                                        { translateY: redTitleHeight / 2 - 2 * redGap },
                                    ]
                                }]}
                                resizeMode={'stretch'} />
                        </View>
                        <View style={[layouts.bgLayerLayout, { zIndex: 1 }]}>
                            <Animated.Image
                                //红包头底
                                source={require('image!icon_redbaghead')}
                                style={[layouts.bgRedTitleBottomLayout,
                                {
                                    transform: [
                                        { translateY: redTitleHeight / 2 },
                                        {
                                            rotateX: this.state.red_bottomTransformValue.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['270deg', '360deg']
                                            })
                                        },
                                        { translateY: -redTitleHeight / 2 },
                                    ]
                                }]}
                                resizeMode={'stretch'} />
                        </View>
                        <View style={[layouts.bgLayerLayout, { zIndex: 1, flexDirection: 'row' }]}>
                            {/*{'星星'}*/}
                            <Animated.Image source={require('image!icon_xing01')} style={[layouts.star01Layout, { opacity: this.state.starleftHidden }]} />
                            <Animated.Image source={require('image!icon_xing02')} style={[layouts.star02Layout, { opacity: this.state.starrightHidden }]} />
                            <Animated.Image source={require('image!icon_xing03')} style={[layouts.star03Layout, { opacity: this.state.starleftHidden }]} />
                            <Animated.Image source={require('image!icon_xing04')} style={[layouts.star04Layout, { opacity: this.state.starrightHidden }]} />
                            <Animated.Image source={require('image!icon_xing05')} style={[layouts.star05Layout, { opacity: this.state.starleftHidden }]} />
                            <Animated.Image source={require('image!icon_xing06')} style={[layouts.star06Layout, { opacity: this.state.starrightHidden }]} />
                        </View>
                        <View style={[layouts.bgLayerLayout, { zIndex: 2 }]}>
                            <TouchableOpacity
                                //开启按钮
                                style={[layouts.openViewLayout,
                                {
                                    left: this.state.left_openPressValue,
                                    top: this.state.top_openPressValue,
                                    transform: [{ scale: this.state.small_openPressValue }]
                                }]}
                                onPress={() => {
                                    this._ChangeToShake()
                                } }>
                                <Animated.Image source={require('image!icon_kai')} style={layouts.kai} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const layouts = StyleSheet.create({
    //打开的按钮
    kai: {
        height: 80,
        width: 80,
    },
    //总背景
    bgViewLayout: {
        width: bgWidth,
        height: bgHeight,
        justifyContent: 'center',
    },
    //半透明背景
    blackViewLayout: {
        position: 'absolute',
        width: bgWidth,
        height: bgHeight,
        backgroundColor: 'black',
        opacity: 0.5,
        top: 0,
        left: 0,
    },
    //图层背景
    bgLayerLayout: {
        position: 'absolute',
        width: bgWidth,
        height: bgHeight,
        top: 0,
        left: 0,
    },
    //红包封面
    bgRedCoverLayout: {
        position: 'absolute',
        width: redWidth,
        height: redHeight,
        top: redCoverLayout,
    },
    bgRedCoverLayout2: {
        position: 'absolute',
        width: redWidth,
        height: redHeight,
        top: redCoverLayout,
    },
    //红包封面背景--基准页面
    bgRedCoverViewLayout: {
        width: redWidth,
        height: bgHeight,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    //红包头
    bgRedTitleLayout: {
        position: 'absolute',
        width: redWidth,
        height: redTitleHeight,
        top: redTitleTop + 3 * redGap,
    },
    //红包头底
    bgRedTitleBottomLayout: {
        position: 'absolute',
        width: redWidth,
        height: redTitleHeight,
        top: redBottomTop - redTitleHeight - redGap,
        left: -0.5,
    },
    //开按钮
    openViewLayout: {
        position: 'absolute',
        width: redOpenButton,
        height: redOpenButton,
        top: redTitleTop + redTitleHeight / 2,
        left: (redWidth - redOpenButton) / 2,
    },
    gold01Layout: {
        width: 35,
        height: 35,
        marginTop: redCoverLayout - 3,
        marginLeft: 13,
        zIndex: 3,
    },
    gold02Layout: {
        //position:'absolute',
        width: 35,
        height: 35,
        marginTop: redCoverLayout + 10,
        marginLeft: -17,
        zIndex: 1,
    },
    gold03Layout: {
        width: 65,
        height: 65,
        marginTop: redCoverLayout + 7,
        marginLeft: -20,
        zIndex: 2,
    },
    gold04Layout: {
        width: 65,
        height: 65,
        marginTop: redCoverLayout - 3,
        marginLeft: -23,
        zIndex: 3,
    },
    gold05Layout: {
        width: 36,
        height: 36,
        marginTop: redCoverLayout + 15,
        marginLeft: -9,
        zIndex: 2,
    },
    gold06Layout: {
        width: 48,
        height: 48,
        marginTop: redCoverLayout - 4,
        marginLeft: -12,
        zIndex: 3,
    },
    gold07Layout: {
        width: 36,
        height: 36,
        marginTop: redCoverLayout - 4,
        marginLeft: -10,
        zIndex: 2,
    },
    star01Layout: {
        width: 14,
        height: 16,
        marginTop: redCoverLayout - 50,
        marginLeft: 72,
    },
    star02Layout: {
        width: 10,
        height: 11.5,
        marginTop: redCoverLayout - 75,
        marginLeft: 40,
    },
    star03Layout: {
        width: 18,
        height: 20.5,
        marginTop: redCoverLayout - 35,
        marginLeft: -5,
    },
    star04Layout: {
        width: 10,
        height: 11.5,
        marginTop: redCoverLayout - 23,
        marginLeft: -35,
    },
    star05Layout: {
        width: 14,
        height: 16,
        marginTop: redCoverLayout - 65,
        marginLeft: 48,
    },
    star06Layout: {
        width: 9.5,
        height: 11.5,
        marginTop: redCoverLayout - 20,
        marginLeft: 12,
    }
});
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

var ScrollableTabView = require('react-native-scrollable-tab-view');
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../../utils/ToastUtil';

import FeaturePage from './featurePage.js';
import TrainPage from './trainPage.js';
import DietPage from './dietPage.js';
import MallPage from './mallPage.js';

var _scrollView;
export default class findPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://xiaowublog.sxl.cn/',
            enableScroll: true,
            top: 0,
            left: 0,
            isFatherScroll: true,
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onResponderTerminationRequest: () => false,
            onStartShouldSetResponderCapture: () => { this.state.isFatherScroll },
            onMoveShouldSetResponderCapture: () => { this.state.isFatherScroll },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
            onPanResponderGrant: () => {
                this._top = this.state.top;
                this._left = this.state.left;
            },
            onPanResponderMove: (evt, gs) => {
                console.log(gs.dx + '-- 滑动---' + gs.dy);
                toastShort(gs.dx + '--Move--' + gs.dy);
                //   toastShort(gs.dx + '----' + gs.dy);

                toastShort(gs.dx + '----' + gs.dy);
                console.log(gs.dx + '---' + gs.dy);
                if (Math.abs(gs.dx) > Math.abs(gs.dy)) {
                    if (gs.dx < 0) {
                        toastShort("向左滑动");
                    } else if (gs.dx > 0) {
                        toastShort("向右滑动");
                    }
                } else if (Math.abs(gs.dx) < Math.abs(gs.dy)) {
                    if (gs.dy < 0) {
                        toastShort('上滑' + gs.dy + "---" + evt.page);
                        if (gs.dx > 50) {
                            toastShort('设置false');
                            this.setState({
                                isFatherScroll: false,
                            })
                        }
                    } else {
                        this.setState({
                            isFatherScroll: true,
                        })
                    }
                }
            },
            onPanResponderRelease: (evt, gs) => {
            }
        });
    }

    _scrollView(event) {
        // toastShort(event.nativeEvent.contentOffset.y + "外面scrollview滑动");
        // if (event.nativeEvent.contentOffset.y > 50) {
        //     this.setState({
        //         enableScroll: false,
        //     });
        // }
    }


    //  <ScrollView
    //                     {...this._panResponder.panHandlers}
    //                     ref={(scrollview) => _scrollview = scrollview}
    //                     style={styles.container}
    //                     scrollEnabled={this.state.enableScroll}
    //                     onScroll={(e) => this._scrollView(e)}
    //                     >
    //                       </ScrollView>
    render() {
        return (
            <View style={styles.container}
                >

                <View
                    style={[styles.top]}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }} onPress={() => this.__scrollView()}>动态</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <ScrollableTabView style={{ backgroundColor: '#453d4b' }}
                        tabBarUnderlineStyle={{ borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' }}
                        tabBarActiveTextColor='#FFF'
                        tabBarInactiveTextColor='#a1a1a1'
                        tabBarTextStyle={{ fontFamily: 'Roboto', marginTop: 7, fontSize: 14 }}>
                        <FeaturePage tabLabel="精选" />
                        <TrainPage tabLabel="训练" />
                        <DietPage tabLabel="饮食" />
                        <MallPage tabLabel="商城" />
                    </ScrollableTabView>
                </View>

            </View>
        );
    }
}
//     <View style={{ backgroundColor: '#33FFFF', height: 1000 }}></View>

//  

const styles = StyleSheet.create({
    webView: {
        width: widthSrc,
        height: heightSrc,
    },
    container: {
        flex: 1,
    },
    top: {
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50,
    }
});
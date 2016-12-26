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
    PanResponder,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StatusBar,
} from 'react-native';
import { toastShort } from '../../utils/ToastUtil';
var CIRCLE_SIZE = 80;

export default class actionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg: 'white',
            top: 0,
            left: 0
        }
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
         
            onPanResponderGrant: () => {
                this._top = this.state.top
                this._left = this.state.left
                this.setState({ bg: 'red' })
            },
            onPanResponderMove: (evt, gs) => {

                this.setState({
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })
            },
            onPanResponderRelease: (evt, gs) => {
                this.setState({
                    bg: 'white',
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })

                toastShort(this.state.top + ' ' + this.state.left + '----' + evt.pageX)
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    {...this._panResponder.panHandlers}
                    style={[styles.rect, {
                        "backgroundColor": this.state.bg,
                        "top": this.state.top,
                        "left": this.state.left
                    }]}></View>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rect: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
        position: 'absolute',
    }
});
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
    ScrollView,
    StatusBar,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;

export default class TrainDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollOffset: 0,
        };
    }


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
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <StatusBar
                    translucent={true}
                    hidden={true}
                    animated={true}
                    />
                <ScrollView
                    onScroll={(event) => { this.setState({ scrollOffset: event.nativeEvent.contentOffset.y }); } }
                    scrollEventThrottle={15}>
                    <Image style={{ width: widthSrc, height: 180 }} resizeMode='stretch' source={{ uri: this.props.data.trainID.platImg }}>
                        <Text style={{ fontSize: 30, color: '#FFFFFF', marginLeft: 15, marginTop: 72 }}>{this.props.data.trainID.name}</Text>

                        <View style={{ flexDirection: 'row', marginTop: 18, marginLeft: 16 }}>
                            <View></View>
                            <Text style={{ fontSize: 12, color: '#FFFFFF' }}>训练说明</Text>
                            <View>
                                <Text style={{ fontSize: 12, color: '#FFFFFF', marginLeft: 15 }}>音乐设置</Text>
                            </View>
                        </View>
                    </Image>

                    <Text style={{ fontSize: 30,height:200}}>数据数据</Text>
                    <Text style={{ fontSize: 30,height:200 }}>数据数据</Text>
                    <Text style={{ fontSize: 30,height:200 }}>数据数据</Text>
                </ScrollView>
                <View style={[styles.main_top, { position: 'absolute', "backgroundColor": 'rgba(69,61,75,' + opacity + ')' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this._backFunction()}>
                            <Image style={{ width: 23, height: 23 }} source={require('../img/backicon.png')} resizeMode='cover'></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, color: '#FFFFFF', marginLeft: 10 }}>{opacity > 0.8 ? this.props.data.trainID.name : ''}</Text>
                    </View>
                    <View></View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 23, height: 23 }} source={require('../img/share1.png')} resizeMode='cover'>
                        </Image>
                        <Image style={{ width: 23, height: 23, marginLeft: 15, marginRight: 10 }} source={require('../img/more.png')} resizeMode='cover'></Image>
                    </View>
                </View>
            </View>
        );
    };
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
        height: 80,
        top: 0,
        left: 0,
        zIndex: 99,
        paddingTop: 27,
    },
});
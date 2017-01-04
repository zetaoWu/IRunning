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
    ScrollView,
    BackAndroid,
    ToastAndroid,
    ListView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StatusBar,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
var data = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6', 'row7', 'row21', 'row13', 'row22', 'row15', 'row223', 'row141', 'row2421', 'row21', 'row13', 'row22', 'row15', 'row223', 'row141', 'row2421'];
var endData = ['', '', '', ''];
var _listview;

export default class weekPage extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
        this.state = {
            dataSource: ds.cloneWithRows(data.reverse().concat(endData)),
        }
    }

    componentDidMount() {
        _listview.scrollTo({ x: 10000000 });
    }

    _renderItemData(rowData, rowId) {
        return (
            <View style={{ justifyContent: 'flex-end', height: 100, width: widthSrc / 9, }}>
                <Text numberOfLines={1} style={{ fontSize: 13 }}>{rowData}</Text>
            </View>);
    }

    render() {
        var curTime = new Date();
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                    <Text style={{ marginLeft: 15, marginTop: 15 }}>今天({curTime.toLocaleDateString().toString().substring(0, 5)}),训练时长</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 40 }}>0 分钟</Text>

                        <View style={{ height: 20, width: widthSrc, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text>完成次数</Text>
                            <Text>累计消耗</Text>
                        </View>

                        <TouchableOpacity onPress={() => { _listview.scrollTo({ x: 10000000 }); } }>
                            <View style={{ height: 20, marginTop: 10, width: widthSrc, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Text>0次</Text>
                                <Text>0千卡</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 100, marginTop: 20 }}>
                        <ListView
                            ref={(listview) => { _listview = listview; } }
                            showsHorizontalScrollIndicator={false}
                            style={{ height: 100, width: widthSrc }}
                            horizontal={true}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData, sectionID, rowid) => this._renderItemData(rowData, rowid)}>
                        </ListView>
                    </View>

                    <View style={{ backgroundColor: '#D3D3D3' }}>
                        <Text>   </Text>
                    </View>

                    <View style={{ width: widthSrc, height: 150, backgroundColor: '#FFFFFF', alignItems: 'center', marginTop: 70 }}>
                        <Image style={{ width: 40, height: 40 }} source={require('../../img/record.png')} resizeMode='contain'></Image>
                        <Text>无训练记录</Text>
                    </View>
                </ScrollView>
            </View >
        );
    }
}
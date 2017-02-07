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
    ListView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StatusBar,
    ScrollView,
    ART,
} from 'react-native';

import ChartView from '../chart.js';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../../utils/ToastUtil';
// 模拟数据 
var data = [];
var chartData = [];
// 实现居中 所添加空数据  TODO 后期根据宽度/item宽度 动态计算添加
var endData = ['', '', '', ''];
var chartEndData = ['80', '80', '80', '80'];

export default class dayPage extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
        this.state = {
            dataSource: ds.cloneWithRows(data),
        }
    }

    componentDidMount() {
        this.refs._listview.scrollTo({ x: 10000000 });
        //  模拟数据 日期
        for (var i = 0; i < 20; i++) {
            data.push((new Date(new Date() - 24 * 60 * 60 * 1000*i)).toLocaleDateString().toString().substring(0, 5));
            chartData.push(Math.random()*80);
        }

        chartData=chartData.reverse().concat(chartEndData);

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data.reverse().concat(endData)),
        });
    }

    componentWillUnmount(){
        data=[];
        chartData=[];
    }

    _renderItemData(rowData, rowId) {
        return (
            <View style={{ justifyContent: 'flex-end', height: 100, width: widthSrc / 9 }}>
                <ChartView chartTop={chartData[rowId]}></ChartView>
                <Text numberOfLines={1} style={{ fontSize: 13, height: 20 }}>{rowData}</Text>
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

                        <TouchableOpacity onPress={() => {
                            console.log(this.refs._listview + "");
                            this.refs._listview.scrollTo({ x: 10000000 });
                        } }>
                            <View style={{ height: 20, marginTop: 10, width: widthSrc, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Text>0次</Text>
                                <Text>0千卡</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 100, marginTop: 20 }}>
                        <ListView
                            ref="_listview"
                            onScroll={(e)=>{toastShort(e.nativeEvent.contentOffset.x)}}
                            enableEmptySections={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ height: 100, width: widthSrc }}
                            horizontal={true}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData, sectionID, rowid) => this._renderItemData(rowData, rowid)}>
                        </ListView>
                    </View>

                    <View style={{height:10,width:widthSrc, backgroundColor:'#FFFFFF',justifyContent:'center',alignItems:'center'}}>
                        <Text>^</Text>
                    </View>

                    <View style={{ backgroundColor: '#D3D3D3' }}>
                        <Text> </Text>
                    </View>

                    <View style={{ width: widthSrc, height: 350, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                    </View>
                </ScrollView>
            </View>
        );

    }
}

    // <View style={{ width: widthSrc, height: 150, backgroundColor: '#FFFFFF', alignItems: 'center', marginTop: 70 }}>
    //                <Image style={{ width: 40, height: 40 }} source={require('../../img/record.png')} resizeMode='contain'></Image>
    //                 <Text>无训练记录</Text>
    //             </View>
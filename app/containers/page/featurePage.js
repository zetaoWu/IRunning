'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    Image,
    RefreshControl,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../../utils/ToastUtil';
var imgs = [
    require('../../img/icon1.jpg'),
    require('../../img/icon2.jpg'),
    require('../../img/icon1.jpg'),
    require('../../img/icon2.jpg'),
    require('../../img/icon1.jpg'),
    require('../../img/icon2.jpg'),
    require('../../img/icon1.jpg'),
    require('../../img/icon2.jpg'),
    require('../../img/icon1.jpg'),
];

var i = 0;
var title = [
    '健身健身健身健身健身健身健身健身健身健身健身健身健身健身1',
    '健身2',
    '健身3',
    '健身4',
    '健身5',
    '健身6',
    '健身7',
    '健身8',
    '健身9',
];

export default class featurePage extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            data:title,
            isRefreshing: false,
        }
    }

    componentDidMount() {
        this.setState({

        });
    }

    _featureData(pressData) {
        var that = this;
        var data = [];
        if (pressData) {
            data = pressData;
        }
        return data;
    }

    _renderItem(rowData, rowID) {
        return (
            <View style={styles.item}>
                <Image style={styles.item_img} source={imgs[rowID]} resizeMode='cover' />
                <Text numberOfLines={2} style={styles.item_text}>{rowData}</Text>
                <View style={styles.detail}>
                    <Image style={styles.img_detail} source={require('../../img/sound.png')} resizeMode="center" ></Image>
                    <Text style={{marginLeft:7}}>50</Text>
                    <Image style={[styles.img_detail,{marginLeft:10}]} source={require('../../img/chat.png')} resizeMode="center"></Image>
                    <Text style={{marginLeft:7}}>70</Text>
                </View>
            </View>
        );
    }
 
    _onRefresh() {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            imgs.push(require('../../img/icon1.jpg'),
                require('../../img/icon2.jpg'),
                require('../../img/icon1.jpg'),
                require('../../img/icon2.jpg'));

            title.unshift(
                '刷新1',
                '刷新2',
                '刷新3',
                '刷新4',
            );
            i=i+4;
            
            this.setState({
                isRefreshing: false,
                data: this._featureData(title),
            });
        }, 3000);
    }
    render() {

       var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });

        var that = this;
        this.state.data;
        return (
            <View style={styles.contain}>
                <ListView
                    contentContainerStyle={styles.list}
                    enableEmptySections={true}
                    pageSize={2}
                    scrollRenderAheadDistance={500}
                    dataSource={ds.cloneWithRows(this.state.data)}
                    renderRow={(rowData, sectionID, rowID) => that._renderItem(rowData, rowID)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#FF0000"
                            title="loading..."
                            titleColor="#00ff00"
                            colors={['#453d4b', '#453d4b', '#453d4b']}
                            progressBackgroundColor="#FFFFFF"
                            >
                        </RefreshControl>
                    }>
                </ListView>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
    },
    contain: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    item: {
        width: widthSrc / 2 - 15,
        height: widthSrc / 2 + 60,
        backgroundColor: '#F3F3FF',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    item_img: {
        width: widthSrc / 2 - 15,
        height: widthSrc / 2 - 10,
    },
    item_text: {
        width: widthSrc / 2 - 15,
        height:37,
        marginTop: 4,
        marginLeft: 5,
        marginRight: 5,
        justifyContent:'flex-start',
    },
    detail:{
        width:widthSrc / 2 - 10,
        height:25,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-start'
    },
    img_detail:{
        width:17,
        height:17,
        marginLeft:3
    }
});

// 2016-12-26T08:09:46.506549Z 1 [Note] A temporary password is generated for root@localhost: Ft9l!aM:&NqU
// If you lose this password, please consult the section How to Reset the Root Password in the MySQL reference manual.
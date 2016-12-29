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
    '健身',
    '健身',
    '健身 ',
    '健身 ',
    '健身',
    '健身',
    '健身',
    '健身',
    '健身',
];

export default class mallPage extends Component {
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
        width: widthSrc / 2 - 10,
        height: widthSrc / 2 - 10,
    },
    item_text: {
        marginTop: 4,
        marginLeft: 2,
        marginRight: 2,
    }
});

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    StatusBar,
    ListView,
    ToastAndroid,
    Switch,
    TouchableWithoutFeedback,
    BackAndroid,
} from 'react-native';

// 名字
var NAMES = [
    'Girls Generation',
    'Jessica Jung',
    'Kim Hyo Yeon',
    'Seo Hyun',
    'Soo Young',
    'Sunny',
    'Taeyeon',
    'Tiffany',
    'Yoona',
    'Yuri',
    'Yuri'];

export default class runSet extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            voicePlayIsOn: false,
            autoStop: false,
            runBefWarmUp: false,
            runAfterWramUp: false,
            dataSource: ds,
            data: this._genRows()
        };
    }

    _genRows() {
        var datas = new Array();
        for (var i = 0; i < NAMES.length; i++) {
            var newname = "" + i;
            datas.push(newname);
        }
        // console.log(data+"----------------------");
        return datas;
    }

    _backFunction() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _onPress(value) {
        this.setState({ voicePlayIsOn: value })
        ToastAndroid.show(value + "", 3);
    }

    _renderSetRow(rowData, sectionID, rowID) {
        if (rowID == 0) {
            return (
                <View style={styles.first_set}>
                    <Text style={{ marginLeft: 10 }}>语音播报</Text>
                    <Text></Text>

                    <Switch
                        onValueChange={(value) => this._onPress(value)}
                        value={this.state.voicePlayIsOn}></Switch>
                </View>);
        }

        if (rowID == 1) {
            return (
                <View style={styles.first_set}>
                    <Text style={{ marginLeft: 10 }}>自动暂停</Text>
                    <Text></Text>
                    <Switch
                        onValueChange={(value) => this.setState({ autoStop: value })}
                        value={this.state.autoStop}></Switch>
                </View>);
        }

        if (rowID == 2) {
            return (
                <View style={styles.comment_text}>
                    <Text style={{ fontSize: 13 }}>自动暂停功能需要消耗更多的电量</Text>
                </View>);
        }

        if (rowID == 3) {
            return (
                <View style={styles.first_set}>
                    <Text style={{ marginLeft: 10 }}>本次跑步目标</Text>
                    <Text></Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5 }}>
                        <Text style={{ fontSize: 13 }}>不设置目标, 自由排布</Text>
                        <Image style={{ width: 20, height: 20 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                    </View>
                </View>);
        }

        if (rowID == 4) {
            return (
                <View style={styles.first_set}>
                    <Text style={{ marginLeft: 10 }}>跑前热身</Text>
                    <Text></Text>
                    <Switch
                        onValueChange={(value) => this.setState({ runBefWarmUp: value })}
                        value={this.state.runBefWarmUp}></Switch>
                </View>);
        }

        if (rowID == 5) {
            return (
                <View style={styles.first_set}>
                    <Text style={{ marginLeft: 10 }}>动作预览</Text>
                    <Text></Text>
                    <Image style={{ width: 20, height: 20 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                </View>);
        }

        if (rowID == 6) {
            return (
                <View style={styles.comment_text}>
                    <Text style={{ fontSize: 13 }}>开启后仍可以在跑步过程中跳过此环节</Text>
                </View>);
        }

        if (rowID == 7) {
            return (
                <View style={styles.first_set}>
                    <Text style={{ marginLeft: 10 }}>跑后拉伸</Text>
                    <Text></Text>
                    <Switch
                        onValueChange={(value) => this.setState({ runAfterWramUp: value })}
                        value={this.state.runAfterWramUp}></Switch>
                </View>);
        }

        if (rowID == 8) {
            return (
                <View style={styles.first_set}>
                    <Text style={{ marginLeft: 10 }}>动作预览</Text>
                    <Text></Text>
                    <Image style={{ width: 20, height: 20 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                </View>);
        }

        if (rowID == 9) {
            return (
                <View style={styles.comment_text}>
                    <Text style={{ fontSize: 13 }}>开启后扔可以在跑步过程中跳过此环节</Text>
                </View>);
        }

        if (rowID == 10) {
            return (
                <View style={styles.first_set}>
                    <Text style={{ marginLeft: 10 }}>离线地图</Text>
                    <Text></Text>
                    <Image style={{ width: 20, height: 20 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                </View>);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#453d4b'
                    barStyle="default"
                    translucent={true}
                    hidden={false}
                    animated={true}
                    />

                <View style={styles.top_view}>
                    <TouchableWithoutFeedback onPress={this._backFunction.bind(this)}>
                        <Image style={styles.icon_left} resizeMode='contain' source={require('image!back_icon')}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.top_title}>跑步设置</Text>
                    <Text style={styles.top_title}>&nbsp; &nbsp; &nbsp; &nbsp; </Text>
                </View>
                <ListView
                    style={styles.listview}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={(rowData, sectionID, rowID) => this._renderSetRow(rowData, sectionID, rowID)}
                    showsVerticalScrollIndicator={false}>
                </ListView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    comment_text: {
        paddingTop: 6,
        paddingLeft: 10,
        paddingBottom: 0,
    },
    listview: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    first_set: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 6,
        borderColor: '#000000',
        borderWidth: 0.5,
        width: Dimensions.get('window').width - 20,
        height: 40,
        backgroundColor: '#F5F5F5'
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    item: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FF1492',
    },
    icon_left: {
        width: 25,
        height: 25,
    },
    top_title: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    top_view: {
        height: 50,
        marginTop:20,
        width: Dimensions.get('window').width,
        paddingLeft: 7,
        paddingRight: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#453d4b',
    }
});

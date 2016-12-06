import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    BackAndroid,
    ToastAndroid,
    Dimensions,
    Image,
    StatusBar,
    Modal,
    ListView,
    Platform,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native'
var ScrollableTabView = require('react-native-scrollable-tab-view');
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;

import DayPage from './page/dayPage';
import WeekPage from './page/weekPage';
import MonthPage from './page/monthPage';
import TotalPage from './page/totalPage';

var images = [
    require('../img/wx.png'),
    require('../img/wxfc.png'),
    require('../img/qq.png'),
    require('../img/qzone.png'),
    require('../img/sina.png'),

];

export default class trainHis extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            animationType: false,
            modalVisible: false,
            transparent: false,
            data: this._genRows(),
            dataSource: ds,
            onClickLable: -1,
        }
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
        console.log(this.state.modalVisible + '----');
        if (this.state.modalVisible) {
            this.setState({ modalVisible: false });
            return true;//接管默认行为
        }
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为  
        }
        return false;//默认行为  
    };

    _genRows() {
        var datas = ['微信', '朋友圈', 'QQ', 'QQ空间', '新浪'];
        // console.log(data+"----------------------");
        return datas;
    }

    _onBackFunction() {
        console.log(this);
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _onShared(visible, lable) {
        this.setState({ modalVisible: visible, onClickLable: lable });
    }

    _setAnimationType(type) {
        this.setState({ animationType: type });
    }

    toggleTransparent() {
        this.setState({ transparent: !this.state.transparent });
    }

    _toSharedPlatFrom(rowID, rowData) {
        // this.setState({ modalVisible: false });
        this._onShared(false);
    }
    _toCancel() {
        this.setState({ modalVisible: false });
    }

    _renderSetRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={(rowID, rowData) => this._toSharedPlatFrom(rowID, rowData)}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Image style={{ width: 68, height: 65 }} resizeMode='contain' source={images[rowID]}></Image>
                    <Text style={{ color: '#000000' }}>{rowData}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    _selectHisShow() {
        this.setState({ modalVisible: false });
    }

    render() {
        return (
            <View style={{ width: widthSrc, height: heightSrc, backgroundColor: '#FFFFFF' }}>
                <StatusBar
                    backgroundColor='#453d4b'
                    barStyle="default"
                    translucent={true}
                    hidden={false}
                    animated={true}
                    />
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={(a) => { this._onShared(a) } }>
                    {
                        //判断  如果是1 的话是选择时间  2 是选择分享
                        this.state.onClickLable === 1 ? <View style={styles.grayBack}>
                            <View style={{ width: 170, height: 70, backgroundColor: '#FFFFFF', marginTop: 50, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginBottom: 7, fontSize: 12 }} onPress={() => this._selectHisShow()}>所有训练历史</Text>
                                <View style={{ idth: widthSrc, height: 1, backgroundColor: '#D8D8D8' }}></View>
                                <Text style={{ marginTop: 7, fontSize: 12 }} onPress={() => this._selectHisShow()}>跑步历史</Text>
                            </View>
                        </View> : <View style={[styles.innerContainer]}  >
                                <View style={{ width: widthSrc - 80, height: widthSrc - 80, backgroundColor: '#FFFFFF', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 17, marginTop: 20 }}>分享到</Text>
                                    <ListView
                                        horizontal={true}
                                        contentContainerStyle={styles.list}
                                        dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                                        renderRow={(rowData, sectionID, rowID) => this._renderSetRow(rowData, sectionID, rowID)
                                        }>
                                    </ListView>
                                </View>
                            </View>
                    }
                </Modal>

                <View style={[styles.main_top, { marginTop: 20 }]}>
                    <TouchableWithoutFeedback onPress={() => this._onBackFunction()}>
                        <Image style={styles.icon_left} resizeMode='contain' source={require('../img/back_icon.png')}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.toptitle} onPress={(a) => this._onShared(a, 1)}>所有训练历史</Text>
                    <TouchableWithoutFeedback onPress={(a) => this._onShared(a, 2)}>
                        <Image style={styles.icon_right} resizeMode='contain' source={require('../img/shared.png')}></Image>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollableTabView style={{ height: 100 }}
                    tabBarUnderlineStyle={{ borderColor: '#FFFFFF', backgroundColor: '#453d4b' }}
                    tabBarActiveTextColor='#5c6166'
                    tabBarInactiveTextColor='#676B70'
                    tabBarTextStyle={{ fontFamily: 'Roboto', marginTop: 7, fontSize: 15 }}>
                    <DayPage tabLabel="日" />
                    <WeekPage tabLabel="周" />
                    <MonthPage tabLabel="月" />
                    <TotalPage tabLabel="总" />
                </ScrollableTabView>
            </View >
        );
    };
}

const styles = StyleSheet.create({
    row: {
        width: 80,
        height: 80,
    },
    list: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: widthSrc - 80 - 10,
        marginTop: 10,
    },
    icon_left: {
        width: 23,
        height: 23
    },
    grayBack: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_right: {
        width: 18,
        height: 18
    },
    main_top: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50,
    },
    toptitle: {
        fontSize: 16,
        color: '#FFFFFF'
    },
});
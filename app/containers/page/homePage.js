import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ListView,
    ScrollView,
    ToastAndroid,
    TouchableWithoutFeedback,
    StatusBar,
} from 'react-native';

var url = require('../../url');
var config = require('../../config');
import RunComponent from '../run';
import AddClassComponent from '../addClass';
import TrainHis from '../trainHis';
import NavbarComp from '../Comments/NavBar.js';
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
var data = ['row1', 'row2', 'row3', 'row4', 'row5', 'row13', 'row2421'];
var imgs = [
    require('../../img/icon1.jpg'),
    require('../../img/icon3.jpg'),
    require('../../img/icon4.jpg'),
    require('../../img/icon5.jpg'),
    require('../../img/icon7.jpg'),
    require('../../img/icon4.jpg'),
    require('../../img/icon5.jpg'),
    require('../../img/icon7.jpg'),
];

export default class homePage extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });

        this.state = {
            myTrainDS: ds.cloneWithRows(this._genRows({})),
            commendTrainDS: ds.cloneWithRows(this._genRows({})),
            commendReadDS: ds.cloneWithRows(this._genRows({})),
            trainInfo: '',
            schedule: '',
            isHaveData: 0,
        }
    }

    _genRows(pressData) {
        var that = this;
        var data = [];
        if (pressData) {
            data = pressData;
        }
        return data;
    }

    componentDidMount() {
        var num = this.props.username;
        console.log(num + '----------');

        this._reqDataServer();
    }

    _reqDataServer() {
        var that = this;
        var num = this.props.username;
        console.log(num + '----------');
        //请求训练次数,消耗卡路里等信息
        fetch(url.GET_USE_TRAIN_INFO + '"' + num + '"', {
            method: 'GET',
            headers: {
                'X-Bmob-Application-Id': config.config.ApplicationID,
                'X-Bmob-REST-API-Key': config.config.RESTAPIKey,
            },
        }).then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.results.length === 0) {
                } else {
                    this.setState({
                        trainInfo: responseJSON.results[0],
                    });
                }
            });

        //请求我的训练内容 classes/UserTraining?include=trainID&where={"username":"15021657754"}
        fetch(url.SELF_TRAIN + 'where={"username":"' + num + '"}', {
            method: 'GET',
            headers: {
                'X-Bmob-Application-Id': config.config.ApplicationID,
                'X-Bmob-REST-API-Key': config.config.RESTAPIKey,
            },
        }).then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.results.length === 0) {
                } else {
                    this.setState({
                        myTrainDS: this.state.myTrainDS.cloneWithRows(
                            this._genRows(responseJSON.results)
                        )
                    });
                }
            });

        //请求推荐文章 
        fetch(url.COMMEND_READ, {
            method: 'GET',
            headers: {
                'X-Bmob-Application-Id': config.config.ApplicationID,
                'X-Bmob-REST-API-Key': config.config.RESTAPIKey,
            },
        }).then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.results.length === 0) {
                } else {
                    this.setState({
                        commendReadDS: this.state.commendReadDS.cloneWithRows(
                            this._genRows(responseJSON.results)
                        )
                    });
                }
            });

        //请求推荐训练   取训练列表中前10 
        fetch(url.COMMEND_TRAIN, {
            method: 'GET',
            headers: {
                'X-Bmob-Application-Id': config.config.ApplicationID,
                'X-Bmob-REST-API-Key': config.config.RESTAPIKey,
            },
        }).then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.results.length === 0) {
                } else {
                    this.setState({
                        commendTrainDS: this.state.commendTrainDS.cloneWithRows(
                            this._genRows(responseJSON.results)
                        )
                    });
                }
            });

        //请求课程表
        fetch(url.GET_SCHEDULE, {
            method: 'GET',
            headers: {
                'X-Bmob-Application-Id': config.config.ApplicationID,
                'X-Bmob-REST-API-Key': config.config.RESTAPIKey,
            },
        }).then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.results.length === 0) {
                } else {
                    this.setState({
                        schedule: responseJSON.results[0].classImg,
                    });
                }
            });
    }

    _onRunFunction() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'RunComponent',
                component: RunComponent,
            })
        }
    }

    _onAddFunction() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'AddClassComponent',
                component: AddClassComponent,
            });
        }
    }

    _renItemRecomTrain(rowData, rowID) {
        return (
            <Image style={{ width: 260, height: 140, marginTop: 2, justifyContent: 'space-between', marginRight: 7 }} resizeMode='cover' source={{ uri: rowData.platImg }}>
                <View >
                    <Text style={{ color: '#FFFFFF', fontSize: 18, marginLeft: 15, marginTop: 15 }}>{rowData.name}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, marginLeft: 18, marginTop: 2 }}>{rowData.joinNum}已参加</Text>
                </View>
                <View></View>
                <View style={{ flexDirection: 'row', marginLeft: 17, marginBottom: 15, alignItems: 'center' }}>
                    <Image style={styles.splash_icon} resizeMode='contain' source={require('image!ic_launcher')}></Image>
                    <Text style={{ color: '#FFFFFF', fontSize: 11, marginLeft: 3 }}>{rowData.time}分钟</Text>
                </View>
            </Image>
        );
    }

    _renItemRecomRead(rowData, rowID) {
        return (
            <View style={{ justifyContent: 'space-between', width: 260, marginRight: 7 }}>
                <Image style={{ marginRight: 10, width: 260, height: 130 }} resizeMode='cover' source={{ uri: rowData.platImg }}></Image>
                <Text style={{ alignSelf: 'center', justifyContent: 'center', fontSize: 17, height: 20 }} numberOfLines={1}>{rowData.title}</Text>
                <Text style={{ alignSelf: 'center', justifyContent: 'center', fontSize: 13, height: 20, marginTop: 3 }} numberOfLines={1}>{rowData.introduction}</Text>
            </View>
        );
    }
    // <Text style={{ width: widthSrc, height: 100 }}>{rowData}</Text>

    _renderItemData(rowData, rowID) {
        return (
            <Image style={{ width: widthSrc, height: 130, marginTop: 2, justifyContent: 'space-between' }} resizeMode='cover' source={{ uri: rowData.trainID.platImg }}>
                <Text style={{ color: '#FFFFFF', fontSize: 20, marginLeft: 15, marginTop: 15 }}>{rowData.trainID.name}</Text>
                <View></View>
                <View style={{ flexDirection: 'row', marginLeft: 17, marginBottom: 15, alignItems: 'center' }}>
                    <Image style={[styles.splash_icon, { marginLeft: 3 }]} resizeMode='contain' source={require('image!ic_launcher')}></Image>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, marginLeft: 3 }}>{rowData.trainID.time}分钟</Text>
                </View>
            </Image>
        );
    }

    _renderComTrainHead() {
        return (<View style={{ height: 40, width: widthSrc - 20, marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>推荐训练</Text>
            <Text></Text>
            <Image style={styles.icon_left} resizeMode='contain' source={require('image!jumpto')}></Image>
        </View>);
    }

    _renderComReadHead() {
        return (<View style={{ height: 40, width: widthSrc - 20, marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>推荐阅读</Text>
            <Text></Text>
            <Image style={styles.icon_left} resizeMode='contain' source={require('image!jumpto')}></Image>
        </View>);
    }

    _renderHead() {
        return (<View style={{ height: 40, width: widthSrc - 20, marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>我的训练</Text>
            <Text></Text>
            <Text onPress={() => { } }>+添加训练</Text>
        </View>);
    }

    _renderFoot() {
        return (
            <View style={{ width: widthSrc, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 12, height: 12, marginRight: 7 }} source={require('../../img/record.png')} resizeMode='contain'></Image>
                <Text >编辑排序</Text>
            </View>);
    }

    _toTrainHis() {
        ToastAndroid.show("点解了", 3);
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'TrainHis',
                component: TrainHis,
            });
        }
    }

//    <View style={styles.main_top}>
//                     <TouchableWithoutFeedback onPress={this._onRunFunction.bind(this)}>
//                         <Image style={styles.icon_left} resizeMode='contain' source={require('image!run_data_default')}></Image>
//                     </TouchableWithoutFeedback>
//                     <Image style={styles.top_icon} resizeMode='contain' source={require('image!keep5')}></Image>
//                     <TouchableWithoutFeedback onPress={this._onAddFunction.bind(this)}>
//                         <Image style={styles.icon_image} resizeMode='contain' source={require('image!add_icon')}></Image>
//                     </TouchableWithoutFeedback>
//                 </View>
    render() {
        return (
            <View>
                <NavbarComp route={this.props.route} navigator={this.props.navigator} />

                <ScrollView>
                <TouchableWithoutFeedback onPress={() => this._toTrainHis()}>
                <View >
                    <TouchableWithoutFeedback >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: widthSrc - 20, marginLeft: 10, height: 30 }} >
                            <Text style={{ fontSize: 13 }}>总共训练</Text>
                            <Text></Text>
                            <Image style={[styles.icon_left,]} resizeMode='contain' source={require('image!jumpto')}></Image>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ width: widthSrc, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30 }}>{this.state.trainInfo.totalTime}分钟</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 11 }}>完成</Text>
                        <Text style={{ fontSize: 11 }}>累计</Text>
                        <Text style={{ fontSize: 11 }}>消耗</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                    <View style={{ flexDirection: 'row', width: widthSrc, marginTop: 5, justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 15 }}>{this.state.trainInfo.traninCount}次    </Text>
                        <Text style={{ fontSize: 15 }}>{this.state.trainInfo.totalDayNum}天</Text>
                        <Text style={{ fontSize: 15 }}>{this.state.trainInfo.totalBurnCal}千卡     </Text>
                    </View>
                    <View style={{ marginTop: 10, width: widthSrc, height: 1, backgroundColor: '#D8D8D8' }}>
                    </View>

                    <View style={{ width: widthSrc - 20, height: 40, marginLeft: 10, marginRight: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13 }}>本月好友训练排名</Text>
                        <Text></Text>
                        <Image style={{ width: 20, height: 20 }} source={require('../../img/record.png')} resizeMode='contain'></Image>
                    </View>

                    <View style={{ width: widthSrc, height: 10, backgroundColor: '#D8D8D8' }}>
                    </View>

                    <ListView
                        renderHeader={this._renderHead}
                        renderFooter={this._renderFoot}
                        showsHorizontalScrollIndicator={false}
                        enableEmptySections={true}
                        style={{ width: widthSrc }}
                        dataSource={this.state.myTrainDS}
                        renderRow={(rowData, sectionID, rowID) => this._renderItemData(rowData, rowID)}>
                    </ListView>

                    <View style={{ width: widthSrc, height: 10, backgroundColor: '#D8D8D8' }}>
                    </View>

                    {this._renderComTrainHead()}

                    <View style={{ height: 140 }}>
                        <ListView
                            showsHorizontalScrollIndicator={false}
                            style={{ height: 140, marginTop: 5, marginBottom: 5, width: widthSrc - 10, marginLeft: 10, marginRight: 10 }}
                            horizontal={true}
                            enableEmptySections={true}
                            dataSource={this.state.commendTrainDS}
                            renderRow={(rowData, sectionID, rowID) => this._renItemRecomTrain(rowData, rowID)}>
                        </ListView>
                    </View>

                    {this._renderFoot()}

                    <View style={{ width: widthSrc, height: 10, backgroundColor: '#D8D8D8' }}>
                    </View>
                    {this._renderComReadHead()}

                    <View style={{ height: 180 }}>
                        <ListView
                            showsHorizontalScrollIndicator={false}
                            style={{ height: 180, marginTop: 5, marginBottom: 5, width: widthSrc - 10, marginLeft: 10, marginRight: 10 }}
                            horizontal={true}
                            enableEmptySections={true}
                            dataSource={this.state.commendReadDS}
                            renderRow={(rowData, sectionID, rowId) => this._renItemRecomRead(rowData, rowId)}>
                        </ListView>
                    </View>
                    {this._renderFoot()}

                    <View style={{ width: widthSrc, height: 10, backgroundColor: '#D8D8D8' }}>

                    </View>
                    <View >
                        <View style={{ height: 30, justifyContent: 'center' }}>
                            <Text style={{ width: widthSrc, marginLeft: 10 }}>课程表</Text>
                        </View>
                        <Image style={{ width: widthSrc, height: 200, alignItems: 'center', justifyContent: 'center' }} resizeMode='stretch' source={{ uri: this.state.schedule }}>
                            <Text style={{ fontSize: 25, color: '#FFFFFF', fontWeight: '300' }}>定制课程表</Text>
                            <Text style={{ marginTop: 7, fontSize: 14, color: '#FFFFFF' }}>量身定制1-4周训练安排</Text>
                            <Text style={{ fontSize: 14, color: '#FFFFFF' }}>达成理想身材</Text>
                        </Image>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    splash_icon: {
        width: 17,
        height: 17,
    },
    icon_left: {
        width: 17,
        height: 20,
    },
    icon_image: {
        width: 20,
        height: 20,
    },
    top_icon: {
        width: 47,
        height: 45,
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
});
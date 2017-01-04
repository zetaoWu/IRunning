'use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ListView,
    ScrollView,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StatusBar,
    Platform,
    TextInput,
    Keyboard,
    BackAndroid,
    Animated,
    Modal,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

var data = ['上海市', '长阳谷', '上海欧尚', '上海金迪面馆', '宁国路', '百联', '美食街'];
var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import { toastShort } from '../utils/ToastUtil';
var alertMessage = '你还没有发布动态,确定不发布了吗?';
var isPubMessage = '确定后他人将无法看到该动态，且设置不可更改';

export default class PostDynamic extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
        this.state = {
            dynamic: '',
            showVoice: false,
            subHeight: new Animated.Value(30),
            keyHeight: 270,
            isPubSecret: 0,
            dataSource: ds.cloneWithRows(this._genRows({})),
            selLocation: '',
            modalVisible: false,
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

    _onShared(visible) {
        this.setState({ modalVisible: visible });
    }
    _openCamera() {
        this.setState({ modalVisible: false });
        // ImagePicker.launchCamera(options, (response) => {
        //     // uri (on android)
        //     // const source = { uri: response.uri, isStatic: true };
        //     const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
        //     this.setState({
        //         avatarSource: source,
        //     });
        // });

        ImageCropPicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            cropperTintColor: '#453d4b'
        }).then(image => {
            this.setState({
                avatarSource: image.path,
            });
        });
    }

    _openAlbum() {
        this.setState({ modalVisible: false });
        
        ImageCropPicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            cropperTintColor: '#453d4b'

        }).then(image => {
            this.setState({
                avatarSource: image.path,
            });
        });
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._genRows(data))
        });
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide);
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardWillShow = (frames) => {
        Animated.timing(this.state.subHeight, {
            toValue: this.keyboardHeight,
            duration: 300,
        }).start();

        this.setState({
            showKeyboard: true,
            keyHeight: 270,
        })
    };

    _keyboardWillHide = () => {
        const {showVoice, showMenu, showFace} = this.state;
        if (showVoice || showMenu || showFace) return

        Animated.timing(this.state.subHeight, {
            toValue: 30,
            duration: 300,
        }).start();

        this.setState({
            showKeyboard: false,
            keyHeight: 20,
        })
    };

    onBackAndroid = () => {
        const { navigator } = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为  
        }
        return false;//默认行为  
    };

    _returnBef() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _back() {
        if (this.state.dynamic !== '') {
            Alert.alert('', alertMessage,
                [
                    { text: '不发了', onPress: () => this._returnBef() },
                    { text: '再看看', onPress: () => console.log('再看看') },
                ]);
        } else {
            this._returnBef();
        }
    }

    _isPubSecret() {
        Alert.alert('', isPubMessage,
            [
                { text: '确定', onPress: () => this._sureNoPub() },
                { text: '取消', onPress: () => console.log('取消') },
            ]);
    }

    _sureNoPub() {
        this.setState({
            isPubSecret: 1,
        });
    }

    _selLocation(selData) {
        this.setState({
            selLocation: selData,
        });
    }

    _renderItemData(rowData, rowid) {
        return (
            <TouchableOpacity onPress={() => this._selLocation(rowData)}>
                <View style={{ marginLeft: 10, padding: 5, backgroundColor: "#EFEFEF", borderRadius: 10 }}>
                    <Text>{rowData}</Text>
                </View>
            </TouchableOpacity>);
    }

    _renderSub() {
        var isPubSecret = this.state.isPubSecret;
        var selLocation = this.state.selLocation;
        return (
            <View style={{ bottom: this.state.keyHeight, width: widthSrc, flex: 1, position: 'absolute', justifyContent: 'flex-end',zIndex:1}}>
                <View style={styles.firstMenu}>
                    <Image style={{ width: 23, height: 20 }} source={require('../img/location_black.png')} resizeMode="center"></Image>
                    {
                        selLocation !== '' ?
                            <View style={{ justifyContent: 'center', height: 40, flex: 1 }}>
                                <Text>{this.state.selLocation}</Text>
                            </View> :
                            <ListView
                                showsHorizontalScrollIndicator={false}
                                style={{ flex: 1, marginRight: 5 }}
                                horizontal={true}
                                enableEmptySections={true}
                                dataSource={this.state.dataSource}
                                renderRow={(rowData, sectionID, rowid) => this._renderItemData(rowData, rowid)}>
                            </ListView>
                    }
                    <TouchableOpacity onPress={() => this._isPubSecret()}>
                        {
                            isPubSecret === 0 ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ marginRight: 3, width: 15, height: 15 }} source={require('../img/unlock.png')} resizeMode='center'></Image>
                                <Text >公开</Text>
                            </View> : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ marginRight: 3, width: 15, height: 15 }} source={require('../img/lock.png')} resizeMode='center'></Image>
                                    <Text >私有</Text>
                                </View>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.secMenu}>
                    <TouchableOpacity onPress={()=>this._onShared(true)}>
                        <Image style={{ width: 23, height: 20 }} source={require('../img/camerablack.png')} resizeMode="center"></Image>
                    </TouchableOpacity>
                    <Image style={{ width: 20, height: 17, marginLeft: 15 }} source={require('../img/aite.png')} resizeMode="center"></Image>
                    <Image style={{ width: 20, height: 17, marginLeft: 15 }} source={require('../img/jing.png')} resizeMode="center"></Image>
                </View>
            </View>);
    }

    _surePost() {
        this.props.navigator.push({
            id: 'PostScs',
        });
    }


    render() {
        return (
            <View style={{ backgroundColor: '#FFFFFF', height: heightSrc, marginTop: 20, width: widthSrc}}>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={(a) => { this._onShared(false) } }
                    >
                    <Text style={styles.overlay} onPress={()=>this._onShared(false)}></Text>
                    <View style={styles.innerContainer} >
                        <View style={{ width: widthSrc - 40, height: 80, backgroundColor: '#FFFFFF', borderRadius: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => this._openCamera()}>
                                <Text style={{ fontSize: 15, marginTop: 7 }}>拍 照</Text>
                            </TouchableOpacity>
                            <View style={{ width: widthSrc - 40, height: 1, backgroundColor: '#D2D2D2' }}></View>
                            <TouchableOpacity onPress={() => this._openAlbum()}>
                                <Text style={{ fontSize: 15, marginBottom: 7 }}>相 册</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.top_style}>
                    <TouchableOpacity onPress={() => this._back()}>
                        <Image source={require('../img/cha.png')} resizeMode='center' style={{ width: 15, height: 15 }}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#FFFFFF' }}>新动态</Text>
                    {
                        this.state.dynamic != '' ?
                            <TouchableOpacity onPress={() => this._surePost()}>
                                <Text style={{ fontSize: 15, color: '#00aa00' }}>发布</Text>
                            </TouchableOpacity>
                            : <Text style={{ fontSize: 15, color: '#b1b1b1' }}>发布</Text>
                    }
                </View>

                {this._renderSub()}
                <TextInput style={styles.input}
                    multiline={true}
                    enablesReturnKeyAutomatically={true}
                    autoFocus={true}
                    blurOnSubmit={false}
                    placeholder='分享你的健身心得和经验吧'
                    keyboardType='default'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        this.setState({ dynamic: text })
                    } }
                    value={this.state.dynamic}
                    ></TextInput>
            </View>
        );
    }
}

// <Animated.View
//     //subView
//     style={{ height: this.state.subHeight, flex: 1, marginHorizontal: 5 }}
//     >
// {this._renderSub()}
// </Animated.View>

const styles = StyleSheet.create({
    top_style: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#453d4b',
        width: Dimensions.get('window').width,
        height: 50,
    },
    input: {
        width: widthSrc,
        flex:1,
        textAlignVertical: "top",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 17,
    },
    menu: {
        fontSize: 18,
        width: widthSrc,
    },
    secMenu: {
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        height: 45,
        width: widthSrc,
        alignItems: 'center',
        paddingLeft: 20,
    },
    firstMenu: {
        backgroundColor: '#FFFFFF',
        height: 40,
        width: widthSrc,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    innerContainer:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
     overlay:{
        position:'absolute',
        top:0,
        right:0,
        bottom:0,
        left:0,
        opacity:0.4,
        backgroundColor:'#000',
    }
});
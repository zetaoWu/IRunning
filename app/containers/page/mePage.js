import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    UIManager,
    LayoutAnimation,
    Animated,
    Dimensions,
    Image,
    Easing,
    BackAndroid,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { toastShort } from '../../utils/ToastUtil';
import UserInfo from '../UserInfo';

var options = {
    title: 'Select Avatar', // specify null or empty string to remove the title
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
    customButtons: {
        'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
    },
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    videoQuality: 'high', // 'low', 'medium', or 'high'
    durationLimit: 10, // video recording max time in seconds
    maxWidth: 500, // photos only
    maxHeight: 500, // photos only
    aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
    aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
    quality: 1, // 0 to 1, photos only
    angle: 0, // android only, photos only
    allowsEditing: false, // Built in functionality to resize/reposition the image after selection
    noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
};


export default class mePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    componentDidMount() {
        this.reqDataFromSer();
    }

    reqDataFromSer() {

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
        // ImagePicker.launchImageLibrary(options, (response) => {
        //     // uri (on android)
        //     // const source = { uri: response.uri, isStatic: true };
        //     const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
        //     this.setState({
        //         avatarSource: source,
        //     });
        // });
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

    _uploadImage() {
        let formData = new FormData();
        let file = { uri: this.state.avatarSource, type: 'multipart/form-data', name: 'a.jpg' };

        formData.append("images", file);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.text())
            .then((responseData) => {
                console.log('responseData', '上传成功' + responseData);
            })
            .catch((error) => { console.error('error', error) });
    }

    _toUserInfo() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'UserInfo',
                id:'UserInfo',
                title:'客户详情',
            });
        }
    }

    render() {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={(a) => { this._onShared(false) } }
                    >
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
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>我</Text>
                    <View></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Image style={{ width: 23, height: 23 }} source={require('../../img/notice.png')} resizeMode='contain'></Image>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={{ width: 20, height: 20, marginLeft: 15 }} source={require('../../img/set.png')} resizeMode='contain'></Image>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>
                    <TouchableOpacity onPress={() => this._toUserInfo()}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 10, width: widthSrc - 25, height: 90, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this._onShared(true)}>
                                    {
                                        this.state.avatarSource == null ?
                                            <View style={{ height: 55, width: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: '#453d4b', borderRadius: 50 }}>
                                                <Image style={{ width: 27, height: 27 }} source={require('../../img/camera.png')} resizeMode='contain'></Image>
                                            </View> :
                                            <Image style={{ width: 55, height: 55, backgroundColor: '', borderRadius: 100 }} source={{ uri: this.state.avatarSource }} resizeMode='cover'></Image>
                                    }
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', height: 50, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15 }}>nickname</Text>
                                    <Text style={{ fontSize: 14 }}>修改资料</Text>
                                </View>
                            </View>
                            <View></View>
                            <View>
                                <Image style={{ width: 17, height: 17 }} resizeMode='contain' source={require('image!jumpto')}></Image>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: widthSrc, height: 1, backgroundColor: '#D8D8D8' }}></View>
                    <View style={{ flexDirection: 'row', height: 45, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text>0 动态</Text>
                        </View>
                        <View style={{ width: 1, height: 20, backgroundColor: '#D8D8D8' }}></View>
                        <View>
                            <Text>1 关注</Text>
                        </View>
                        <View style={{ width: 1, height: 20, backgroundColor: '#D8D8D8' }}></View>
                        <View>
                            <Text>4 粉丝</Text>
                        </View>
                        <View></View>
                    </View>

                    <View style={{ width: widthSrc, height: 10, backgroundColor: '#DaDaDa' }}></View>
                    <View style={{ width: widthSrc, height: 80 }}>
                        <View style={{ flexDirection: 'row', height: 80, alignItems: 'center', justifyContent: 'space-around' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ width: 27, height: 27 }} source={require('../../img/traintime.png')} resizeMode='contain'></Image>
                                <Text style={{ fontSize: 13, marginTop: 5 }}>训练历史</Text>
                            </View >
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ width: 27, height: 27 }} source={require('../../img/traincollection.png')} resizeMode='contain'></Image>
                                <Text style={{ fontSize: 13, marginTop: 5 }}>我的收藏</Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ width: 27, height: 27 }} source={require('../../img/bodydata.png')} resizeMode='contain'></Image>
                                <Text style={{ fontSize: 13, marginTop: 5 }}>身份数据</Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ width: 27, height: 27 }} source={require('../../img/heartrate.png')} resizeMode='contain'></Image>
                                <Text style={{ fontSize: 13, marginTop: 5 }}>运动能力</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: widthSrc, height: 10, backgroundColor: '#DaDaDa' }}></View>

                    <View style={{ width: widthSrc - 20, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 0 }}>
                        <Text style={{ fontSize: 14 }}>训练等级</Text>
                        <View></View>
                        <Image style={{ width: 17, height: 17 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                    </View>
                    <View style={{ width: widthSrc, height: 1, backgroundColor: '#DaDaDa' }}></View>

                    <View style={{ width: widthSrc - 20, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 0 }}>
                        <Text style={{ fontSize: 14 }}>跑步等级</Text>
                        <View></View>
                        <Image style={{ width: 17, height: 17 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                    </View>
                    <View style={{ width: widthSrc, height: 1, backgroundColor: '#D2D2D2' }}></View>

                    <View style={{ width: widthSrc - 20, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 0 }}>
                        <Text style={{ fontSize: 14 }}>我的徽章</Text>
                        <View></View>
                        <Image style={{ width: 17, height: 17 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                    </View>
                    <View style={{ width: widthSrc, height: 10, backgroundColor: '#DaDaDa' }}></View>


                    <View style={{ width: widthSrc - 20, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 0 }}>
                        <Text style={{ fontSize: 14 }}>购物车</Text>
                        <View></View>
                        <Image style={{ width: 17, height: 17 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                    </View>
                    <View style={{ width: widthSrc, height: 1, backgroundColor: '#DaDaDa' }}></View>

                    <View style={{ width: widthSrc - 20, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 0 }}>
                        <Text style={{ fontSize: 14 }}>我的订单</Text>
                        <View></View>
                        <Image style={{ width: 17, height: 17 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                    </View>
                    <View style={{ width: widthSrc, height: 1, backgroundColor: '#D2D2D2' }}></View>

                    <View style={{ width: widthSrc - 20, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginRight: 0 }}>
                        <Text style={{ fontSize: 14 }}>优惠券</Text>
                        <View></View>
                        <Image style={{ width: 17, height: 17 }} resizeMode='contain' source={require('image!jumpto')}  ></Image>
                    </View>
                    <View style={{ width: widthSrc, height: 10, backgroundColor: '#DaDaDa' }}></View>
                </ScrollView>
            </View>
        );
    }
}

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
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadAvatar: {
        width: widthSrc,
        height: 300,
    }
});
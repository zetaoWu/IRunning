import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
    BackAndroid,
    StatusBar,
    Easing,
    TouchableWithoutFeedback,
    PermissionsAndroid,
    DeviceEventEmitter,
    TouchableHighlight,
} from 'react-native';

import AMapLocation from './AmapLocation';
import { toastShort } from '../utils/ToastUtil.js';
import AMapView from './AMap/AMapView.js';
import AMapLocationManager from './AMap/AMapLocationManager.js';

var widthSrc = Dimensions.get('window').width;
var heightSrc = Dimensions.get('window').height;
export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            hasPermission: 'Not Checked',
            showCallout: false,
            latitude: 41.1,
            longitude: 118.1,
        };
    }

    async componentWillMount() {
        try {
            const granted = await PermissionsAndroid.requestPermission(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    'title': '调用权限',
                    'message': '需要获取您的位置信息,是否允许？'
                }
            );
            if (granted) {
                toastShort("you can use location");
                DeviceEventEmitter.addListener("onLocationChangedAMAPLOCATION", (data) => { this.setState({ data: JSON.stringify(data) }); });
                AMapLocation.startLocation({
                    accuracy: 'HighAccuracy',
                    killProcess: true,
                    needDetail: true,
                });
            } else {
                toastShort("do't use loc∫ation");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        AMapLocation.stopLocation();
        DeviceEventEmitter.removeListener("onLocationChangedAMAPLOCATION");
    }
    // <Text style={{ fontSize: 15, marginTop: 24 }}>{this.state.data}</Text>
    render() {
        return (
            <View style={{ flex: 1, marginTop: 25,backgroundColor:'#ffffff'}}>
                <AMapView style={styles.container} compassEnabled={true}
                    defaultRegion={{ "latitude": this.state.latitude, "longitude": this.state.longitude, "latitudeDelta": 0.5, "longitudeDelta": 0.5 }}
                    region={{ "latitude": this.state.latitude, "longitude": this.state.longitude, "latitudeDelta": 0.5, "longitudeDelta": 0.5 }}
                    myLocationEnabled={true}
                    >
                    <AMapView.Annotation coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                        title="aaa" subtitle="bbbb" enabled={true} selected={true} canShowCallout={true}
                        onSelect={e => console.log(e)}>
                        <AMapView.Callout>
                            <View style={{ width: 100, height: 40, backgroundColor: '#ffffff' }}>
                                <Text>aaaaaabbbbb</Text>
                            </View>
                        </AMapView.Callout>
                    </AMapView.Annotation>
                </AMapView>

                <Text style={{flex:1,fontSize: 15, marginTop: 24 }}>{this.state.data}</Text>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
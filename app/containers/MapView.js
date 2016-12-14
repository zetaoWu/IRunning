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
} from 'react-native';

import AMapLocation from './AmapLocation';
import { toastShort } from '../utils/ToastUtil.js';
export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            hasPermission: 'Not Checked',
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
                toastShort("do't use location");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        AMapLocation.stopLocation();
        DeviceEventEmitter.removeListener("onLocationChangedAMAPLOCATION");
    }

    render() {
        return (
            <Text style={{ fontSize: 15, marginTop: 24 }}>{this.state.data}</Text>
        );
    };
}
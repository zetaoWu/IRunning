import {
  NativeAppEventEmitter,
  DeviceEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

const AMapLocationManager = NativeModules.AMapLocationManager;
const emitter = Platform.OS == 'ios' ? NativeAppEventEmitter : DeviceEventEmitter;

export default {
  /**
   * 开启实时定位
   *
   * @param background 是否在后台也定位
   * @param callback 位置更新的回调函数
   */
  startUpdatingLocation(background, callback) {
    AMapLocationManager.startUpdatingLocation(background);
    this.eventSubscription = emitter.addListener('AMapUpdateLocation', location => callback(location));
  },

  /**
   * 关闭实时定位
   */
  stopUpdatingLocation() {
    if (this.eventSubscription) {
      this.eventSubscription.remove();
    }
    AMapLocationManager.stopUpdatingLocation();
  },

  /**
   * 取得一次当前位置
   *
   * @param accuracy 定位精度 0 - 3km, 1 - 1km, 2 - 100m, 3 - 最佳
   * @param locationTimeout 定位超时
   * @param reGeocodeTimeout 解析位置超时
   *
   * @return Promise
   */
  requestCurrentLocation(accuracy, locationTimeout, reGeocodeTimeout) {
    return AMapLocationManager.requestCurrentLocation(accuracy, locationTimeout, reGeocodeTimeout);
  },
}
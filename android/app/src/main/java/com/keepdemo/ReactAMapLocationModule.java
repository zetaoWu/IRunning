package com.keepdemo;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ReactAMapLocationModule extends ReactContextBaseJavaModule implements AMapLocationListener {

    private final AMapLocationClient locationClient;

    public ReactAMapLocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        locationClient = new AMapLocationClient(reactContext);
        locationClient.setLocationListener(this);
    }

    @Override
    public String getName() {
        return "AMapLocationManager";
    }

    @ReactMethod
    public void startUpdatingLocation(boolean background) {
        if (locationClient.isStarted()) {
            locationClient.stopLocation();
        }
        AMapLocationClientOption option = new AMapLocationClientOption();
        option.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
        locationClient.setLocationOption(option);
        locationClient.startLocation();
    }

    @Override
    public void onLocationChanged(AMapLocation aMapLocation) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("AMapUpdateLocation", locationToMap(aMapLocation));
    }

    @ReactMethod
    public void stopUpdatingLocation() {
        if (locationClient.isStarted()) {
            locationClient.stopLocation();
        }
    }

    @ReactMethod
    public void requestCurrentLocation(final int accuracy, final int locationTimeout, final int reGeocodeTimeout, final Promise promise) {
        boolean originState = locationClient.isStarted();
        if (originState) {
            locationClient.stopLocation();
        }
        AMapLocationClientOption option = new AMapLocationClientOption();
        option.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
        locationClient.setLocationOption(option);
        locationClient.setLocationListener(new AMapLocationListener() {
            private int retryCount = 0;

            @Override
            public void onLocationChanged(AMapLocation aMapLocation) {
                if (aMapLocation == null && retryCount * 2 > locationTimeout) {
                    locationClient.stopLocation();
                    promise.reject("Timeout", "定位超时, 没有成功获取当前位置");
                } else if (aMapLocation == null && retryCount * 2 < locationTimeout) {
                    retryCount++;
                } else {
                    promise.resolve(locationToMap(aMapLocation));
                    locationClient.stopLocation();
                }
            }
        });
        locationClient.startLocation();
        if (originState) {
            locationClient.setLocationListener(this);
            locationClient.startLocation();
        }
    }

    private WritableMap locationToMap(AMapLocation location) {
        WritableMap map = Arguments.createMap();
        WritableMap geo = Arguments.createMap();
        map.putDouble("latitude", location.getLatitude());
        map.putDouble("longitude", location.getLongitude());
        map.putDouble("accuracy", location.getAccuracy());
        geo.putString("formattedAddress", location.getAddress());
        geo.putString("country", location.getCountry());
        geo.putString("province", location.getProvince());
        geo.putString("city", location.getCity());
        geo.putString("district", location.getDistrict());
        geo.putString("street", location.getStreet());
        geo.putString("number", location.getStreetNum());
        geo.putString("POIName", location.getPoiName());
        geo.putString("AOIName", location.getAoiName());
        geo.putString("citycode", location.getCityCode());
        geo.putString("adcode", location.getAdCode());
        map.putMap("reGeocode", geo);
        return map;
    }
}
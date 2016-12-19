package com.keepdemo;

import android.os.Bundle;
import android.view.View;
import com.amap.api.maps.AMap;
import com.amap.api.maps.AMapOptions;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

public class ReactAMapViewManager extends ViewGroupManager<ReactAMapView> {

    private static final String REACT_CLASS = "RCTAMapView";

    private List<ReactAMapView> listeners = new ArrayList<>();
    private Bundle savedInstanceState;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactAMapView createViewInstance(ThemedReactContext reactContext) {
        ReactAMapView mapView = new ReactAMapView(reactContext);

        mapView.onCreate(savedInstanceState);
        reactContext.addLifecycleEventListener(mapView);
        this.listeners.add(mapView);
        mapView.getMap().runOnDrawFrame();

        return mapView;
    }

    @Override
    public void onDropViewInstance(ReactAMapView view) {
        view.onDestroy();
        listeners.remove(view);
    }

    public void onCreate(Bundle savedInstanceState) {
        this.savedInstanceState = savedInstanceState;
        for (ReactAMapView listener : listeners) {
            listener.onCreate(savedInstanceState);
        }
    }

    public void onSaveInstanceState(Bundle outState) {
        for (ReactAMapView listener : listeners) {
            listener.onSaveInstanceState(outState);
        }
    }

    @ReactProp(name = "logoPosition")
    public void setLogoPosition(ReactAMapView view, @Nullable String position) {
        if (position == null) return;
        if (position.equalsIgnoreCase("center")) {
            view.getMap().getUiSettings().setLogoPosition(AMapOptions.LOGO_POSITION_BOTTOM_CENTER);
        } else if (position.equalsIgnoreCase("left")) {
            view.getMap().getUiSettings().setLogoPosition(AMapOptions.LOGO_POSITION_BOTTOM_LEFT);
        } else if (position.equalsIgnoreCase("right")) {
            view.getMap().getUiSettings().setLogoPosition(AMapOptions.LOGO_POSITION_BOTTOM_RIGHT);
        }
    }

    @ReactProp(name = "mapType")
    public void setMapType(ReactAMapView view, @Nullable String mapType) {
        if (mapType == null) return;
        if (mapType.equalsIgnoreCase("normal")) {
            view.getMap().setMapType(AMap.MAP_TYPE_NORMAL);
        } else if (mapType.equalsIgnoreCase("satellite")) {
            view.getMap().setMapType(AMap.MAP_TYPE_SATELLITE);
        } else if (mapType.equalsIgnoreCase("night")) {
            view.getMap().setMapType(AMap.MAP_TYPE_NIGHT);
        } else if (mapType.equalsIgnoreCase("navi")) {
            view.getMap().setMapType(AMap.MAP_TYPE_NAVI);
        }
    }

    @ReactProp(name = "myLocationEnabled")
    public void setMyLocationEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().setMyLocationEnabled(enabled);
    }

    @ReactProp(name = "myLocationType")
    public void setMyLocationType(ReactAMapView view, @Nullable String type) {
        if (type == null) return;
        if (type.equalsIgnoreCase("locate")) {
            view.getMap().setMyLocationType(AMap.LOCATION_TYPE_LOCATE);
        } else if (type.equalsIgnoreCase("follow")) {
            view.getMap().setMyLocationType(AMap.LOCATION_TYPE_MAP_FOLLOW);
        } else if (type.equalsIgnoreCase("rotate")) {
            view.getMap().setMyLocationType(AMap.LOCATION_TYPE_MAP_ROTATE);
        }
    }

    @ReactProp(name = "myLocationButtonEnabled")
    public void setMyLocationButtonEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setMyLocationButtonEnabled(enabled);
    }

    @ReactProp(name = "allGesturesEnabled")
    public void setAllGesturesEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setAllGesturesEnabled(enabled);
    }

    @ReactProp(name = "compassEnabled")
    public void setCompassEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setCompassEnabled(enabled);
    }

    @ReactProp(name = "indoorSwitchEnabled")
    public void setIndoorSwitchEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setIndoorSwitchEnabled(enabled);
    }

    @ReactProp(name = "rotateGesturesEnabled")
    public void setRotateGesturesEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setRotateGesturesEnabled(enabled);
    }

    @ReactProp(name = "scaleControlsEnabled")
    public void setScaleControlsEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setScaleControlsEnabled(enabled);
    }

    @ReactProp(name = "scrollGesturesEnabled")
    public void setScrollGesturesEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setScrollGesturesEnabled(enabled);
    }

    @ReactProp(name = "tiltGesturesEnabled")
    public void setTiltGesturesEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setTiltGesturesEnabled(enabled);
    }

    @ReactProp(name = "trafficEnabled")
    public void setTrafficEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().setTrafficEnabled(enabled);
    }

    @ReactProp(name = "zoomControlsEnabled")
    public void setZoomControlsEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setZoomControlsEnabled(enabled);
    }

    @ReactProp(name = "zoomGesturesEnabled")
    public void setZoomGesturesEnabled(ReactAMapView view, boolean enabled) {
        view.getMap().getUiSettings().setZoomGesturesEnabled(enabled);
    }

    @ReactProp(name = "defaultRegion")
    public void setDefaultRegion(ReactAMapView view, ReadableMap map) {
        if (map == null) return;
        view.setDefaultRegion(map.getDouble("latitude"),
                map.getDouble("longitude"),
                map.getDouble("latitudeDelta"),
                map.getDouble("longitudeDelta"));
    }

    @ReactProp(name = "region")
    public void setRegion(ReactAMapView view, ReadableMap map) {
        if (map == null) return;
        view.setRegion(map.getDouble("latitude"),
                map.getDouble("longitude"),
                map.getDouble("latitudeDelta"),
                map.getDouble("longitudeDelta"));
    }

    @Override
    public void addView(ReactAMapView parent, View child, int index) {
        parent.addFeature(child, index);
    }

    @Override
    public int getChildCount(ReactAMapView view) {
        return view.getFeatureCount();
    }

    @Override
    public View getChildAt(ReactAMapView view, int index) {
        return view.getFeatureAt(index);
    }

    @Override
    public void removeViewAt(ReactAMapView parent, int index) {
        parent.removeFeatureAt(index);
    }

    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                "onRegionChange", MapBuilder.of("registrationName", "onRegionChange"),
                "onMove", MapBuilder.of("registrationName", "onMove"),
                "onZoom", MapBuilder.of("registrationName", "onZoom"),
                "onUpdateLocation", MapBuilder.of("registrationName", "onUpdateLocation")
        );
    }
}
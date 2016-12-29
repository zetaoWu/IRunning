package com.keepdemo;

import android.graphics.Color;
import android.view.View;

import com.amap.api.maps.model.LatLng;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nullable;

public class ReactAMapAnnotationViewManager extends ViewGroupManager<ReactAMapAnnotationView> {

    private static final String REACT_CLASS = "RCTAMapAnnotationView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactAMapAnnotationView createViewInstance(ThemedReactContext reactContext) {
        return new ReactAMapAnnotationView(reactContext);
    }

    @ReactProp(name = "image")
    public void setImage(ReactAMapAnnotationView view, @Nullable String image) {
        view.setImage(image);
    }

    @ReactProp(name = "title")
    public void setTitle(ReactAMapAnnotationView view, @Nullable String title) {
        view.setTitle(title);
    }

    @ReactProp(name = "subtitle")
    public void setSubtitle(ReactAMapAnnotationView view, @Nullable String subtitle) {
        view.setSubtitle(subtitle);
    }

    @ReactProp(name = "pinColor", defaultInt = Color.RED, customType = "Color")
    public void setPinColor(ReactAMapAnnotationView view, int pinColor) {
        float[] hsv = new float[3];
        Color.colorToHSV(pinColor, hsv);
        view.setPinColor(pinColor);
    }

    @ReactProp(name = "canShowCallout")
    public void setCanShowCallout(ReactAMapAnnotationView view, boolean canShowCallout) {
        view.setCanShowCallout(canShowCallout);
    }

    @ReactProp(name = "enabled")
    public void setEnabled(ReactAMapAnnotationView view, boolean enabled) {
        view.setEnabled(enabled);
    }

    @ReactProp(name = "highlighted")
    public void setHighlighted(ReactAMapAnnotationView view, boolean highlighted) {
        view.setHighlighted(highlighted);
    }

    @ReactProp(name = "selected")
    public void setSelected(ReactAMapAnnotationView view, boolean selected) {
        view.setSelected(selected);
    }

    @ReactProp(name = "draggable")
    public void setDraggable(ReactAMapAnnotationView view, boolean draggable) {
        view.setDraggable(draggable);
    }

    @ReactProp(name = "coordinate")
    public void setCoordinate(ReactAMapAnnotationView view, ReadableMap map) {
        view.setPosition(new LatLng(map.getDouble("latitude"), map.getDouble("longitude")));
    }

    @Override
    public void addView(ReactAMapAnnotationView parent, View child, int index) {
        if (child instanceof ReactAMapCalloutView) {
            parent.setCalloutView((ReactAMapCalloutView) child);
        }
    }

    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                "onPress", MapBuilder.of("registrationName", "onPress")
        );
    }
}
package com.keepdemo;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class ReactAMapCalloutViewManager extends ViewGroupManager<ReactAMapCalloutView> {

    private static final String REACT_CLASS = "RCTAMapCalloutView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactAMapCalloutView createViewInstance(ThemedReactContext reactContext) {
        return new ReactAMapCalloutView(reactContext);
    }
}
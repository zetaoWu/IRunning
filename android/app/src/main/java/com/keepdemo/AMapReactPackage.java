package com.keepdemo;

import android.os.Bundle;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class AMapReactPackage implements ReactPackage {

    private ReactAMapViewManager manager = new ReactAMapViewManager();

    public void onCreate(Bundle savedInstanceState) {
        manager.onCreate(savedInstanceState);
    }

    public void onSaveInstanceState(Bundle outState) {
        manager.onSaveInstanceState(outState);
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new ReactAMapLocationModule(reactContext)
        );
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                this.manager,
                new ReactAMapAnnotationViewManager(),
                new ReactAMapCalloutViewManager()
        );
    }
}
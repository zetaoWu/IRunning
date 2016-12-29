package com.keepdemo;

import android.content.Context;

import com.facebook.react.views.view.ReactViewGroup;

public abstract class ReactAMapFeatureView<T> extends ReactViewGroup {
    public ReactAMapFeatureView(Context context) {
        super(context);
    }

    public abstract void addToAMapView(ReactAMapView view);

    public abstract void removeFromAMapView(ReactAMapView view);

    public abstract T getFeature();
}
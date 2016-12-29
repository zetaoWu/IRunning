package com.keepdemo;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.NinePatch;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.NinePatchDrawable;
import android.media.Image;
import android.util.Log;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.amap.api.maps.model.BitmapDescriptor;
import com.amap.api.maps.model.BitmapDescriptorFactory;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Marker;
import com.amap.api.maps.model.MarkerOptions;
import com.amap.api.maps.model.Text;

import java.io.InputStream;

public class ReactAMapAnnotationView extends ReactAMapFeatureView<Marker> {

    private MarkerOptions markerOptions;
    private Marker marker;

    private String image;
    private String title;
    private String subtitle;
    private float pinColor = 0.0f;
    private boolean canShowCallout;
    private float anchorX = 0.5f;
    private float anchorY = 1;
    private int calloutAnchorX = 0;
    private int calloutAnchorY = 0;
    private boolean enabled;
    private boolean highlighted;
    private boolean selected;
    private boolean draggable;
    private LatLng position;

    private ReactAMapCalloutView calloutView;

    private boolean hasCallout = false;
    private Context context;

    public ReactAMapAnnotationView(Context context) {
        super(context);
        this.context = context;
    }

    @Override
    public void addToAMapView(ReactAMapView view) {
        this.marker = view.getMap().addMarker(getMarkerOptions());
    }

    @Override
    public void removeFromAMapView(ReactAMapView view) {
        marker.remove();
    }

    @Override
    public Marker getFeature() {
        return marker;
    }

    public MarkerOptions getMarkerOptions() {
        if (markerOptions == null) {
            markerOptions = createMarkerOptions();
        }
        return markerOptions;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setTitle(String title) {
        this.title = title;
        if (marker != null) {
            marker.setTitle(title);
        }
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
        if (marker != null) {
            marker.setSnippet(subtitle);
        }
    }

    public void setPinColor(float pinColor) {
        this.pinColor = pinColor;
        if (marker != null) {
            marker.setIcon(getIcon(true));
        }
    }

    public void setCanShowCallout(boolean canShowCallout) {
        this.canShowCallout = canShowCallout;
    }

    public void setAnchor(float anchorX, float anchorY) {
        this.anchorX = anchorX;
        this.anchorY = anchorY;
        if (marker != null) {
            marker.setAnchor(anchorX, anchorY);
        }
    }

    public void setCalloutAnchorX(int calloutAnchorX, int calloutAnchorY) {
        this.calloutAnchorX = calloutAnchorX;
        this.calloutAnchorY = calloutAnchorY;
    }

    @Override
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setHighlighted(boolean highlighted) {
        this.highlighted = highlighted;
    }

    @Override
    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    public void setDraggable(boolean draggable) {
        this.draggable = draggable;
        if (marker != null) {
            marker.setDraggable(draggable);
        }
    }

    public void setPosition(LatLng position) {
        this.position = position;
        if (marker != null) {
            marker.setPosition(position);
        }
    }

    public void setCalloutView(ReactAMapCalloutView calloutView) {
        this.calloutView = calloutView;
    }

    private MarkerOptions createMarkerOptions() {
        MarkerOptions options = new MarkerOptions().position(position);
        options.anchor(anchorX, anchorY);
        options.setInfoWindowOffset(calloutAnchorX, calloutAnchorY);
//        options.title(title);
//        options.snippet(subtitle);
        options.draggable(draggable);
        options.icon(getIcon(true));
        return options;
    }

    public BitmapDescriptor getIcon(boolean isInfoWindowShown) {
        View marker = LayoutInflater.from(getContext()).inflate(R.layout.marker, null);
        LinearLayout info_window = (LinearLayout) marker.findViewById(R.id.info_window);
        TextView info_window_title = (TextView) marker.findViewById(R.id.info_window_title);
        info_window_title.setText(title);
        TextView info_window_subTitle = (TextView) marker.findViewById(R.id.info_window_subTitle);
        info_window_subTitle.setText(subtitle);
        ImageView icon = (ImageView) marker.findViewById(R.id.icon);
        try {
            Drawable drawable = NinePatchUtils.decodeDrawableFromAsset(getContext(), "infowindow_bg.9.png");
            InputStream is = BitmapDescriptorFactory.class.getResourceAsStream("/assets/" + "ORANGE.png");
            Bitmap bitmap = BitmapFactory.decodeStream(is);
            info_window.setBackground(drawable);
            icon.setImageBitmap(bitmap);
        } catch (Exception e) {
        }
        if (isInfoWindowShown) {
            info_window.setVisibility(View.VISIBLE);
        } else {
            info_window.setVisibility(View.INVISIBLE);
        }

        return BitmapDescriptorFactory.fromView(marker);

    }
}
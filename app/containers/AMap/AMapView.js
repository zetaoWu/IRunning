import React, { PropTypes } from 'react';
import ReactNative, {
  Animated,
  View,
  requireNativeComponent,
  NativeModules,
  Platform
} from 'react-native';
import AMapAnnotationView from './AMapAnnotationView';
import AMapCalloutView from './AMapCalloutView';

class AMapView extends React.Component {
  static propTypes = {
    logoPosition: PropTypes.oneOf(['center', 'left', 'right']),
    mapType: PropTypes.oneOf(['normal', 'satellite', 'night', 'navi']),
    myLocationEnabled: PropTypes.bool,
    myLocationType: PropTypes.oneOf(['locate', 'follow', 'rotate']),
    myLocationButtonEnabled: PropTypes.bool,
    allGesturesEnabled: PropTypes.bool,
    compassEnabled: PropTypes.bool,
    indoorSwitchEnabled: PropTypes.bool,
    rotateGesturesEnabled: PropTypes.bool,
    scaleControlsEnabled: PropTypes.bool,
    scrollGesturesEnabled: PropTypes.bool,
    trafficEnabled: PropTypes.bool,
    tiltGesturesEnabled: PropTypes.bool,
    zoomControlsEnabled: PropTypes.bool,
    zoomGesturesEnabled: PropTypes.bool,
    defaultRegion: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    }),
    region: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      latitudeDelta: PropTypes.number.isRequired,
      longitudeDelta: PropTypes.number.isRequired,
    }),
    onRegionChange: PropTypes.func,
    onMove: PropTypes.func,
    onZoom: PropTypes.func,
    onUpdateLocation: PropTypes.func,
    ...View.propTypes,
  };

  animateToRegion(region, duration) {
    this._runCommand('animateToRegion', [region, duration || 500]);
  }

  animateToCoordinate(latLng, duration) {
    this._runCommand('animateToCoordinate', [latLng, duration || 500]);
  }

  _getHandle() {
    return ReactNative.findNodeHandle(this.refs.mapview);
  }

  _runCommand(name, args) {
    if (Platform.OS === 'android') {
      NativeModules.UIManager.dispatchViewManagerCommand(
        this._getHandle(),
        NativeModules.UIManager.AMapView.Commands[name],
        args
      );
    } else if (Platform.OS === 'ios') {
      NativeModules.AMapViewManager[name].apply(
        NativeModules.AMapViewManager[name], [this._getHandle(), ...args]
      );
    }
  }

  _onRegionChange(event) {
    if (this.props.onRegionChange) {
      this.props.onRegionChange(event);
    }
  }

  _onMove(event) {
    if (this.props.onMove) {
      this.props.onMove(event);
    }
  }

  _onZoom(event) {
    if (this.props.onZoom) {
      this.props.onZoom(event);
    }
  }

  _onUpdateLocation(event) {
    if (this.props.onUpdateLocation) {
      this.props.onUpdateLocation(event);
    }
  }

  render() {
    return (
      <RCTAMapView 
        ref="mapview"
        {...this.props}
        onRegionChange={e => this._onRegionChange(e)}
        onMove={e => this._onMove(e)}
        onZoom={e => this._onZoom(e)}
        onUpdateLocation={e => this._onUpdateLocation(e)}/>
    );
  }
}

const RCTAMapView = requireNativeComponent('RCTAMapView', AMapView);

AMapView.Annotation = AMapAnnotationView;
AMapView.Callout = AMapCalloutView;

AMapView.Animated = Animated.createAnimatedComponent(AMapView);

export default AMapView;
import React, { PropTypes } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  requireNativeComponent,
  NativeModules,
  Platform,
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

class AMapAnnotationView extends React.Component {

  static propTypes = {
    image: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    pinColor: PropTypes.string,
    canShowCallout: PropTypes.bool,
    centerOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    calloutOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    enabled: PropTypes.bool,
    highlighted: PropTypes.bool,
    selected: PropTypes.bool,
    draggable: PropTypes.bool,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    onSelect: PropTypes.func,
    ...View.propTypes,
  };

  _onSelect(event) {
    if (this.props.onSelect) {
      this.props.onSelect(event);
    }
  }

  render() {
    let image = undefined;
    if (this.props.image) {
      image = resolveAssetSource(this.props.image) || {};
      image = image.uri;
    }
    if (Platform.OS === 'ios') {
      return (
        <RCTAMapAnnotationView {...this.props}
          image={image}
          onSelect={e => this._onSelect(e)}
          style={[styles.marker, this.props.style]} />
      );
    } else {
      return (
        <RCTAMapAnnotationView {...this.props}
          image={image}
          onPress={e => this._onSelect(e)}
          style={[styles.marker, this.props.style]} />
      );
    }
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

const RCTAMapAnnotationView = requireNativeComponent('RCTAMapAnnotationView', AMapAnnotationView);

AMapAnnotationView.Animated = Animated.createAnimatedComponent(AMapAnnotationView);

export default AMapAnnotationView;
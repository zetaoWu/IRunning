import React, { PropTypes } from 'react';
import { Animated, View, requireNativeComponent, NativeModules, Platform } from 'react-native';

class AMapCalloutView extends React.Component {

  static propTypes = {
    ...View.propTypes,
  };

  render() {
    return <RCTAMapCalloutView {...this.props} />;
  }
}

const RCTAMapCalloutView = requireNativeComponent('RCTAMapCalloutView', AMapCalloutView);

AMapCalloutView.Animated = Animated.createAnimatedComponent(AMapCalloutView);

export default AMapCalloutView;
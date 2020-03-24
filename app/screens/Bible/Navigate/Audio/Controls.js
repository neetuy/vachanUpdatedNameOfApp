import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const Controls = ({
  styles,
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    <View style={{width: 20}} />
    <TouchableOpacity onPress={onBack}>
      <Icon styles={styles.iconStyle} name="fast-rewind"  size={24} />
    </TouchableOpacity>
    <View style={{width: 10}} />
    {!paused ?
      <TouchableOpacity onPress={onPressPause}>
        <View style={styles.playButton}>
        <Icon  styles={styles.iconStyle} name="pause"size={24}  style={[forwardDisabled && {opacity: 0.3}]}/>
        </View>
      </TouchableOpacity> :
      <TouchableOpacity onPress={onPressPlay}>
        <View style={styles.playButton}>
        <Icon  styles={styles.iconStyle}   name="play-arrow" size={30}/>
        </View>
      </TouchableOpacity>
    }
    <View style={{width: 10}} />
    <TouchableOpacity onPress={onForward}
      disabled={forwardDisabled}>
      <Icon  styles={styles.iconStyle} name="fast-forward" size={24}  />
    </TouchableOpacity>
    <View style={{width: 20}} />
    
  </View>
);

export default Controls;


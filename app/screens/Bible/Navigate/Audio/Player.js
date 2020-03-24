import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ToastAndroid
} from 'react-native';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';
import {connect} from 'react-redux'
import APIFetch from '../../../../utils/APIFetch'
import {fetchAudioUrl} from '../../../../store/action/'
import {styles} from './styles'

class Player extends Component {
  constructor(props) {
    super(props);
    console.log("PLAYER ",props)
    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      audioFile:null,
      repeatOn: false,
      shuffleOn: false,
      // visibleAudio:false
    };
    this.styles = styles(this.props.colorFile, this.props.sizeFile)
  }

  setDuration(data) {
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    this.refs.audioElement.seek(this.state.currentPosition-5);
    // if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
    //   this.refs.audioElement && this.refs.audioElement.seek( 0)
    //   this.setState({ isChanging: true });
    //   setTimeout(() => this.setState({
    //     currentPosition: 0,
    //     paused: false,
    //     totalLength: 1,
    //     isChanging: false,
    //     selectedTrack: this.state.selectedTrack - 1,
    //   }), 0);
    // } else {
    //   this.refs.audioElement.seek(0);
    //   this.setState({
    //     currentPosition: 0,
    //   });
    // }
  }

  onForward() {
    
    this.refs.audioElement.seek(this.state.currentPosition+5);

    /* if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0.5,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    } */
  }
componentDidMount(){
  this.props.fetchAudioUrl({
    languageCode:this.props.languageCode,
    versionCode:this.props.versionCode,
    bookId:this.props.bookId,
    chapter:this.props.chapter
  })
}
  render() {
    console.log("PORP   URL .....",this.props.url)
    const track = this.state.audioFile;
    return (
      <View style={this.styles.container}>
        {/* <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition} /> */}
          <Controls
          styles={this.styles}
          onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          // shuffleOn={this.state.shuffleOn}
          // forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.setState({paused: false})}
          onPressPause={() => this.setState({paused: true})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        <Video source={{uri: this.props.audioURL}} // Can be a URL or a local file.
          ref="audioElement"
          paused={this.state.paused}               // Pauses playback entirely.
          resizeMode="cover"           // Fill the whole screen at aspect ratio.
          repeat={false}                // Repeat forever.
          onLoadStart={this.loadStart} // Callback when video starts to load
          onLoad={this.setDuration.bind(this)}    // Callback when video loads
          onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
          onEnd={this.onEnd}           // Callback when playback finishes
          onError={this.videoError}    // Callback when video cannot be loaded
          style={this.styles.audioElement} />
      </View>
    );
  }
}



const mapStateToProps = state =>{
  return{
    audioURL:state.audioFetch.url,
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    fetchAudioUrl:(payload)=>dispatch(fetchAudioUrl(payload)),
  }
}
export  default connect(mapStateToProps,mapDispatchToProps)(Player)



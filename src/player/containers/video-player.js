import React, {Component} from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from '../components/video';
import Title from '../components/title';
import PlayPause from '../components/play-pause';
import Timer from '../components/timer';
import Controls from '../components/video-player-controls'
import ProgressBar from '../components/progess-bar';
import Spinner from '../components/spinner';
import Volume from '../components/volume'
import FullScreen from '../components/fullscreen';
import { connect } from 'react-redux';

function leftPad(number) {
   const pad = '00';
   return pad.substring(0, pad.length - number.length) + number;
}

function formattedTime(secs){
   const minutes = parseInt(secs / 60, 10);
   const seconds = parseInt(secs % 60, 10);
   return `${ leftPad(minutes) }:${ leftPad(seconds.toString()) }`
}

class VideoPlayer extends Component{
   state={
      pause: true,
      duration: 0,
      currentTime: 0,
      loading: false,
      handleVolumeChange: 1,
   }
   togglePlay = (event)=>{
      this.setState({
         pause: !this.state.pause,
      })
   }
   componentDidMount(){
      this.setState({
         pause: (!this.props.autoplay)
      })
   }

   //  ----------  Timer  -----------
   handleLoadedMetadata = event =>{
      this.video = event.target;
      this.setState({
         duration: this.video.duration
      }) 
   }
   handleTimeUpdate = event =>{
      // console.log(this.video.currentTime);
      this.setState({
         currentTime: this.video.currentTime,
      })
   }
   //  ----------  End Timer  -----------


   //  ----------  Formate Time  -----------
   leftPad(number) {
      const pad = '00';
      return pad.substring(0, pad.length - number.length) + number;
   }

   formattedTime(secs){
      const minutes = parseInt(secs / 60, 10);
      const seconds = parseInt(secs % 60, 10);
      return `${ leftPad(minutes) }:${ leftPad(seconds.toString()) }`
   }
   //  ----------  End Formate Time  -----------


   //  ----------  Progress Bar  -----------
   handleProgressChange = event =>{
      // event.target.value
      this.video.currentTime = event.target.value;
   }
   handleSeeking = event =>{
      this.setState({
         loading: true,
      })
   }
   handleSeeked = event =>{
      this.setState({
         loading: false,
      })
   }
   //  ----------  End Progress Bar  -----------


   //  ----------  Volume  ----------- 
   handleVolumeChange = event =>{
      this.video.volume = event.target.value
   }
   Mute = event => {
      if(this.video.volume > 0){
         this.video.volume = 0;
      }else{
         this.video.volume = 1;
      }
   }

   //  ----------  End Volume  ----------- 
   
   //  ----------  FullScreen  ----------- 
   handleFullScreenClick = event =>{
      if (!document.webkitIsFullScreen) {
         this.player.webkitRequestFullscreen();
      } else {
         document.webkitExitFullscreen();
      }
   } 

   setRef = element =>{
      this.player = element
   }

   
   render(){
      return(
         <VideoPlayerLayout setRef={this.setRef}>
            <Title title={this.props.media.get('title')} />
            <Controls>
               <PlayPause pause={this.state.pause} handleClick={this.togglePlay}/>
               <Timer duration={formattedTime(this.state.duration)} currentTime={formattedTime(this.state.currentTime)}/>
               <ProgressBar duration={this.state.duration} value={this.state.currentTime} handleProgressChange={this.handleProgressChange}/>
               <Volume handleVolumeChange={this.handleVolumeChange} mute={this.Mute}/>
               <FullScreen handleFullScreenClick={this.handleFullScreenClick}/>
            </Controls>
            <Spinner active={this.state.loading}/>
            <Video 
            pause={this.state.pause} 
            autoplay={this.props.autoplay} 
            handleLoadedMetadata={this.handleLoadedMetadata}
            handleTimeUpdate={this.handleTimeUpdate}
            handleSeeking={this.handleSeeking}
            handleSeeked={this.handleSeeked}
            src={this.props.media.get('src')}/>
         </VideoPlayerLayout>
      )
   }
}

function mpaStateToProps(state, props){
   return{
      media: state.getIn(['data', 'entities', 'media', props.id])
   }
}

export default connect(mpaStateToProps) (VideoPlayer);
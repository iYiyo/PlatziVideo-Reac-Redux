import React, {Component} from 'react';
import MediaContainer from '../containers/media';
import './playlist.css';

//componente funcional
function PlayList (props) {
   console.log(props.data)
   return (
      <div className="Playlist">
         {
            props.playlist.map( (mediaId)=>{
               return <MediaContainer OpenModal={props.handleOpenModal} key={mediaId} id={mediaId}/>
            })
         }
      </div>
   )
}

//Componente complteo
/*
class PlayList extends Component {
   render(){
      const playList = this.props.data.categories[0].playlist
      console.log(this.props.data)
      return (
         <div className="Playlist">
            {
               playList.map( (item)=>{
                  return <Media key={item.id} {...item}/>
               })
            }
         </div>
      )
   }
}
*/

export default PlayList;
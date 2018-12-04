import React, {PureComponent} from 'react';
import PropTypes from  'prop-types';
import './media.css';

//Podemos hacer tres tipos de componentes
//Funcional
//Puro
//Normla o de estado es el mas clasico

class Media extends PureComponent{

  handleClick  = (event)=>{
   // console.log(this.props.title);
   // this.setState({
   //    author: 'Ricardo Celis'
   // })
   this.props.openModal(this.props.id)
}

   render(){
      const styles = {
         container:{
            //Podemos declarar los estilos con comillas o ocn camelCase para los px no es necesario poner para otro tipo de media hay que utilizar comillas
            // fontSize: 21,
            // "background-color": "cyan",
            color: '#44546b',
            cursor: 'pointer',
            width: 260,
            border: '1px solid red',
         }
      }
      return (
         <div className="Media" onClick={this.handleClick}>
            <div className="Media-cover">
               <img className="Media-image" src={this.props.cover} alt="" width={260} height={160}/>
               <h3 className="Media-title">{this.props.title}</h3>
               <p className="Media-author">{this.props.author}</p>
            </div>
         </div>
      )
   }
}

Media.propTypes = {
   image: PropTypes.string,
   title: PropTypes.string.isRequired,
   author: PropTypes.string,
   type: PropTypes.oneOf(['video', 'audio'])
}

export default Media;
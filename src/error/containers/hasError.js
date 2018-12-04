import React, { Component } from 'react';
import RegularError from '../components/regular-error';

class HasError extends Component {
   state = {
      hasError: false,
   }
   componentDidCatch(error, info){
      this.setState({
         hasError: true,
      })
      //envia este error a un servicio como Sentry 
   }
   render(){
      if(this.state.hasError){
         return (
         <RegularError />
         )
      }
      return this.props.children
   }
}

export default HasError;
/**  Entrie Point  **/
import React from 'react'; //sirve para crear nosutros blocques o legos de la app
import { render } from 'react-dom'//sirve par poner mis legos en algun lugar osea renderizarlos en el navegador



//Components
import Home from '../pages/container/home'

// --------------  REDUX ------------------
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';//Es un componente llamado height oreder component 
import reducer from '../reducers/index';
import { Map as map} from 'immutable';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const store = createStore(
   reducer,
   map(),
   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   composeWithDevTools(
      applyMiddleware(logger, thunk)
   )
)


// --------------  REDUX ------------------



const home = document.getElementById('home-container');

// ReactDOM.remder(que voy a renderizar, donde lo hare)
// ReactDOM.render(<PlayList data={data}/>, home)
// render(<Home data={data}/>, home);

render(
<Provider store={store}>
   <Home/>
</Provider>, home)


/* ---------LOGGER CREADO -------
function logger({getState, dispatch}){
   return (next)=>{
      return (action)=>{
         console.log('este es mi viejo estado', getState().toJS())
         console.log('vamos a enviar está acción', action);
         const value = next(action)
         console.log('este es mi nuevo estado', getState().toJS())
         return value
      }
   }
}

// -------------- ECMAScript 6 -------------------
const logger = ({getState, dispatch}) => next => action => {
   console.log('este es mi viejo estado', getState().toJS())
   console.log('vamos a enviar está acción', action);
   const value = next(action)
   console.log('este es mi nuevo estado', getState().toJS())
   return value
}
*/


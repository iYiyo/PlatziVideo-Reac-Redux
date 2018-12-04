import { fromJS } from 'immutable';
import dataSchema from '../schemas/index';
import { SEARCH_ENTITIES } from '../actions-types/index'
console.log(dataSchema);

const initialState = fromJS({
    entities: dataSchema.entities,
    categories: dataSchema.result.categories,
    search: '',
 })

function data(state = initialState, action) {
   switch (action.type){
      case SEARCH_ENTITIES:{
          /* 
         let results = []
         if(action.payload.query){
            state.data.categories.map((item)=>{
                return  item.playlist.filter((item)=>{
                return item.author.includes(action.payload.query) && results.push(item) 
                })
            })
         }
         return {
             ...state,
             search: results,
         };
         */
        return state.set('search', action.payload.query)
      }
      default:
         return state;
   }
}

export default data;
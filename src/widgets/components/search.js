import React from 'react';
import './search.css'

// function Search (props){
//    return(
//       <form action=""></form>
//    )
// }

const Search = (props) => (
   <form className="Search" onSubmit={props.handleSubmit}>
      <input ref={props.setRef} name="search" placeholder="Busca tu video favorito" type="text" className="Search-input"/>
   </form>
)

export default Search;

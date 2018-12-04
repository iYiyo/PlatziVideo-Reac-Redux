import React, {Component} from 'react';
import HomeLayout from '../components/home-layout';
import Categories from '../../categories/components/categories';
import Related from '../components/related'
import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';
import HasError from '../../error/containers/hasError';
import VideoPlayer from '../../player/containers/video-player';
//Redux
import { connect } from 'react-redux';
import { List as list } from 'immutable';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/index';

class Home extends Component {
   handleOpenModal = (id) => {
      this.props.actions.openModal(id)
      // this.props.dispatch({
      //    type: 'OPEN_MODAL',
      //    payload:{
      //       mediaId: id,
      //    }
      // })
   }

   handleCloseModal = (event) => {
      this.props.actions.closeModal()
      // this.props.dispatch({
      //    type: 'CLOSE_MODAL'  
      // })
   }

   render(){
      return (
         <HasError>
            <HomeLayout>
               <Related/>
               <Categories handleOpenModal={this.handleOpenModal} categories={this.props.categories} search={this.props.search}/>
               {
                  this.props.modal.get('visibility') && 
                  <ModalContainer>
                     <Modal handleClick={this.handleCloseModal}>
                        <VideoPlayer 
                        autoplay 
                        id={this.props.modal.get('mediaId')}
                        // src={this.state.media.src} title={this.state.media.title}
                        />
                     </Modal>
                  </ModalContainer>
               }
            </HomeLayout>
         </HasError>
      )
   }
}

function mapStateToProps(state, props) {
   const categories = state.getIn(['data', 'categories']).map((categoryId)=>{
      return state.getIn(['data', 'entities', 'categories', categoryId])
   })

   let searchResult = list()//metodo de immutable
   const search = state.get('data').get('search');

   if (search) {
      const mediaList = state.getIn(['data', 'entities', 'media']);
      searchResult = mediaList.filter((item)=>{
         if (item.get('author').toLowerCase().includes(search.toLowerCase()) || 
         item.get('title').toLowerCase().includes(search.toLowerCase()) ) {
            return true;
         }
      }).toList()
   }
   return {
      categories: categories,
      search: searchResult,
      modal: state.get('modal'),
   }
}

function mapDsipatchToProps(dispatch) {
   return {
      // actions: bindActionCreators(acciones, dispatch)
      actions: bindActionCreators(actions, dispatch)
   }
}

export default connect(mapStateToProps, mapDsipatchToProps)(Home);
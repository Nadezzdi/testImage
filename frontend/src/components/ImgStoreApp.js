import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as ImgStoreAppActions from '../actions/action';
import BaseList from './BaseList'
import BaseImages from './BaseImages'
import ImageEditor from './ImageEditor'


class ImgStoreApp extends Component {

  switchOnSelectedPage(param){
    switch (param.page) {
      case 1:
         return (
          <div>
            <h2>Bases</h2><hr/>
            <BaseList/>
          </div>
          );
      case 2:
        return (
          <div>
            <BaseImages/>
          </div>
        );
      case 3:
        return (
          <div>
            <ImageEditor/>
          </div>
          );
      default:
        return (<div>Unexpected page</div>);
   }
  }

  render() {
    const {page, selectPage} = this.props;
    return(
          <div className="container">
            <h1>
              {(page>2) ?
                (<button
                  type="button"
                  className="btn btn-danger mr-1"
                  disabled={(page==1)}
                  onClick={() => {selectPage(1)}}>
                    <FontAwesomeIcon icon="home" />
                </button>)
                :
                (null)
              }
              {(page == 1) ?
                (null)
                :
                (<button
                  type="button"
                  className="btn btn-danger mr-1"
                  disabled={(page==1)}
                  onClick={() => {selectPage(page-1)}}>
                    <FontAwesomeIcon icon="chevron-left" />
                </button>)
              }
              My Image Store App</h1>
              <hr/>
              {this.switchOnSelectedPage({page})}
          </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    page: state.main.page,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(ImgStoreAppActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(ImgStoreApp)

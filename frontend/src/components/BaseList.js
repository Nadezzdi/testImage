import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as baseListActions from '../actions/baseAction.js';
import {Spinner} from './Utility.js'


class BaseList extends Component {

  constructor(props){
    super(props);
    this.state = {
      filter : ""
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch() {
    console.log("on change search");
    this.setState({filter: event.target.value.toLowerCase()})
  }

  render() {
    const {bases, basesIsLoading, basesHasError, clickBase} = this.props;
    if (basesIsLoading)
      return (
        <Spinner/>
        )
    if (basesHasError)
      return (<div>Error</div>)
    else
      return (
        <div className="container base-list">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
             <form>
              <fieldset className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Search by folder name" onChange={this.onChangeSearch}/>
              </fieldset>
            </form>
            <ul className="list-group base-list">
            {bases.filter((base) => base.folder.toLowerCase().search( this.state.filter) !== -1)
              .map((base, index) => (
              <div key={index} onClick={() => {clickBase(base)}}>
                <li className="list-group-item"><FontAwesomeIcon icon="folder"/> {base.folder}</li>
              </div>
            ))}
            </ul>
          </div>
        </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    bases: state.main.bases,
    basesHasError: state.main.basesHasError,
    basesIsLoading: state.main.basesIsLoading,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(baseListActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(BaseList)

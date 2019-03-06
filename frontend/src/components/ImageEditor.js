import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ImageView from './ImageView';
import ImageEditorControlPanel from './ImageEditorControlPanel';
import {Spinner} from './Utility'


class ImageEditor extends Component {

  constructor(props){
    super(props);
    this.state ={ hideHelp: true}
  }

  handleShowInfo() {
    this.setState ({hideHelp: !this.state.hideHelp})
  }

  render() {
    const {selectedBase, imageDetailsIsLoading, imageDetailsHasError, imageDetailsSourcePath} = this.props;
    var imageFullSourcePath = "media/" + selectedBase.folder +"/" +  imageDetailsSourcePath;
    if (imageDetailsIsLoading) {
      return (<Spinner/>)
    }
    else {
      if (imageDetailsHasError || !imageDetailsSourcePath) {
        console.log("error load image");
        return (<div>Error loading image details</div>)
      }
      else
        return (
          <div className="container">
            <h2>Image Editor {imageDetailsSourcePath} <FontAwesomeIcon icon="info-circle" onClick={() => this.handleShowInfo()}/>
            </h2>
            <hr/>
            <p hidden={this.state.hideHelp} ref={this.helpRef}>
              <b>To add new rect</b> fill New Rect properties, after that you will see dashed legend on the image. Then click on the plus button to add it.<br/> 
              <b>To remove rect</b> click on the trash icon on the item in Existing Rects List.<br/>
              <b>To save changes</b> click on the save button.
            </p>
            <div className="row border-between fill">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <ImageView imageSource = {imageFullSourcePath}/>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <ImageEditorControlPanel/>
              </div>
            </div>
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return {
    selectedBase: state.main.selectedBase,
    imageDetailsIsLoading : state.editor.imageDetailsIsLoading,
    imageDetailsHasError : state.editor.imageDetailsHasError,
    imageDetailsSourcePath: state.editor.source_path,
  }
}

export default connect(mapStateToProps)(ImageEditor)

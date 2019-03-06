import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as baseImagesActions from '../actions/imagesAction.js';
import {Spinner} from './Utility.js'

class BaseImages extends Component {


  getImageLink(baseFolder, imageName){
    return 'media/' + baseFolder + "/" + imageName;
  }

  /* image preview */
  renderImageContent(image) {
    const {selectedBase, clickImage} = this.props;
    return (
      <div onClick={() => clickImage(image.id)}>
        <img className="imagePreview-img" src={this.getImageLink(selectedBase.folder, image.source_path)} style={{"width" : "100%"}}/>
      </div>
    )
  }

  render() {
    const {selectedBase, imagesIsLoading, imagesHasError, images} = this.props;
    if (imagesIsLoading) {
      return (<Spinner/>)
    }
    else {
      if (imagesHasError)
        return (<div>Error loading images</div>)
      else
        return (
          <div className="container">
            <h2>Images in "{selectedBase.folder}"</h2><hr/>
            <div className="container">
              <div className="row">
                {images.map((image, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6 imagePreview" key={index}>
                      {this.renderImageContent(image)}
                    </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return {
    /*
    selectedBase: state.main.selectedBase,
    imagesIsLoading : state.main.imagesIsLoading,
    imagesHasError : state.main.imagesHasError,
    images: state.main.selectedBaseImages,
    */
    selectedBase: state.main.selectedBase,
    imagesIsLoading : state.images.imagesIsLoading,
    imagesHasError : state.images.imagesHasError,
    images: state.images.selectedBaseImages,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(baseImagesActions, dispatch);
}


export default connect(mapStateToProps, mapActionCreatorsToProps)(BaseImages)

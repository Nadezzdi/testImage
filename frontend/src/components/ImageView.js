import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';

import * as ImageViewActions from '../actions/editorAction.js';


class ImageView extends Component {

  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
    this.drawRect = this.drawRect.bind(this);
  }

  drawRect(context, rect, lineWidth, borderColor="white", dashed=false) {
    //draw border
    if (dashed)
      context.setLineDash([10]);
    else
      context.setLineDash([]);
    context.strokeStyle = borderColor;
    context.lineWidth = lineWidth * 5;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.strokeStyle = rect.color || "black";
    context.lineWidth = lineWidth;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  /*load image and add saved, new and tmp rects*/
  drawImage() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    const {rects, tmpRect, activeRectIndex} = this.props
    var drawRect = this.drawRect;
    var imageObj = new Image();
    imageObj.onload = function(){
      context.canvas.width = imageObj.width;
      context.canvas.height = imageObj.height;
      const lineWidth = imageObj.width / 300;
      context.lineWidth = lineWidth;
      context.drawImage(imageObj, 0, 0,imageObj.width,imageObj.height)
      var activeRect;
      rects.forEach( (rect, index) => {
        if (! rect.deleted) {
          if (index === activeRectIndex){
            activeRect = rect; //save to draw it later on the top
            return;
          }
          drawRect(context, rect, lineWidth);
        }
      })
      if (tmpRect !== undefined) {
        drawRect(context, tmpRect, lineWidth, activeRectIndex >= 0 ? "white" : "yellow", true);
      }
      if (activeRect !== undefined) {
        drawRect(context, activeRect, lineWidth, "yellow", false);
      }
    };
    imageObj.src = this.props.imageSource;
  }

  componentDidMount() {
    this.drawImage();
  }

  componentDidUpdate() {
    this.drawImage();
  }

  render() {
    const {rects, tmpRect} = this.props;
    return (
      <div className="image-view">
        <canvas id="imageEditorCanvas" ref={this.canvasRef}></canvas>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rects: state.editor.rects,
    tmpRect: state.editor.tmpRect,
    activeRectIndex: state.editor.activeRectIndex,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(ImageViewActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(ImageView)

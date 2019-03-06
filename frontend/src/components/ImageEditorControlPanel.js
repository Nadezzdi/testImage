import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as EditorControlPanelActions from '../actions/editorAction.js';


class ControlPanelAddNew extends Component {


  /*to show current new temporary dashed rect when required  fields are set*/
  handleChangeForm(evt) {
    const {tmpRect, updateTmpRect} = this.props;
    if (evt.target.type === 'number') {
      updateTmpRect({
        ...tmpRect,
        [evt.target.name]:  parseInt(evt.target.value) || 0
      });
    }
  }

  render() {
    return (
      <div className="editor-control-panel add-rect">
        <form className="form-inline">
          <div className="form-group col-lg-12 col-md-12 new-rect-form-group">
            <label className="col-lg-5 col-md-7">width </label>
            <input type="text" className="form-control form-control col-lg-7 col-md-5 new-rect-input" name="width" type="number" min="0" onChange={(evt) => this.handleChangeForm(evt)} defaultValue='0'/>
          </div>
          <div className="form-group col-lg-12 col-md-12 new-rect-form-group">
            <label className="col-lg-5 col-md-7">hidth </label>
            <input type="text" className="form-control form-control col-lg-7 col-md-5 new-rect-input" name="height" type="number" min="0"onChange={(evt) => this.handleChangeForm(evt)} defaultValue='0'/>
          </div>
          <div className="form-group col-lg-12 col-md-12 new-rect-form-group">
            <label className="col-lg-5 col-md-7">offsetX </label>
            <input type="text" className="form-control form-control col-lg-7 col-md-5 new-rect-input" name="x" type="number" onChange={(evt) => this.handleChangeForm(evt)} defaultValue='0'/>
          </div>
          <div className="form-group col-lg-12 col-md-12 new-rect-form-group">
            <label className="col-lg-5 col-md-7">offsetY </label>
            <input type="text" className="form-control form-control col-lg-7 col-md-5 new-rect-input" name="y" type="number" onChange={(evt) => this.handleChangeForm(evt)} defaultValue='0'/>
          </div>
        </form>
      </div>
    )
  }
}


class ControlPanelList extends Component {
  
  renderListItem(rect, index) {
    const {activeRectIndex, removeRect, restoreRect, setActiveRect} = this.props;
    if (rect.deleted) {
      return (
        <li
          className='list-group-item rect-item deleted-rect'
          key={index}
          disabled={true} >
          <FontAwesomeIcon 
            icon="trash-restore" 
            pull="right" 
            title="click to restore"
            onClick={() => restoreRect(index)}/>
            {index}: {rect.width}x{rect.height} <i>{!rect.origin ? "(new)" : ""} (del)</i>
        </li>
        )
    }
    else {
      return (
        <li
          className={(activeRectIndex === index) ? 'list-group-item rect-item active' : 'list-group-item rect-item'}
          key={index}
          onMouseEnter ={() => setActiveRect(index)}
          onMouseLeave ={() => setActiveRect(-1)}>
          <FontAwesomeIcon 
            icon="trash" 
            pull="right" 
            title="click to remove" 
            onClick={() => removeRect(index)}/>
          {index}: {rect.width}x{rect.height} {!rect.origin ? "(new)" : ""}
        </li>
    )}
  }
  render() {
    const {rects} = this.props;
    return (
      <div className="remove-rect">
        <ul className="list-group remove-rect-list">
          {rects.map((rect, index) =>
          <div key={index} >
            {this.renderListItem(rect, index)}
          </div>
           )}
        </ul>
      </div>
    )
  }
}


class ImageEditorControlPanel extends Component {

  isValidRect(rect) {
    return (rect.height && rect.width)
  }

  render() {
    const {selectedImageId, rects, activeRectIndex, tmpRect, haveChanges, updateTmpRect, addTmpRect, removeRect, restoreRect, saveRects, setActiveRect} = this.props;
    return (
      <div className="editor-container">
        <div className="row border-between fill">
          <div className="col-lg-6 col-md-6 col-sm-5 col-xs-12 fill">
            <h6>
              <button
               className="btn btn-primary "
               data-toggle="tooltip"
               data-placement="top"
               title="Save rects to db"
               onClick = {() => saveRects(selectedImageId, rects)}
               disabled={!haveChanges}>
                 <FontAwesomeIcon icon="save"/>
              </button>
               Existing Rects ({rects.filter((rect) => !rect.deleted).length})
            </h6>
            <ControlPanelList rects={rects} activeRectIndex={activeRectIndex} removeRect={removeRect} restoreRect={restoreRect} setActiveRect={setActiveRect}/>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-7 col-xs-12 ">
            <h6>
              <button
                className="btn btn-primary"
                data-toggle="tooltip"
                data-placement="top"
                title="Add new rect"
                onClick = {() => addTmpRect()}
                disabled={!this.isValidRect(tmpRect)}>
                  <FontAwesomeIcon icon="plus-square"/>
                </button>
                 New Rect properties:
             </h6>
            <ControlPanelAddNew updateTmpRect={updateTmpRect} addTmpRect={addTmpRect} tmpRect={tmpRect}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeRectIndex: state.editor.activeRectIndex,
    tmpRect: state.editor.tmpRect,
    haveChanges: state.editor.haveChanges,
    rects: state.editor.rects,
    selectedImageId: state.images.selectedImageId,
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(EditorControlPanelActions, dispatch);
}


export default connect(mapStateToProps, mapActionCreatorsToProps)(ImageEditorControlPanel)

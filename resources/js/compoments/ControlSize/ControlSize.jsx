import React, { Component } from 'react';

class ControlSize extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="input-group" >
        <div className="input-group-btn">
          <button id="down" className="btn btn-default" onClick={this.props.down} disabled={this.props.disabled ? 'disabled' : ''}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
        </div>
        <input disabled={this.props.disabled ? 'disabled' : ''} type="text" id="myNumber" onBlur={this.props.onTodoBlur} onChange={this.props.onTodoChange} className="form-control input-number"
          value={this.props.value} />
        <div className="input-group-btn">
          <button id="up" className="btn btn-default" onClick={this.props.up} disabled={this.props.disabled ? 'disabled' : ''}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          <button type="button" className="btn btn-danger" onClick={this.props.delete} disabled={this.props.disabled ? 'disabled' : ''}>Delete</button>
        </div>
      </div>
    );
  }
}

export default ControlSize;

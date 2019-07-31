import React, { Component } from 'react';

class FormError extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className= {this.props.isHidden ? 'hidden' : 'error'} >
        MAX = 100
      </div>
    );
  }

}

export default FormError;

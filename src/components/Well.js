/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import './Well.css';

export default class Well extends React.Component {

  render() {
    return (
      <div className="well">
        {this.props.children}
      </div>
    )
  }
}
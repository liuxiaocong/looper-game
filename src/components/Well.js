/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Well.css';

export default class Well extends React.Component {

  static propTypes = {
    hasPadding: PropTypes.bool,
  };

  render() {
    return (
      <div className={`well ${this.props.hasPadding && 'padding'}`}>
        {this.props.children}
      </div>
    )
  }
}
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

  static defaultProps = {
    hasPadding: true,
  };

  render() {
    const paddingStyle = this.props.hasPadding
      ? 'padding'
      : '';

    return (
      <div className={`well ${paddingStyle}`}>
        {this.props.children}
      </div>
    )
  }
}
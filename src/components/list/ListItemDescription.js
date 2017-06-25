/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ListItemDescription.css';


export default class ListItemDescription extends React.Component {

  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    return (
      <p className="list-item-description">{this.props.text}</p>
    )
  }
}
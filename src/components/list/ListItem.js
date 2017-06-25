/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.string,
  };

  render() {

    const itemContent = (this.onClick !== undefined)
      ? (
        <a onClick={this.props.onClick}>
          <span>{this.props.title}</span>
          <span>{this.props.text}</span>
        </a>
      )
      : (
        <span>
          <span>{this.props.title}</span>
          <span>{ this.props.text }</span>
        </span>
      );

    return (
      <li>
        {itemContent}
      </li>
    )
  }
}
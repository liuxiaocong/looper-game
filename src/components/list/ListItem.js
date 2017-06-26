/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';

export default class ListItem extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _onClick: PropTypes.func,
  };

  render() {
    const itemContent = (this.props.onClick !== undefined)
      ? (
        <a onClick={this.props.onClick} className="list-item-content">
          <span className="title">{this.props.title}</span>
          <span className="flex-center">
            <span className="text">{this.props.text}</span>
            <i className="fa fa-chevron-right"/>
          </span>
        </a>
      )
      : (
        <span className="list-item-content">
          <span className="title">{this.props.title}</span>
          <span className="text">{ this.props.text }</span>
        </span>
      );

    return (
      <li className="list-item">{itemContent}</li>
    )
  }
}
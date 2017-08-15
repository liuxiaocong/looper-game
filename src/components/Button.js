/**
 * Created by xiaoconglau on 21/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends React.Component {

  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.oneOf(['red', 'green']),
    width: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    width: '0px',
    color: 'green',
    size: 'md',
  };

  render() {
    const buttonWidth = (this.props.width !== 0)
      && { width: this.props.width };

    const isFixedWidthStyle = (this.props.width !== 0)
      ? 'fixed'
      : '';

    return (
      <a className={`button ${isFixedWidthStyle} ${this.props.color} ${this.props.size}`} style={buttonWidth} onClick={this.props.onClick}>
        <span className="outer">
          <span className="inner">
            <span className="text">{this.props.text}</span>
          </span>
        </span>
      </a>
    )
  }
}

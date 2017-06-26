/**
 * Created by xiaoconglau on 21/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends React.Component {

  static propTypes = {
    text: PropTypes.string,
    width: PropTypes.number,
  };

  render() {
    const buttonWidth = (this.props.width !== 0) &&
      { width: this.props.width };

    return (
      <a className="button" style={buttonWidth}>
        <span className="outer">
          <span className="inner">
            <span className="text">{this.props.text}</span>
          </span>
        </span>
      </a>
    )
  }
}

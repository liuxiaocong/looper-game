/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './PanelHeaderButton.css';

export default class PanelHeaderButton extends React.Component {

  static propTypes = {
    icon: PropTypes.string,
    color: PropTypes.oneOf(['blue', 'red']),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    icon: 'fa-question-circle',
    color: 'blue',
  };

  render() {
    return (
      <a className={`panel-left-button ${this.props.color}`} onClick={this.props.onClick}>
        <span className="outer">
          <span className="inner">
              <i className={`fa ${this.props.icon}`}/>
          </span>
        </span>
      </a>
    )
  }
}
/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Radio.css';

export default class Radio extends React.Component {

  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  render() {
    const element = this.props.checked
      ? <span className="radio checked" onClick={() => this.props.onChange(this.props.value)}>
          <i className="fa fa-check"/>
        </span>
      : <span className="radio" onClick={() => this.props.onChange(this.props.value)}/>;

    return (
      <div className="radio-group">
        { element }
        <span className="radio-label">{this.props.label}</span>
      </div>
    )
  }

}
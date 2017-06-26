/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Radio from '../Radio';
import './ListRadio.css';

export default class ListRadio extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  };

  onChange = (newValue) => {
    this.props.onChange({ [this.props.name]: newValue })
  };

  render() {
    const options = this.props.options.map(
      (option, index) =>
        <li key={index}>
          <Radio
            checked={this.props.value === option.value}
            name={this.props.name}
            label={option.text}
            value={option.value}
            onChange={this.onChange}/>
        </li>,
    );

    return (
      <form>
        <ul className="list-radio">{options}</ul>
      </form>
    )
  }
}
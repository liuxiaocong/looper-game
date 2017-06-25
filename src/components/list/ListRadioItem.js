/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class ListRadioItem extends React.Component {

  static propTypes = {
    name: PropTypes.string,
  };


  render() {
    console.log(this);

    return (
      <li>
        <input type="radio" name={this.props.name}/>
        <label></label>
      </li>
    )
  }
}

/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class ListRadio extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
  };

  render() {
    return (
      <form>
        <ul>
          {this.props.children}
        </ul>
      </form>
    )
  }
}
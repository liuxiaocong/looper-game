/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';

export default class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.children}
      </ul>
    )
  }
}
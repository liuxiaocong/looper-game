/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';

export default class Modal extends React.Component {

  constructor() {
    super();
    this.state = {
      display: false,
    }
  }

  show = () => {
    console.log(this);
  };

  render() {

    const template = (
      <div className="modal">
        <span>Modal HERE</span>
      </div>
    );

    return (
      template
    )
  }

}
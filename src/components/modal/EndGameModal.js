/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import Modal from './Modal';

export default class EndGameModal extends React.Component {

  render() {
    const title = 'endgame';

    const content = (
      <div>
        <p>xx Players in the game.</p>
        <p>Do you want to end it?</p>
        <p>The entrance fee will be refunded.</p>
      </div>
    );

    return (
      <Modal
        title={title}
        content={content}/>
    )
  }

}
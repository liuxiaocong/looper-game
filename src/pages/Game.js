/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React, { Component } from 'react';
import '../main.css';
import GameBoard from '../components/GameBoard';
import Panel from '../components/panel/Panel';
import  * as consts from '../consts';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = { gameState: consts.STATE.INIT };
    this._layout();
  }

  _layout() {
    const scale = 1 / window.devicePixelRatio * 100;
    document.body.style.zoom = scale + '%';
  }

  render() {
    return (
      <Panel>
        <GameBoard
          ref="gameBoard"
          data={this.state.gameState}/>
        <button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.start}>Start</button>
        <button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.stop}>Stop</button>

      </Panel>
    )
  }

  start = () => {
    this.setState({ gameState: consts.STATE.START_LOOPS })
  };

  stop = () => {
    this.setState({ gameState: consts.STATE.STOP_LOOPS })
  }
}
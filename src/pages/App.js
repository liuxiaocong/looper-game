import React, { Component } from 'react';
import './App.css';
import GameBoard from '../pages/GameBoard';
import Panel from '../components/panel/Panel';
import  * as consts from '../consts';
import { Util } from '../util'
import { PkApi } from '../PKAPI';

export default class App extends Component {

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
    const size = {
      width: Util.getDimensions(30),
      height: Util.getDimensions(30),
    };

    return (
      <div className="app" style={{ margin: Util.getPxFromDp(15), width: size.width, height: size.height }}>
        <Panel>
          <button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.start}>Start</button>
          <button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.stop}>Stop</button>

          <GameBoard
            ref="gameBoard"
            data={this.state.gameState}
          />
        </Panel>
      </div>
    )
  }

  start = () => {
    this.setState({ gameState: consts.STATE.START_LOOPS })
  };

  stop = () => {
    this.setState({ gameState: consts.STATE.STOP_LOOPS })
  }
}
import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import GameBoard from '../pages/GameBoard';
import CommentButton from '../components/CommonButton';
import  * as consts from '../consts';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { gameState: consts.STATE.INIT };
    let scale = 1 / window.devicePixelRatio * 100;
    document.getElementById('root-html').style = 'zoom:' + scale + '%';
  }

  render() {
    return (
      <div style={{
        backgroundColor: '#ffff00',
      }}>
        <div style={{
          margin: 20, height: 50,
          textAlign: 'center',
        }}>
          <button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.start}>Start</button>
          <button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.stop}>Stop</button>
        </div>
        <CommentButton/>
        <GameBoard
          ref="gameBoard"
          data={this.state.gameState}
        />

      </div>
    )
  }

  componentDidMount() {

  }

  //End Mounting

  //Updating
  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  //End Updating

  //Un Mounting
  componentWillUnmount() {

  }

  gameStart = () => {
    this.setState({
      gameState: 1,
    })
  }

  start = () => {
    this.setState({ gameState: consts.STATE.START_LOOPS })
  }

  stop = () => {
    this.setState({ gameState: consts.STATE.STOP_LOOPS })
  }
}

export default App;

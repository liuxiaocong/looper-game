import React, { Component } from 'react';
import '../main.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { gameState: 0 };
  }

  render() {
    return <span className={this.state.gameState == 0 ? 'start' : 'start hide'} onClick={this.gameStart}>
			{this.state.gameState + ''}
		</span>
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
}


import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import GameBoard from '../pages/GameBoard';
import CommentButton from '../components/CommonButton';
import Background from '../components/Background';
import  * as consts from '../consts';
import {Util} from '../util'
const screenWidth = window.document.body.clientWidth * window.devicePixelRatio;
class App extends Component {

	constructor( props ) {
		super( props );
		this.state = { gameState: consts.STATE.INIT };
		let scale = 1 / window.devicePixelRatio * 100;
		document.documentElement.style.zoom = scale + '%';
	}

	render() {
		return (
			<div className="app" style={{margin:Util.getPxFromDp(15),width:screenWidth-Util.getPxFromDp(30),height:screenWidth-Util.getPxFromDp(30)}}>
				<div className="bg-wrap">
					<Background
						width={screenWidth-Util.getPxFromDp(30)}
						height={screenWidth-Util.getPxFromDp(30)}
					/>
				</div>
				<div className="game-wrap">
					<button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.start}>Start</button>
					<button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.stop}>Stop</button>
					<GameBoard
						ref="gameBoard"
						data={this.state.gameState}
					/>
				</div>
			</div>
		)
	}

	componentDidMount() {

	}

	//End Mounting

	//Updating
	componentWillReceiveProps( nextProps ) {

	}

	shouldComponentUpdate( nextProps, nextState ) {
		return true;
	}

	componentWillUpdate( nextProps, nextState ) {

	}

	componentDidUpdate( prevProps, prevState ) {

	}

	//End Updating

	//Un Mounting
	componentWillUnmount() {

	}

	gameStart = () => {
		this.setState( {
			gameState: 1,
		} )
	}

	start = () => {
		this.setState( { gameState: consts.STATE.START_LOOPS } )
	}

	stop = () => {
		this.setState( { gameState: consts.STATE.STOP_LOOPS } )
	}
}

export default App;

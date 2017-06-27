/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import { GameBoard, Panel } from '../components';
import  * as consts from '../consts';
import '../main.css';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
	settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
	// setMaxPlayer: maxPlayer => {
	// 	dispatch( setMaxPlayer( maxPlayer ) )
	// },
});

class Game extends React.Component {

	constructor( props ) {
		super( props );
		this.state = { gameState: consts.STATE.INIT };
	}

	render() {
		return (
			<Panel>
				<GameBoard ref="gameBoard" data={this.state.gameState}/>
				<button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.start}>Start</button>
				<button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.stop}>Stop</button>
			</Panel>
		)
	}

	start = () => {
		this.setState( { gameState: consts.STATE.START_LOOPS } )
	};

	stop = () => {
		this.setState( { gameState: consts.STATE.STOP_LOOPS } )
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( Game );
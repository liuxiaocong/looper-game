/**
 * Created by xiaoconglau on 21/06/2017.
 */
import React, { Component } from 'react';
import { Util } from '../util'
import './Background.css'

export default class Background extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			width: props.width,
			height: props.height
		}
	}

	render() {
		let cornerSize = Util.getPxFromDp( 50 );
		return (
			<div className="bg" style={{ height: this.state.height, width: this.state.width }}>
				<div className="top-wrap">
					<div className="top-left"
					     style={{ width: cornerSize, height: cornerSize }}></div>

					<div className="top-middle"
					     style={{ height: cornerSize }}></div>

					<div className="top-right"
					     style={{ width: cornerSize, height: cornerSize }}></div>
				</div>

				<div className="middle-wrap">
					<div className="middle-left"
					     style={{ width: cornerSize }}>
					</div>

					<div className="middle-middle"
					>

					</div>

					<div className="middle-right"
					     style={{ width: cornerSize }}>

					</div>
				</div>

				<div className="bottom-wrap">
					<div className="bottom-left"
					     style={{ width: cornerSize, height: cornerSize }}>
					</div>

					<div className="bottom-middle"
					     style={{ height: cornerSize }}>

					</div>

					<div className="bottom-right"
					     style={{ width: cornerSize, height: cornerSize }}>

					</div>
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
}

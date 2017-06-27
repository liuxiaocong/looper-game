import React, { Component } from 'react';
import './GameBorad.css';
import { Util } from '../util';
import { UI, DEBUG_DATA } from '../consts';
import  * as consts from '../consts';
const canvasWidth = Util.getPxFromDp( UI.LOOPER_SIZE );
const looperRadius = Util.getPxFromDp( UI.LOOPER_SIZE / 2 - 2 );

class GameBoard extends Component {

	constructor( props ) {
		super( props );
		this.gameState = props.data;
		let userData = DEBUG_DATA.USER_LIST.slice( 0, 6 );
		for ( let i = 0; i < userData.length; i++ ) {
			let user = userData[ i ];
			if ( user.avatar ) {
				user.image = new Image();
				user.image.src = user.avatar;
				user.image.onload = () => {
					user.isReady = true;
					this.draw();
				}
			}
		}
		this.state = {
			userList: userData,
			color: UI.LOOPER_COLORS,
		};
	}

	loadImage() {
		this.lineImage = new Image();
		const lineUrl = require( '../assets/line.png' );
		this.lineImage.src = lineUrl;
		this.lineImage.onload = () => {
			this.lineImage.isReady = true;
			//this.drawLines( this.angle );
			this.draw();
		}
	}

	render() {
		// if ( window.devicePixelRatio ) {
		// 	canvasWidth = canvasWidth * window.devicePixelRatio;
		// }
		return (
			<div className="game" style={{ width: canvasWidth, height: canvasWidth }}>
				<canvas
					style={{
						backgroundColor: 'transparent',
						marginLeft: 'auto',
						marginRight: 'auto',
						display: 'block',
					}} ref="canvas" width={canvasWidth} height={canvasWidth}/>
				<div className="mask"></div>
			</div>
		)
	}

	componentDidMount() {
		this.context = this.refs.canvas.getContext( '2d' );
		this.context.imageSmoothingEnabled = true;
		Util.setPixelated( this.context );
		this.loadImage();
		this.draw();
	}

	//End Mounting

	//Updating
	componentWillReceiveProps( nextProps ) {

	}

	shouldComponentUpdate( nextProps, nextState ) {
		this.gameState = nextProps.data;
		console.log( 'shouldComponentUpdate:' + this.gameState );
		this.draw();
		return false;
	}

	componentWillUpdate( nextProps, nextState ) {

	}

	componentDidUpdate( prevProps, prevState ) {

	}

	//End Updating

	//Un Mounting
	componentWillUnmount() {

	}

	update() {
		this.draw();
		requestAnimationFrame( () => {
			this.update()
		} );
	}

	drawInit = () => {
		console.log( 'drawInit' );
		if ( !this.angle ) {
			this.angle = -0.5 * Math.PI;
		}

		this.drawLoopsWithAngle( this.angle );
		this.drawLines( this.angle );
	};

	drawAvatar( user, radius, x, y ) {

		let context = this.context;
		context.save();
		//context.globalCompositeOperation = 'destination-in';
		context.beginPath();
		if ( !user.isReady ) {
			context.fillStyle = '#000';
			context.strokeStyle = '#000';
		}
		context.arc( x, y, radius, 0, Math.PI * 4, true );
		context.stroke();
		context.closePath();
		context.fill();
		context.clip();
		if ( user.isReady ) {
			context.drawImage( user.image, 0, 0, user.image.width, user.image.height, x - radius, y - radius, radius * 2, radius * 2 );
		}
		context.restore();
	}

	drawStartLoops = () => {
		console.log( 'drawStartLoops' );
		if ( !this.startTime ) {
			this.startTime = (new Date()).getTime();
		}
		this.drawLoopsWithAngle( this.angle );
		this.currentSpeed = this.getSpeed();
		console.log( "speed:" + this.currentSpeed );
		this.angle += this.currentSpeed;
		requestAnimationFrame( () => {
			this.draw()
		} );
	};

	drawStopLoops = () => {

	};

	drawLoopsWithAngle = ( angle ) => {
		this.clear();
		this.drawBaseCircle( angle );
		this.drawLines( angle )
	};

	draw() {
		switch ( this.gameState ) {
			case consts.STATE.INIT: {
				this.drawInit();
				break;
			}
			case consts.STATE.START_LOOPS: {
				this.drawStartLoops();
				break;
			}
			case consts.STATE.STOP_LOOPS: {
				this.drawStopLoops();
				break;
			}
			default:
				break;
		}
	}

	drawLines = ( angle ) => {
		if ( !this.lineImage.isReady ) {
			return
		}
		let lineAngle = angle - 0.5 * Math.PI;
		let ctx = this.context;

		let dDegree = 1 / this.state.userList.length * 360;
		for ( let i = 0; i < this.state.userList.length; i++ ) {
			ctx.save();
			let degree = lineAngle + i * dDegree * Math.PI / 180;
			ctx.translate(
				canvasWidth / 2,
				canvasWidth / 2,
			)
			;
			ctx.rotate( degree );
			ctx.drawImage( this.lineImage,
				0, 0,
				this.lineImage.width,
				this.lineImage.height,
				-Util.getPxFromDp( UI.LINE_IMAGE.WIDTH ) / 2, 0,
				Util.getPxFromDp( UI.LINE_IMAGE.WIDTH ),
				Util.getPxFromDp( UI.LINE_IMAGE.HEIGHT ),
			);
			ctx.restore();
		}
	};

	drawBaseCircle( angle ) {
		if ( !this.state.userList || this.state.userList.length === 0 ) {
			this.drawDefault();
			return;
		}
		let ctx = this.context;
		let startPoint = angle;
		let dxPoint = Math.PI * 2 * (1 / this.state.userList.length);
		for ( let i = 0; i < this.state.userList.length; i++ ) {
			ctx.fillStyle = this.state.color[ i ];
			ctx.strokeStyle = this.state.color[ i ];
			ctx.beginPath();
			ctx.moveTo( canvasWidth / 2, canvasWidth / 2 );
			ctx.arc( canvasWidth / 2, canvasWidth / 2, looperRadius, startPoint, startPoint + Math.PI * 2 * (1 / this.state.userList.length), false );
			ctx.fill();
			ctx.stroke();
			let degree = (Math.PI * 2) * ((1 / this.state.userList.length) * i + (1 / (this.state.userList.length * 2)));
			let y = looperRadius * 0.5 * Math.sin( angle + degree );
			let x = looperRadius * 0.5 * Math.cos( angle + degree );
			this.drawAvatar( this.state.userList[ i ], Util.getPxFromDp( UI.AVATAR_SIZE / 2 ), canvasWidth / 2 + x, canvasWidth / 2 + y );
			startPoint += dxPoint;
		}
	}

	clear() {
		this.context.clearRect( 0, 0, this.refs.canvas.width, this.refs.canvas.height );
	}

	getSpeed() {
		let timePast = ((new Date()).getTime() - this.startTime);
		if ( timePast <= consts.LOOPER.SPEED.SPEED_UP_TIME ) {
			//speed up period
			let timeCostPercent = timePast / consts.LOOPER.SPEED.SPEED_UP_TIME;
			if ( timeCostPercent > 1 ) {
				timeCostPercent = 1;
			}
			let x = Math.PI / 2 * timeCostPercent;
			//y:[0,1]
			let y = Math.sin( x );
			console.log(y);
			return y * consts.LOOPER.SPEED.COEFFICIENT;
		} else if ( timePast <= (consts.LOOPER.SPEED.SPEED_UP_TIME + consts.LOOPER.SPEED.SPEED_DOWN_TIME) ) {
			let pastPercent = (timePast - consts.LOOPER.SPEED.SPEED_UP_TIME) / consts.LOOPER.SPEED.SPEED_DOWN_TIME;
			let y = consts.LOOPER.SPEED.MAX_SPEED - pastPercent * (consts.LOOPER.SPEED.MAX_SPEED - consts.LOOPER.SPEED.MIN_SPEED);
			return y;
		} else {
			return consts.LOOPER.SPEED.MIN_SPEED;
		}

	}
}

export default GameBoard;

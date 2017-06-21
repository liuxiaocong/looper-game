import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const GameStateUtil = require( './GameStateUtil' );
const Util = require( './Util' );
const ImageUtil = require( './ImageUtil' );
var canvasWidth = Util.getPxFromDp( 300 );
const looperRadius = Util.getPxFromDp( 100 );

class GameBoard extends Component {

	constructor( props ) {
		super( props );
		this.gameState = props.data;
		this.avatarArray = [ "https://wangsu-image.rings.tv/images/2016/02/23/3b/__/3b1fda4a52c37d57bd4def3ec$fbb2a220160223.png" ];
		this.image = new Image();
		this.image.src = this.avatarArray[ 0 ];
		requestAnimationFrame( () => {
			this.update()
		} );
	}

	render() {
		// if ( window.devicePixelRatio ) {
		// 	canvasWidth = canvasWidth * window.devicePixelRatio;
		// }
		return (
			<canvas style={{
				backgroundColor: '#fff',
				marginLeft: 'auto',
				marginRight: 'auto',
				display: 'block'
			}} ref="canvas" width={canvasWidth} height={canvasWidth}/>
		)
	}

	componentDidMount() {
		this.context = this.refs.canvas.getContext( '2d' );
		this.context.imageSmoothingEnabled = true;
		Util.setPixelated( this.context );
	}

	//End Mounting

	//Updating
	componentWillReceiveProps( nextProps ) {

	}

	shouldComponentUpdate( nextProps, nextState ) {
		this.gameState = nextProps.data;
		console.log( "shouldComponentUpdate:" + this.gameState );
		//control update logic
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
		console.log( "drawInit" );
		if ( !this.startTime ) {
			this.startTime = (new Date()).getTime();
		}
		if ( !this.angle ) {
			this.angle = 0;
		}

		this.drawLoopsWithAngle( this.angle );

	};

	drawAvatar( radius, x, y ) {

// 		var scratchCanvas = document.createElement( "canvas" );
// 		scratchCanvas.width = radius;
// 		scratchCanvas.height = radius;
// 		var scratchCTX = scratchCanvas.getContext( "2d" );
// 		scratchCTX.save(); // 创建一个单独的区域
// 		scratchCTX.fillStyle = "#000"; // 颜色不重要，但是需要全不透明
// 		scratchCTX.globalCompositeOperation = 'destination-in';
// 		scratchCTX.beginPath();
// 		scratchCTX.arc( x, y, radius, 0, Math.PI * 4, true );
// 		scratchCTX.closePath();
// 		scratchCTX.fill();
// 		scratchCTX.drawImage( this.image, 0, 0, this.image.width, this.image.height, 0, 0, radius * 2, radius * 2 );
// 		scratchCTX.restore();
// // 将裁剪出来的图像绘制在原canvas上
// 		this.context.drawImage( scratchCanvas, 0, 0 );

		let context = this.context;
		context.beginPath();
		context.arc( x, y, radius + 3, 0, Math.PI * 4, true );
		context.strokeStyle = '#fff';
		context.fillStyle = '#fff';
		context.fill();
		context.save();
		//context.globalCompositeOperation = 'destination-in';
		context.beginPath();
		context.fillStyle = '#fff';
		context.strokeStyle = '#fff';
		context.arc( x, y, radius, 0, Math.PI * 4, true );
		context.stroke();
		context.closePath();
		context.fill();
		context.clip();
		context.drawImage( this.image, 0, 0, this.image.width, this.image.height, x - radius, y - radius, radius * 2, radius * 2 );
		context.restore();
	}

	drawStartLoops = () => {
		console.log( "drawStartLoops" );
		this.angle += GameStateUtil.LOOPER.INIT_SPEED;
		if ( !this.size ) {
			this.size = 20;
			this.extend = true;
		}
		if ( this.size >= 250 ) {
			this.extend = false;
		}
		if ( this.size <= 20 ) {
			this.extend = true;
		}
		if ( this.extend ) {
			this.size++;
		} else {
			this.size--;
		}
		this.drawLoopsWithAngle( this.angle );
	};

	drawStopLoops = () => {

	};

	drawLoopsWithAngle = ( angle ) => {
		this.clear();
		//this.context.globalCompositeOperation = 'source-atop';
		//this.context.imageSmoothingEnabled = false;
		//Util.setPixelated( this.context );
		// this.context.beginPath();
		// this.context.arc( 250, 250, this.size, 0, 3 * Math.PI );
		// this.context.stroke();
		//
		// this.context.beginPath();
		// let timeSpan = (new Date()).getTime() - this.startTime;
		// let percent = timeSpan / 20000;
		// let x = percent * 500;
		// this.context.arc( x, 450, 10, 0, 3 * Math.PI );
		// this.context.stroke();

		this.drawBaseCircle();
	};

	draw() {
		switch ( this.gameState ) {
			case GameStateUtil.STATE.INIT: {
				this.drawInit();
			}
				break;
			case GameStateUtil.STATE.START_LOOPS: {
				this.drawStartLoops()
			}
				break;
			case GameStateUtil.STATE.STOP_LOOPS: {
				this.drawStopLoops()
			}
				break;
		}
	}

	drawBaseCircle() {
		let data = [ 20, 20, 20, 20, 20 ];
		let color = [ "#000000", "#FF0000", "#00FF00", "#0000FF", "#00FFFF", "#F20FFF" ];
		let ctx = this.context;
		let startPoint = (0 + this.angle) * Math.PI;
		let currentPast = 0;
		for ( let i = 0; i < data.length; i++ ) {
			ctx.fillStyle = color[ i ];
			ctx.strokeStyle = color[ i ];
			ctx.beginPath();
			ctx.moveTo( canvasWidth / 2, canvasWidth / 2 );
			ctx.arc( canvasWidth / 2, canvasWidth / 2, looperRadius, startPoint, startPoint + Math.PI * 2 * (data[ i ] / 100), false );
			ctx.fill();
			ctx.stroke();
			let y = looperRadius * 0.5 * Math.sin( this.angle * Math.PI + Math.PI * ((currentPast + (data[ i ] / 2)) / 50) );
			let x = looperRadius * 0.5 * Math.cos( this.angle * Math.PI + Math.PI * ((currentPast + (data[ i ] / 2)) / 50) );
			this.drawAvatar( Util.getPxFromDp( 15 ), canvasWidth / 2 + x, canvasWidth / 2 + y );
			currentPast += data[ i ];
			startPoint += Math.PI * 2 * (data[ i ] / 100);
		}
	}

	clear() {
		this.context.clearRect( 0, 0, this.refs.canvas.width, this.refs.canvas.height );
	}

	getSufAngle() {
		let subTime = (new Date()).getTime() - this.startTime;
		let ret = 0.1;
		if ( subTime > 10000 ) {
			ret = ret + (10000 - subTime) * 0.0001;
		} else {
			ret = ret - (subTime / 20000) * 0.1;
		}
		if ( ret < 0 ) {
			ret = 0;
		}
		return ret;
	}
}

export default GameBoard;

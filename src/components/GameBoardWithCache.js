import React, { Component } from 'react';
import './GameBorad.css';
import { Util, LuckRouletteUtil } from '../util';
import { UI, DEBUG_DATA } from '../consts';
import  * as consts from '../consts';
import { connect } from 'react-redux'
import {
  setToIdle,
  setToPrepare,
  setToStartRolling,
  setToStopRolling,
  setToPendingKick,
  setToReadyToStartNext,
  setToResult
} from '../redux/actions'
// const screenWidth = window.document.body.clientWidth;
// const canvasWidth = Util.getPxFromDp( screenWidth - 60 );
// const looperRadius = Util.getPxFromDp( (screenWidth - 60) / 2 - 2 );

const mapStateToProps = state => ({
  gameStore: state.gameStore,
});

const mapDispatchToProps = dispatch => ({
  setToIdle: () => {
    dispatch(setToIdle())
  },
  setToPrepare: (settings, players) => {
    dispatch(setToPrepare(settings, players))
  },
  setToStartRolling: (players) => {
    dispatch(setToStartRolling(players))
  },
  setToStopRolling: (players, luckGuy) => {
    dispatch(setToStopRolling(players, luckGuy))
  },
  setToPendingKick: (players, luckGuy) => {
    dispatch(setToPendingKick(players, luckGuy))
  },
  setToReadyToStartNext: (players, luckGuy, badLuckGuy) => {
    dispatch(setToReadyToStartNext(players, luckGuy, badLuckGuy))
  },
  setToResult: (winner, bonus) => {
    dispatch(setToResult(winner, bonus));
  }
});
let canvasWidth = Util.getPxFromDp(UI.LOOPER_SIZE);
let looperRadius = Util.getPxFromDp(UI.LOOPER_SIZE / 2 - 2);
class GameBoardWithCache extends Component {

  constructor(props) {
    super(props);
    canvasWidth = LuckRouletteUtil.getCanvasSize();
    looperRadius = LuckRouletteUtil.getRouletteRadius();
    console.log("canvasWidth:" + canvasWidth);
    this.gameState = props.gameStore[consts.GameStoreKeys.GameState];
    let userData = props.gameStore[consts.GameStoreKeys.GameData][consts.GameStoreKeys.GameDataKeys.Players].slice(0, 6);
    for (let i = 0; i < userData.length; i++) {
      let user = userData[i];
      if (user.avatar) {
        user.image = new Image();
        user.image.src = user.avatar;
        user.image.onload = () => {
          user.isReady = true;
          this.requestInvalidLayout();
        }
      }
    }
    this.state = {
      userList: userData,
      color: UI.LOOPER_COLORS,
      gameData: props.gameStore[consts.GameStoreKeys.GameData]
    };
  }

  loadImage() {
    this.lineImage = new Image();
    this.lineImage.src = require('../assets/line.png');
    this.lineImage.onload = () => {
      this.lineImage.isReady = true;
      this.requestInvalidLayout();
      //this.drawLines( this.angle );
    }
  }

  render() {
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
    console.log("set context");
    this.canvasContext = this.refs.canvas.getContext('2d');
    this.canvas = this.refs.canvas;
    //window.ctx = this.canvasContext;
    //window.canv = this.refs.canvas;
    Util.setPixelated(this.canvasContext, true);
    this.loadImage();
    this.draw();
  }

  //End Mounting

  //Updating
  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    this.gameState = nextProps.gameStore[consts.GameStoreKeys.GameState];
    let gameData = nextProps.gameStore[consts.GameStoreKeys.GameData];
    nextState.gameData = gameData;
    this.updateUserListData(gameData);
    console.log('shouldComponentUpdate:' + this.gameState);
    return false;
  }

  updateUserListData = (gameData) => {
    let player = gameData[consts.GameStoreKeys.GameDataKeys.Players];
    console.log("player.length:" + player.length);
    if (!player || player.length == 0) {
      this.state.userList = [];
      return
    }
    let newUserList = [];
    for (let i = 0; i < this.state.userList.length; i++) {
      let uid = this.state.userList[i].id;
      if (this.getIndexFromUserArrayById(uid, player) >= 0) {
        newUserList.push(this.state.userList[i]);
      }
    }
    if (newUserList.length != this.state.userList.length) {
      for (let j = 0; j < player; j++) {
        let uid = player[j].id;
        if (this.getIndexFromUserArrayById(uid, this.state.userList) < 0) {
          let user = player[j];
          if (user.avatar) {
            user.image = new Image();
            user.image.src = user.avatar;
            user.image.onload = () => {
              user.isReady = true;
              this.requestInvalidLayout();
            }
          }
          newUserList.push(player[j]);
        }
      }
      this.state.userList = newUserList;
    }
  };

  getIndexFromUserArrayById(userId, array) {
    for (let i = 0; i < array.length; i++) {
      let user = array[i];
      if (userId == user.id) {
        return i;
      }
    }
    return -1;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  //End Updating

  //Un Mounting
  componentWillUnmount() {

  }

  draw() {
    switch (this.gameState) {
      case consts.STATE.PREPARE: {
        if (this.latestDrawState == undefined || this.latestDrawState != this.gameState) {
          this.drawInit();
        }
        break;
      }
      case consts.STATE.START_ROLLING: {
        this.drawStartLoops();
        break;
      }
      case consts.STATE.STOP_ROLLING: {
        this.drawStopLoops();
        break;
      }
      case consts.STATE.PENDING_KICK: {
        this.drawWaitKick();
        break;
      }
      case consts.STATE.READY_TO_START_NEXT: {
        if (this.latestDrawState == undefined || this.latestDrawState != this.gameState) {
          this.drawLoopsIdel();
        }
        break;
      }
      default:
        break;
    }
    this.latestDrawState = this.gameState;
    requestAnimationFrame(() => {
      this.draw()
    });
  }

  requestInvalidLayout() {
    this.latestDrawState = undefined;
  }

  drawWaitKick = () => {
    console.log('drawWaitKick');
    this.angle = this.targetStopAngle;
    if (this.state.userList && this.state.userList.length == 1) {
      this.angle = -1 * Math.PI;
    }
    this.drawLoopsWithAngle(this.canvasContext, this.angle);
  };

  drawLoopsIdel = () => {
    console.log('drawWaitKick');
    this.angle = -0.5 * Math.PI;
    if (this.state.userList && this.state.userList.length == 1) {
      this.angle = -1 * Math.PI;
    }
    this.drawLoopsWithAngle(this.canvasContext, this.angle);
  };

  drawInit = () => {
    console.log('drawInit');
    this.angle = -0.5 * Math.PI;
    if (this.state.userList && this.state.userList.length == 1) {
      this.angle = -1 * Math.PI;
    }
    this.drawLoopsWithAngle(this.canvasContext, this.angle);
    this.cacheCanvas = this.drawCacheCanvas();
    if (!this.newCanvas) {
      this.newCanvas = document.createElement('canvas');
      this.newCanvas.width = canvasWidth;
      this.newCanvas.height = canvasWidth;
      this.newCanvasCtx = this.newCanvas.getContext('2d');
    }
  };

  drawCacheCanvas = () => {
    let canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasWidth;
    this.drawLoopsWithAngle(canvas.getContext('2d'), this.angle);
    return canvas;
  };

  resetLooper = () => {
    this.acceleratedSpeed = undefined;
    this.stopSpeed = undefined;
    this.stopTime = undefined;
    this.startTime = undefined;
    this.angle = -0.5 * Math.PI;
    this.targetStopAngle = undefined;
  };

  drawStartLoops = () => {
    if (this.targetStopAngle) {
      this.resetLooper();
    }
    if (!this.startTime) {
      this.startTime = (new Date()).getTime();
    }
    //this.drawLoopsWithAngle(this.canvasContext, this.angle);
    this.clear(this.canvasContext);
    this.clear(this.newCanvasCtx);
    this.newCanvasCtx.save();
    this.newCanvasCtx.translate(canvasWidth / 2, canvasWidth / 2);
    this.newCanvasCtx.rotate(this.angle);
    this.newCanvasCtx.drawImage(this.cacheCanvas, 0, 0, canvasWidth, canvasWidth, -canvasWidth / 2, -canvasWidth / 2, canvasWidth, canvasWidth);
    this.newCanvasCtx.restore();
    this.canvasContext.drawImage(this.newCanvas, 0, 0);
    this.currentSpeed = this.getSpeed();
    if (this.currentSpeed == consts.LOOPER.SPEED.MIN_SPEED) {
      //todo set to stop and report
      //this.gameState = consts.STATE.STOP_LOOPS;
    }
    this.angle += this.currentSpeed;
  };

  calculatorStop() {
    if (!this.currentSpeed) {
      //skip start flow
      this.currentSpeed = consts.LOOPER.SPEED.MIN_SPEED;
    }
    this.stopTime = (new Date()).getTime();

    this.acceleratedSpeed = this.currentSpeed / consts.LOOPER.SPEED.TIME_PERIOD_WHEN_RECEIVE_STOP;
    this.stopSpeed = this.currentSpeed;

    console.log("currentAngle:" + this.angle);
    console.log("targetStopAngle:" + this.targetStopAngle);
    console.log("stopSpeed:" + this.stopSpeed);
    console.log("acceleratedSpeed:" + this.acceleratedSpeed);
  };

  drawStopLoops = () => {
    // data  should from reduce
    if (!this.stopSpeed) {
      this.calculatorStop();
    }
    this.currentSpeed = this.getSpeed();
    this.angle += this.currentSpeed;
    if (this.angle >= this.targetStopAngle) {
      this.angle = this.targetStopAngle;
      this.drawLoopsWithAngle(this.canvasContext, this.angle);
      this.props.setToPendingKick(this.state.userList, this.state.gameData[consts.GameStoreKeys.GameDataKeys.LuckGuy]);
      setTimeout(() => {
        this.props.setToReadyToStartNext(this.state.userList.slice(0, this.state.userList.length - 1));
      }, 3000);
    } else {
      this.drawLoopsWithAngle(this.canvasContext, this.angle);
    }
  };

  drawAvatar(ctx, user, radius, x, y) {

    let context = ctx;
    context.save();
    //context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    if (!user.isReady) {
      context.fillStyle = '#000';
      context.strokeStyle = '#000';
    }
    context.arc(x, y, radius, 0, Math.PI * 4, true);
    context.stroke();
    context.closePath();
    context.fill();
    context.clip();
    if (user.isReady) {
      context.drawImage(user.image, 0, 0, user.image.width, user.image.height, x - radius, y - radius, radius * 2, radius * 2);
    }
    context.restore();
  }

  drawLoopsWithAngle = (ctx, angle) => {
    this.clear(ctx);
    this.drawBaseCircle(ctx, angle);
    this.drawLines(ctx, angle);
  };

  drawLines = (ctx, angle) => {
    if (!this.lineImage.isReady) {
      return;
    }
    if (this.state.userList && this.state.userList.length == 1) {
      return;
    }
    let lineAngle = angle - 0.5 * Math.PI;

    let dDegree = 1 / this.state.userList.length * 360;
    for (let i = 0; i < this.state.userList.length; i++) {
      ctx.save();
      let degree = lineAngle + i * dDegree * Math.PI / 180;
      ctx.translate(
        canvasWidth / 2,
        canvasWidth / 2,
      )
      ;
      ctx.rotate(degree);
      ctx.drawImage(this.lineImage,
        0, 0,
        this.lineImage.width,
        this.lineImage.height,
        -Util.getPxFromDp(UI.LINE_IMAGE.WIDTH) / 2, 0,
        Util.getPxFromDp(UI.LINE_IMAGE.WIDTH),
        LuckRouletteUtil.getLineHeight(),
      );
      ctx.restore();
    }
  };

  drawBaseCircle(ctx, angle) {
    if (!this.state.userList || this.state.userList.length === 0) {
      this.drawDefault();
      return;
    }
    let startPoint = angle;
    let dxPoint = Math.PI * 2 * (1 / this.state.userList.length);
    for (let i = 0; i < this.state.userList.length; i++) {
      ctx.fillStyle = this.state.color[i];
      ctx.strokeStyle = this.state.color[i];
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, canvasWidth / 2);
      ctx.arc(canvasWidth / 2, canvasWidth / 2, looperRadius, startPoint, startPoint + Math.PI * 2 * (1 / this.state.userList.length), false);
      ctx.fill();
      ctx.stroke();
      let degree = (Math.PI * 2) * ((1 / this.state.userList.length) * i + (1 / (this.state.userList.length * 2)));
      let y = looperRadius * 0.55 * Math.sin(angle + degree);
      let x = looperRadius * 0.55 * Math.cos(angle + degree);
      this.drawAvatar(ctx, this.state.userList[i], Util.getPxFromDp(UI.AVATAR_SIZE / 2), canvasWidth / 2 + x, canvasWidth / 2 + y);
      startPoint += dxPoint;
    }
  }

  drawDefault = () => {

  };

  clear = (ctx) => {
    ctx && ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  };

  getSpeed() {
    if (this.stopSpeed) {
      //stop flow
      let timePast = ((new Date()).getTime() - this.stopTime);
      let speed = this.stopSpeed - timePast * this.acceleratedSpeed;
      if (speed <= consts.LOOPER.SPEED.MIN_SPEED / 2) {
        speed = consts.LOOPER.SPEED.MIN_SPEED / 2;
        let targetIndex = 3;
        if (!this.targetStopAngle) {
          let currentRoundCount = Math.floor(this.angle / (Math.PI * 2));
          let dxPoint = Math.PI * 2 * (1 / this.state.userList.length);
          this.targetStopAngle = Math.PI * 2 * (currentRoundCount + 1) + (dxPoint * (this.state.userList.length - targetIndex - 1) + dxPoint / 2) - 0.5 * Math.PI;
          console.log("targetStopAngle:" + this.targetStopAngle);
          console.log("current Angle:" + this.angle);
        }
      }
      return speed;
    } else {
      let timePast = ((new Date()).getTime() - this.startTime);
      if (timePast <= consts.LOOPER.SPEED.SPEED_UP_TIME) {
        //speed up period
        let timeCostPercent = timePast / consts.LOOPER.SPEED.SPEED_UP_TIME;
        if (timeCostPercent > 1) {
          timeCostPercent = 1;
        }
        let x = Math.PI / 2 * timeCostPercent;
        //y:[0,1]
        let y = Math.sin(x);
        return y * consts.LOOPER.SPEED.COEFFICIENT;
      } else if (timePast <= (consts.LOOPER.SPEED.SPEED_UP_TIME + consts.LOOPER.SPEED.SPEED_DOWN_TIME)) {
        let pastPercent = (timePast - consts.LOOPER.SPEED.SPEED_UP_TIME) / consts.LOOPER.SPEED.SPEED_DOWN_TIME;
        return consts.LOOPER.SPEED.MAX_SPEED - pastPercent * (consts.LOOPER.SPEED.MAX_SPEED - consts.LOOPER.SPEED.MIN_SPEED);
      } else {
        return consts.LOOPER.SPEED.MIN_SPEED;
      }

    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameBoardWithCache);

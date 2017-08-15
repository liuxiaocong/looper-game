/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import { GameBoard, Panel, GameBoardWithCache } from '../components';
import  * as consts from '../consts';
import '../main.css';
import './Game.css';
import { Util, LuckRouletteUtil } from '../util';
import { connect } from 'react-redux'
import { PkApi } from '../gameSDK';
import {
  setToIdle,
  setToPrepare,
  setToStartRolling,
  setToStopRolling,
  setToPendingKick,
  setToReadyToStartNext,
  setToResult,
} from '../redux/actions'
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
  },
});

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: props.gameStore[consts.GameStoreKeys.GameState],
      gameData: props.gameStore[consts.GameStoreKeys.GameData],
      gameRole: 1,
      isFull: false,
      alreadyJoin: false,
      currentWinner: { name: 'evan' },
      currentKickedUser: { name: 'Tomi' },
      hasRequestRoundStart: false,
      isJoining: false
    }
  }

  render() {
    let showStart = false;
    if (this.state.gameRole === 1) {
      if (this.state.gameState === consts.STATE.PREPARE || this.state.gameState === consts.STATE.READY_TO_START_NEXT) {
        showStart = true;
      }
    }
    let showJoin = false;
    if (this.state.gameRole === 2) {
      if (this.state.gameState === consts.STATE.PREPARE) {
        showJoin = true;
      }
    }

    let looperSize = LuckRouletteUtil.getCanvasSize();
    return (
      <Panel
        name="game-page">
        <GameBoard ref="gameBoard" gameStore={this.props.gameStore}/>
        {
          showStart &&
          <a className="btn btn-start"
             onClick={this.start}
             style={{
               width: Util.getPxFromDp(consts.UI.START_BUTTON_SIZE),
               height: Util.getPxFromDp(consts.UI.START_BUTTON_SIZE),
               top: looperSize / 2 + Util.getPxFromDp(15) - Util.getPxFromDp(consts.UI.START_BUTTON_SIZE) / 2,
               marginLeft: -(Util.getPxFromDp(consts.UI.START_BUTTON_SIZE) / 2),
             }}>
            <span className="btn-text">Start</span>
          </a>
        }

        {
          showJoin &&
          <a className="btn btn-start"
             onClick={this.join}
             style={{
               width: Util.getPxFromDp(consts.UI.START_BUTTON_SIZE),
               height: Util.getPxFromDp(consts.UI.START_BUTTON_SIZE),
               top: looperSize / 2 + Util.getPxFromDp(15) - Util.getPxFromDp(consts.UI.START_BUTTON_SIZE) / 2,
               marginLeft: -(Util.getPxFromDp(consts.UI.START_BUTTON_SIZE) / 2),
             }}>
            <span className="btn-text">Join</span>
          </a>
        }
        <p className="tips">{this.getTipsFromState(this.state.gameState)}</p>
        <button style={{ width: 80, height: 50, marginRight: 30 }} onClick={this.stop}>Stop</button>
      </Panel>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    nextState.gameState = nextProps.gameStore[consts.GameStoreKeys.GameState];
    nextState.gameData = nextProps.gameStore[consts.GameStoreKeys.GameData];
    if (nextState.gameState == consts.STATE.RESULT) {
      this.setState({ hasRequestRoundStart: false })
    }
    console.log('Game:update game state - ' + nextState.gameState);
    return true;
  }

  getTipsFromState = (gameState) => {
    switch (gameState) {
      case consts.STATE.PREPARE: {
        if (this.state.isHost) {
          return consts.TEXT.WAIT_JOIN;
        } else {
          if (this.state.alreadyJoin) {
            return consts.TEXT.JOIN_SUCCESS_AND_WAIT_START;
          }
          if (this.state.isFull) {
            return consts.TEXT.WAIT_NEXT_ROUND;
          }

          return consts.TEXT.CAN_JOIN;
        }
      }
      case consts.STATE.PENDING_KICK: {
        return Util.stringFormat(consts.TEXT.WAIT_KICK, this.state.currentWinner.name);
      }
      case consts.STATE.READY_TO_START_NEXT: {
        if (this.state.isHost) {
          return Util.stringFormat(consts.TEXT.KICK_RESULT_HOST, this.state.currentKickedUser.name, this.state.currentWinner.name);
        } else {
          return Util.stringFormat(consts.TEXT.KICK_RESULT_GUEST, this.state.currentKickedUser.name, this.state.currentWinner.name);
        }
      }
      default: {
        return ''
      }
    }
  };

  join = () => {
    //todo join game
    if (!this.state.isJoining && window.PKJSBridge) {
      PkApi.requestJoinARound({}, (res) => {


      })
    }
  };

  start = () => {
    if (!this.state.hasRequestRoundStart && window.PKJSBridge) {
      //request new round
      PkApi.requestRoundStart({}, (res) => {
        //{
        //  "playerList": [1111, 2222]
        //}
        PkApi.getUsers(res["playerList"], (users) => {
          this.props.setToStartRolling(users)
        })
        this.setState({ hasRequestRoundStart: true })
      })
    } else {
      this.props.setToStartRolling(this.state.gameData[consts.GameStoreKeys.GameDataKeys.Players])
    }
  };

  stop = () => {
    this.props.setToStopRolling(this.state.gameData[consts.GameStoreKeys.GameDataKeys.Players],
      this.state.gameData[consts.GameStoreKeys.GameDataKeys.Players][3])
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
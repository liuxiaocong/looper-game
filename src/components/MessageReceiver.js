/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 30/6/17.
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Util } from '../util'
import { socket } from '../fakeAPI';
import { connect } from 'react-redux';
import { api, clientApi } from '../fakeAPI';
import { PkApi } from '../gameSDK';
import * as consts from '../consts';
import {
  setRole,
  setToIdle,
  setToPrepare,
  setToStartRolling,
  setToStopRolling,
  setToPendingKick,
  setToReadyToStartNext,
  setToResult,
} from '../redux/actions'

const mapStateToProps = state => ({
  settings: state.settings,
  gameStore: state.gameStore,
});

const mapDispatchToProps = dispatch => ({
  setRole: role => dispatch(setRole(role)),
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

/**
 * This class is a dumb class. because react-router can not handle 'history' routing well.
 * So. I just wrap whole application with a Component to add all global logic here.
 */
class MessageReceiver extends React.Component {

  constructor({ history }) {
    super();
    // layout when create app.
    Util.layout();

    //FIXME fake video channel.
    socket.on('message', (message) => {
      if (!this._checkIfStateDataValid(message)) {
        console.warn('message is not valid');
        return;
      }
      const data = JSON.parse(message);
      //
      const role = this._getRole(data);
      if (this.props.gameStore[consts.GameStoreKeys.Role] !== role) {
        this.props.setRole(role);
      }
      //
      const redirect_url = this._getUrl(data);
      history.push(redirect_url);
      //
      this.props.setToPrepare(data.Settings, data.players);
    });

    PkApi.onReady(() => {
      let role = PkApi.getHostId() == PkApi.getUserId() ? consts.ROLE.HOST : consts.ROLE.VIEWER;
      if (role == consts.ROLE.HOST) {
        PkApi.registerOnP2pMsg((data) => {
          //{ 'from':INT, 'target':INT, 'type':STRING, 'msg_data':JSON }
          if (data && data.action) {
            let action = data.action;
            if (action == consts.GAME_SERVER_ACTION.JOIN) {
              //todo user join
              if (data.from) {

              }
            } else if (action == consts.GAME_SERVER_ACTION.P2PMESSAGE) {
              //todo user kick
              if (!data.msg_data) {
                return;
              }
              let uid = data.msg_data.idToBeKicked;
              let winnerId = data.msg_data.winnerId;
            }
          }
        })
      } else {
        //{“state_id”:1,”state_data”:{}}
        PkApi.registerGameStateChanged((data) => {
          if (data) {
            let gameData = data["state_data"];
            let stateId = data["state_id"];
            switch (stateId) {
              case consts.STATE.IDLE: {
                this.props.setToIdle();
                break;
              }
              case consts.STATE.PREPARE: {
                if (gameData
                  && gameData[consts.GameStoreKeys.GameDataKeys.Settings]) {
                  this.props.setToPrepare(gameData[consts.GameStoreKeys.GameDataKeys.Settings], gameData[consts.GameStoreKeys.GameDataKeys.Players]);
                }
                break;
              }
              case consts.STATE.START_ROLLING: {
                if (gameData
                  && gameData[consts.GameStoreKeys.GameDataKeys.Players]) {
                  this.props.setToStartRolling(gameData[consts.GameStoreKeys.GameDataKeys.Players]);
                }
                break;
              }
              case consts.STATE.STOP_ROLLING: {
                if (gameData
                  && gameData[consts.GameStoreKeys.GameDataKeys.Players]
                  && gameData[consts.GameStoreKeys.GameDataKeys.LuckGuy]) {
                  this.props.setToStopRolling(gameData[consts.GameStoreKeys.GameDataKeys.Players], gameData[consts.GameStoreKeys.GameDataKeys.LuckGuy]);
                }
                break;
              }
              case consts.STATE.PENDING_KICK: {
                if (gameData
                  && gameData[consts.GameStoreKeys.GameDataKeys.Players]
                  && gameData[consts.GameStoreKeys.GameDataKeys.LuckGuy]) {
                  this.props.setToPendingKick(gameData[consts.GameStoreKeys.GameDataKeys.Players], gameData[consts.GameStoreKeys.GameDataKeys.LuckGuy]);
                }
                break;
              }
              case consts.STATE.READY_TO_START_NEXT: {
                if (gameData
                  && gameData[consts.GameStoreKeys.GameDataKeys.Players]
                  && gameData[consts.GameStoreKeys.GameDataKeys.LuckGuy]
                  && gameData[consts.GameStoreKeys.GameDataKeys.BadLuckGuy]) {
                  this.props.setToReadyToStartNext(gameData[consts.GameStoreKeys.GameDataKeys.Players], gameData[consts.GameStoreKeys.GameDataKeys.LuckGuy], gameData[consts.GameStoreKeys.GameDataKeys.BadLuckGuy]);
                }
                break;
              }
              case consts.STATE.RESULT: {
                if (gameData
                  && gameData[consts.GameStoreKeys.GameDataKeys.Winner]
                  && gameData[consts.GameStoreKeys.GameDataKeys.Bonus]) {
                  this.props.setToResult(gameData[consts.GameStoreKeys.GameDataKeys.Winner], gameData[consts.GameStoreKeys.GameDataKeys.Bonus]);
                }
                break;
              }
            }
          }
        })
      }
    })
  }

  _checkIfStateDataValid(data) {
    //TODO To check all required keys
    try {
      const json = JSON.parse(data);
      if (
        !(consts.GameStoreKeys.GameDataKeys.Players in json) && !(consts.GameStoreKeys.GameDataKeys.Settings in json)) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  _getRole(data) {
    //TODO set role
    const currentUser = clientApi.getCurrentUserInfo();
    const host = clientApi.getHostInfo();
    const players = data[consts.GameStoreKeys.GameDataKeys.Players];

    if (currentUser.id === host.id) {
      return consts.ROLE.HOST;
    }

    if (currentUser.id in players) {
      return consts.ROLE.PARTICIPANT;
    }

    return consts.ROLE.VIEWER;
  }

  _getUrl(data) {
    switch (data.GameState) {
      case 'IDLE':
        return '/';
      case 'PREPARE':
        return '/game';
      case 'START_ROLLING':
        return '/game';
      case 'STOP_ROLLING':
        return '/game';
      case 'PENDING_KICK':
        return '/game';
      case 'READY_TO_START_NEXT':
        return '/game';
      case 'RESULT':
        return '/result';
      default :
        throw Error('error status type');
    }
  }

  render() {
    return (
      <div className="app" style={{ margin: Util.getPxFromDp(15) }}>
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MessageReceiver),
);
/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import  * as consts from '../consts';
import '../main.css';
import './Game.css';
import './APITest.css';
import { connect } from 'react-redux';
import { PkApi } from '../gameSDK';
import { Util } from '../util';

const mapStateToProps = state => ({
  gameStore: state.gameStore,
});

const mapDispatchToProps = dispatch => ({});

class APITest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameState: props.gameStore[consts.GameStoreKeys.GameState],
    };
    alert("APITest");
  }

  render() {
    let resultWidth = Util.getPxFromDp(200);
    return (
      <div className="api-test">
        <p>这是一个测试页面</p>
        <p>
          <button id="bt_report_game_ready" onClick={this.reportGameReady}>Report Game Ready</button>
        </p>
        <p>
          <button id="btGetUserId" onClick={this.getUserId}>getUserId</button>
        </p>
        <p>
          <button id="btGetHostId" onClick={this.getHostId}>getHostId</button>
        </p>
        <p>
          <button id="btGetGameId" onClick={this.getGameId}>getGameId</button>
        </p>
        <p>
          <button id="btGetGameSettings" onClick={this.getGameSettings}>getGameSettings</button>
        </p>
        <p>
          <button id="btReqNewRound" onClick={this.requestNewRound}>Req New Round</button>
        </p>
        <p>
          <button id="btRequestRoundStart" onClick={this.requestGameStart}>Request Game Start</button>
        </p>
        <p>
          <button id="btReportGameState" onClick={this.reportGameState}>Report Game State</button>
        </p>
        <p>
          <button id="btSubmitResult" onClick={this.submitGameResult}>Submit Round Result</button>
        </p>
        <p>
          <button id="btRequestJoinARound" onClick={this.requestJoinRound}>Request Join A Round</button>
        </p>
        <p>
          <button id="btRequestExtend" onClick={this.requestExtend}>Request extend</button>
        </p>

        <p>
          <button id="btOpenUrl" onClick={this.openUrl}>openUrl</button>
        </p>
        <p>
          <button id="btGetSessionDatas" onClick={this.getSessionDatas}>getSessionDatas</button>
        </p>
        <p>
          <button id="btGetUsers" onClick={this.getUsers}>getUsers</button>
        </p>
        <p>
          <button id="btToast" onClick={this.showToast}>Toast</button>
        </p>
        <p>
          <button id="btLogToApp" onClick={this.logToApp}>Log To App</button>
        </p>

        <p>
          <button id="openGame" onClick={this.openGame}>Open Game</button>
        </p>

        <div className="result" style={{ width: resultWidth, height: resultWidth,wordBreak:'break-all' }} ref="result"></div>
      </div>
    )
  }

  openGame = () => {
    this.props.history.push('/game');
  };

  reportGameReady = () => {
    this.refs.result.innerHTML = '1233';
  };

  getUserId = () => {
    let userId = PkApi.getSessionData('user_id');
    this.refs.result.innerHTML = userId + "";
  };

  getHostId = () => {
    let hostId = PkApi.getSessionData('host_id');
    this.refs.result.innerHTML = hostId + "";
  };

  getGameId = () => {
    let gameId = PkApi.getSessionData('game_id');
    this.refs.result.innerHTML = gameId + "";
  };

  getGameSettings = () => {
    let setting = PkApi.getSessionData('game_settings');
    this.refs.result.innerHTML = JSON.stringify(setting);
  };

  requestNewRound = () => {
    let requestData = {
      "fee": 0,
      "host_raise_fee": 0,
      "join_method": 0,
      "max_player": 8
    }
    PkApi.requestNewRound(requestData, (data) => {
      this.refs.result.innerHTML = JSON.stringify(data);
    })
  };

  requestGameStart = () => {

  };

  reportGameState = () => {
    PkApi.reportGameState(1, { user: [12, 12] }, 500)
  };

  submitGameResult = () => {

  };

  requestJoinRound = () => {

  };

  requestExtend = () => {

  };

  openUrl = () => {

  };

  getSessionDatas = () => {
    let data = PkApi.getSessionDatas();
    this.refs.result.innerHTML = JSON.stringify(data);
  };

  getUsers = () => {
    PkApi.registerGameStateChanged((data) => {
      this.refs.result.innerHTML = JSON.stringify(data);
    })

    //let ret = {
    //  "code":200,
    //  "array":
    //  [
    //    {
    //      "id": 180769,
    //      "name": "guest",
    //      "level": 0,
    //      "role": 0,
    //      "profile_url": "https://d.rings.me/images/2016/02/23/a1/__/a187d9ddeeb119aaf6ed860d1$a3fbfa20160223.png",
    //      "verified": false,
    //      "gender": 0,
    //      "tagline": "",
    //      "broadcast_count": 0,
    //      "fans_count": 0,
    //      "following_count": 0,
    //      "following": false,
    //      "suid": "",
    //      "vip": 0,
    //      "host_title": 0,
    //      "looper_title": 0
    //    }
    //  ]
    //};
    PkApi.getUsers({ user_ids: [118679] }, (data) => {
      this.refs.result.innerHTML = JSON.stringify(data);

    });
  };

  showToast = () => {

  };

  logToApp = () => {

  };

  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(APITest);
/**!
 * 本文件对PK App 通过javascript 提供的功能进行了封装。
 * 使用方法：直接嵌入html5 页面，并注册相关的事件。
 * 主要功能有：
 * · 输出日志。
 * · 报告Game Ready。
 * · 向App 汇报当前游戏状态。
 * · 查询App 提供的session data，包括 gameId， userId, hostId……
 * · 等等。
 * 注意：所有功能都要在API 准备好以后才能进行，因此建议放到 onReady 回调里。
 *
 * @author Ken
 */
// constants
var STATE_IDLE = 0;
var STATE_PREPARING = STATE_IDLE + 1;
var STATE_RESULT = 255;
var SYSTEM_STATE_TTL = 10000;// 10 seconds
// end of const

var mHostId = 0;
var mMyUserId = 0;

/**
 * 当API 准备好后执行，使用方法：
 * PKApi.ready(function(Api){
     *     // 参数中的Api，即是PKApi 对象
     * });
 * @param readyCallback
 */
function onPKJSBridgeReady(readyCallback) {
  if (readyCallback && typeof readyCallback === 'function') {
    var Api = this;
    var pkReadyFunc = function() {
      mMyUserId = Api.getSessionData('user_id');
      mHostId = Api.getSessionData('host_id');

      readyCallback(Api);
    };
    if (typeof window.window.PKJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('window.PKJSBridgeReady', pkReadyFunc, false);
      } else if (document.attachEvent) {
        document.attachEvent('window.PKJSBridgeReady', pkReadyFunc);
        document.attachEvent('onwindow.PKJSBridgeReady', pkReadyFunc);
      }
    } else {
      pkReadyFunc();
    }
  }
}

/**
 * 注册一个回调，当PK 游戏页面离开屏幕的时候回调
 */
function onPKJsSysPause(pauseCallback) {
  window.PKJSBridge.on('sys:onpause', pauseCallback);
}

/**
 * 注册一个回调，当PK 游戏页面重新回到屏幕的时候回调
 */
function onPKJsSysResume(resumeCallback) {
  window.PKJSBridge.on('sys:onresume', resumeCallback);
}

/**
 * 获取一个会话数据。
 * @param key 是一个字符串
 */
function getSessionDataImpl(key) {
  return window.PKJSBridge.env(key);
}

function getSessionDatasImpl() {
  return window.PKJSBridge.session_datas();
}

/**
 * 向PK App 汇报当前已经游戏加载好了
 */
function reportGameReadyImpl(gameId) {
  window.PKJSBridge.call('reportGameReady', { 'game_id': gameId });
}

/**
 * 向App 汇报当前游戏状态。
 * 注意 如果当前尚未准备好（requestNewRound 没有得到成功的返回），除 STATE_IDLE 之外的任何状态信息都不会被传递。
 */
function reportGameStateImpl(stateId, stateData, stateTtl) {
  window.PKJSBridge.call('reportState', { 'state_id': stateId, 'state_data': stateData, 'state_ttl': stateTtl });
}

/**
 * 注册游戏状态更新
 * @param {Function} stateCallback(stateObj) stateObj 结构为 { "state_id":0, "state_data":{...} }
 */
function registerGameStateChangedImpl(stateCallback) {
  window.PKJSBridge.on('setState', stateCallback);
}

/**
 * 批量获取用户信息
 * @param userIds 结构为 { "user_ids": [100001, 200003, 123456] }
 * @param {Function} getUsersCallback(users) users 结构是 {"users":[ {...}, {...}, ... ]}, 包含所请求的所有用户信息（只要是客户端能取到且允许的）。不保证users 里的顺序和userIds 的顺序相同。
 */
function getUsersImpl(userIds, getUsersCallback) {
  window.PKJSBridge.invoke('getUsers', userIds, getUsersCallback);
}

/**
 * For HOST only.
 * @param data is the data to be sent, it should contain settings.
 * @param {Function} respCallback(respData) will be invoked when server responses.
 */
function requestNewRoundImpl(data, respCallback) {
  window.PKJSBridge.invoke('requestNewRound', data, respCallback);
}

/**
 * For HOST only.
 * @param data is the data to be sent
 * @param {Function} respCallback(respData) will be invoked when server responses.
 */
function requestRoundStartImpl(data, respCallback) {
  window.PKJSBridge.invoke('requestStartARound', data, respCallback);
}

/**
 * For HOST only.
 * @param data is the data to be sent, it should contain bonus, etc
 * @param {Function} respCallback(respData) will be invoked when server responses.
 */
function submitRoundResultImpl(data, respCallback) {
  window.PKJSBridge.invoke('submitRoundResult', data, respCallback);
}

/**
 * For NON-HOST only.
 * @param data is the data to be sent.
 * @param {Function} respCallback(respData) will be invoked when server responses.
 */
function requestJoinARoundImpl(data, respCallback) {
  window.PKJSBridge.invoke('requestJoinARound', data, respCallback);
}

/**
 * Available for all.
 * @param data is the data to be sent.
 * @param {Function} respCallback(respData) will be invoked when server responses.
 */
function requestExtendImpl(data, respCallback) {
  window.PKJSBridge.invoke('requestExtend', data, respCallback);
}

/**
 * display a toast.
 * @param text is the string to be displayed.
 */
function toastImpl(text) {
  window.PKJSBridge.call('toast', { 'text': text });
}

/**
 * Register a callback to handle incoming p2p message.
 * @param {Function} onP2pCallback(msgObj) , msgObj structure is { 'from':INT, 'target':INT, 'type':STRING, 'msg_data':JSON }
 */
function registerOnP2pMsgImpl(onP2pCallback) {
  window.PKJSBridge.on('p2pMsg', onP2pCallback);
}

/**
 * 主app 跳转到指定页面。
 * @param url 为要跳转到的url。
 * @param closeThis 为一个int 值，默认为0，非0则表示跳转后关闭当前页面。
 */
function openUrlImpl(url, closeThis) {
  window.PKJSBridge.invoke('openUrl', { 'url': url, 'closeThis': closeThis });
}

function logToAppImpl(msg) {
  window.PKJSBridge.call('log', { 'msg': msg });
}

export const PkApi = {
  version: '2.0',
  onReady: onPKJSBridgeReady,
  registerOnPause: onPKJsSysPause,
  registerOnResume: onPKJsSysResume,
  getSessionData: getSessionDataImpl,
  openUrl: openUrlImpl,
  getSessionDatas: getSessionDatasImpl,
  getUsers: getUsersImpl,
  reportGameReady: reportGameReadyImpl,
  reportGameState: reportGameStateImpl,
  registerGameStateChanged: registerGameStateChangedImpl,
  requestNewRound: requestNewRoundImpl,
  requestRoundStart: requestRoundStartImpl,
  submitRoundResult: submitRoundResultImpl,
  requestJoinARound: requestJoinARoundImpl,
  requestExtend: requestExtendImpl,
  registerOnP2pMsg: registerOnP2pMsgImpl,
  toast: toastImpl,
  logToApp: logToAppImpl,
};
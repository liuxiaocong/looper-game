/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 29/6/17.
 */

class API {
  constructor(actionName) {
    this.actionName = actionName;
  }

  send(data) {
    const request = {
      'action': this.actionName,
      'request': data,
    };
    console.log(request);
  }
}

export default {
  'IN_GAME_START': new API('IN_GAME_START'),
  'IN_GAME_CHECK_STATUS': new API('IN_GAME_START'),
  'IN_GAME_KICK': new API('IN_GAME_START'),
}
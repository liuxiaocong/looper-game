/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 27/6/17.
 */
import axios from 'axios';
import * as _ from 'lodash';
import io from 'socket.io-client';

const BaseURL = 'http://192.168.128.64:2200';

class API {

  constructor(url, method = 'get', params = {}) {
    this.url = url;
    this.method = method;
    this.params = params;
  }

  request() {
    const requestParams = {
      url: BaseURL + this.url,
      method: this.method,
    };

    if (_.lowerCase(this.method) === 'get') {
      requestParams.params = this.params;
    } else {
      requestParams.data = this.params;
    }

    return axios.request(requestParams);
  }
}

export const api = {
  'prepare': new API('/game/round/prepare'),
  'start': new API('/game/round/start'),
  'end': new API('/game/round/end'),
  'status': new API('/game/round/status'),
};

export const clientApi = {
  'getCurrentUserInfo': () => ({ id: 1 }),
  'getHostInfo': () => ({ id: 2 }),
};

export const socket = io.connect('ws://172.28.0.65:5000');

//const testData = {
//  role: 'HOST', // ['HOST', 'VIEWER', 'PARTICIPANT']
//  status: 'IDLE', // ['IDLE', 'PREPARE', 'START_ROLLING', 'STOP_ROLLING', 'PENDING_KICK', 'READY_TO_START_NEXT', 'RESULT']
//  players: [1, 2, 3],
//  settings: {
//    entranceFee: 10,
//    maxPlayer: 8,
//  },
//  luckyGuy: 1,
//  badLuckGuy: 2,
//  winner: 3,
//};
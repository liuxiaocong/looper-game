/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 21/6/17.
 */
export const STATE = {
  IDLE: 0,
  PREPARE: 1,
  START_ROLLING: 2,
  STOP_ROLLING: 3,
  PENDING_KICK: 4,
  READY_TO_START_NEXT: 5,
  RESULT: -1,
};

export const ROLE = {
  HOST: 'HOST',
  PARTICIPANT: 'PARTICIPANT',
  VIEWER: 'VIEWER',
};

export const TEXT = {
  WAIT_JOIN: 'Waiting Players to join …',
  CAN_JOIN: 'You can click Join WRMRLQJDPHHost can start game anytime..',
  WAIT_NEXT_ROUND: 'Sorry, all positions are taken.    Please try again when host starts a new game',
  JOIN_SUCCESS_AND_WAIT_START: 'You joint the game successfully  Waiting host to start ...',
  WAIT_KICK: '%0% is the winner this round! Waiting %0% to kick out one player',
  KICK_RESULT_GUEST: '%0% has been kicked out by %1% ,Waiting host to start next round',
  KICK_RESULT_HOST: '%0% has been kicked out by %1% ,Tap start for next round',
};

export const LOOPER = {
  INIT_SPEED: 0,
  SPEED: {
    //x : [0,PI/2]
    SPEED_UP_TIME: 3000,
    MAX_SPEED_KEEP_TIME: 1000,
    COEFFICIENT: 0.6,
    MAX_SPEED: 0.6 * 1,
    MIN_SPEED: 0.1,
    SPEED_DOWN_TIME: 3000,
    PENDING_ROUND_BEFORE_STOP: 3,
    TIME_PERIOD_WHEN_RECEIVE_STOP: 3000,
  },
};

export const UI = {
  LOOPER_SIZE: 290,
  AVATAR_SIZE: 36,
  START_BUTTON_SIZE: 68,
  LOOPER_COLORS: [
    // '#000000',
    '#fda76e',
    '#ffc26d',
    '#34d939',
    '#73dceb',
    '#3e99d2',
    '#908fef',
    '#d17cfc',
    '#fe89b1',
    '#ff6e6e',
    '#ff5b85'],
  LINE_IMAGE: {
    WIDTH: 7.5,
    HEIGHT: 128,
  },
};

export const DEBUG_DATA = {
  USER_LIST: [
    {
      id: 1,
      name: 'name1',
      avatar: 'https://wangsu-image.rings.tv/images/2016/02/23/3b/__/3b1fda4a52c37d57bd4def3ec$fbb2a220160223.png',
    },
    {
      id: 2,
      name: 'name2',
      avatar: 'https://lh5.googleusercontent.com/-Gq_grbbRHlo/AAAAAAAAAAI/AAAAAAAAAEY/PN3ZUIY_EOw/photo.jpg',
    },
    {
      id: 3,
      name: 'name3',
      avatar: 'https://wangsu-image.rings.tv/images/2016/06/21/e1/0/e15afd1da0ec48fcf9ccae66f$e3c59d20160621.jpeg',
    },
    {
      id: 4,
      name: 'name4',
      avatar: 'https://wangsu-image.rings.tv/images/2017/02/12/12/__/6ac7114233554d9f9926dd2218bce8b4$bec5bd.jpeg',
    },
    {
      id: 5,
      name: 'name5',
      avatar: 'https://wangsu-image.rings.tv/images/2016/12/28/08/__/91f5621d9c48486d866e974f172e6de4$39697f.jpeg',
    },
    {
      id: 6,
      name: 'name6',
      avatar: 'https://wangsu-image.rings.tv/images/2016/02/23/25/__/25e67c18df7a2d84404d3dc2f$fbeac920160223.png',
    },
    {
      id: 7,
      name: 'name7',
      avatar: 'https://wangsu-image.rings.tv/images/2016/02/23/3b/__/3b1fda4a52c37d57bd4def3ec$fbb2a220160223.png',
    },
    {
      id: 8,
      name: 'name8',
      avatar: 'https://wangsu-image.rings.tv/images/2016/08/04/94/0/94f97f538a8541998619213fb$cc1c6420160804.png',
    },
    {
      id: 9,
      name: 'name9',
      avatar: 'https://lh5.googleusercontent.com/-VkMI2YkDnrY/AAAAAAAAAAI/AAAAAAAAABA/OqN9wo-lExg/s120/photo.jpg',
    },
    {
      id: 10,
      name: 'name10',
      avatar: 'https://wangsu-image.rings.tv/images/2016/06/04/47/__/47d1e65fe0762cc77b6aa09b4$d7c2af20160604.jpeg',
    }],
};

export const SettingKeys = {
  EntranceFee: 'EntranceFee',
  MaxPlayer: 'MaxPlayer',
};

export const GameStoreKeys = {
  CurrentUserList: 'CurrentUserList',
  GameState: 'GameState',
  GameData: 'GameData',
  Role: 'Role',
  GameDataKeys: {
    Settings: 'Settings',
    Players: 'Players',
    LuckGuy: 'LuckGuy',
    BadLuckGuy: 'BadLuckGuy',
    Winner: 'Winner',
    Bonus: 'Bonus',
  },
};

export const Globe = {
  isFixSizeModel: false,
};

export const CLIENT_RESPONSE_CODE = {
  NETWORK_ERROR: -1,
  SUCCESS: 200
};

export const SERVER_RESPONSE_CODE = {
  SUCCESS: 0,
};

export const GAME_SERVER_ACTION = {
  //use for kick user
  P2PMESSAGE: 100,
  JOIN: 101
}

const user = {
  id: 1,
  name: 'name1',
  avatar: 'https://wangsu-image.rings.tv/images/2016/02/23/3b/__/3b1fda4a52c37d57bd4def3ec$fbb2a220160223.png',
};

console.log(JSON.stringify(user));
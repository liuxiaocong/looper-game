/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import * as actionTypes from './actionTypes';
import * as consts from '../consts';

/*
 * action creators
 */
export function setMaxPlayer(maxPlayer) {
  return { type: actionTypes.SET_MAX_PLAYER, maxPlayer }
}

export function setEntranceFee(fee) {
  return { type: actionTypes.SET_ENTRANCE_FEE, fee }
}

export function setToIdle() {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: consts.STATE.IDLE,
    gameData: {},
  }
}

export function setToPrepare(settings, players) {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: consts.STATE.PREPARE,
    gameData: {
      [consts.GameStoreKeys.GameDataKeys.Settings]: settings,
      [consts.GameStoreKeys.GameDataKeys.Players]: players,
    },
  }
}

export function setToStartRolling(players) {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: consts.STATE.START_ROLLING,
    gameData: {
      [consts.GameStoreKeys.GameDataKeys.Players]: players,
    },
  }
}

export function setToStopRolling(players, luckGuy) {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: consts.STATE.STOP_ROLLING,
    gameData: {
      [consts.GameStoreKeys.GameDataKeys.Players]: players,
      [consts.GameStoreKeys.GameDataKeys.LuckGuy]: luckGuy,
    },
  }
}

export function setToPendingKick(players, luckGuy) {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: consts.STATE.PENDING_KICK,
    gameData: {
      [consts.GameStoreKeys.GameDataKeys.Players]: players,
      [consts.GameStoreKeys.GameDataKeys.LuckGuy]: luckGuy,
    },
  }
}

export function setToReadyToStartNext(players, luckGuy, badLuckGuy) {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: consts.STATE.READY_TO_START_NEXT,
    gameData: {
      [consts.GameStoreKeys.GameDataKeys.Players]: players,
      [consts.GameStoreKeys.GameDataKeys.LuckGuy]: luckGuy,
      [consts.GameStoreKeys.GameDataKeys.BadLuckGuy]: badLuckGuy,
    },
  }
}

export function setToResult(winner, bonus) {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: consts.STATE.RESULT,
    gameData: {
      [consts.GameStoreKeys.GameDataKeys.Winner]: winner,
      [consts.GameStoreKeys.GameDataKeys.Bonus]: bonus,
    },
  }
}

export function setRole(role) {
  return { type: actionTypes.SET_ROLE, role };
}
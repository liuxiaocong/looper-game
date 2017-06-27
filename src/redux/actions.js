/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import * as actionTypes from './actionTypes';

/*
 * action creators
 */
export function setMaxPlayer(maxPlayer) {
  return { type: actionTypes.SET_MAX_PLAYER, maxPlayer }
}

export function setEntranceFee(fee) {
  return { type: actionTypes.SET_ENTRANCE_FEE, fee }
}
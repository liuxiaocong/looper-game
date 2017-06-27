/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import * as actionTypes from './actionTypes';
import { SettingKeys } from '../consts';

const initialState = {
  settings: {
    [SettingKeys.EntranceFee]: 10,
    [SettingKeys.MaxPlayer]: 8,
  },
};


export default function game(state = initialState, action) {

  switch (action.type) {
    case actionTypes.SET_MAX_PLAYER:
      return Object.assign({}, state,
        {
          settings: {
            ...state.settings,
            [SettingKeys.MaxPlayer]: action.maxPlayer,
          },
        },
      );
    case actionTypes.SET_ENTRANCE_FEE:
      return Object.assign({}, state,
        {
          settings: {
            ...state.settings,
            [SettingKeys.EntranceFee]: action.fee,
          },
        },
      );
    default:
      console.log('unhandled action type');
      console.log(action);
      return state;
  }

}
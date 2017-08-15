/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import * as actionTypes from './actionTypes';
import { SettingKeys, GameStoreKeys, DEBUG_DATA } from '../consts';
import  * as consts from '../consts';
const initialState = {
  settings: {
    [SettingKeys.EntranceFee]: 10,
    [SettingKeys.MaxPlayer]: 8,
  },
  gameStore: {
    [GameStoreKeys.GameData]: {
      [GameStoreKeys.GameDataKeys.Players]: DEBUG_DATA.USER_LIST,
      [GameStoreKeys.GameDataKeys.BadLuckGuy]: DEBUG_DATA.USER_LIST[0],
      [GameStoreKeys.GameDataKeys.LuckGuy]: DEBUG_DATA.USER_LIST[2],
      [GameStoreKeys.GameDataKeys.Winner]: DEBUG_DATA.USER_LIST[4],
      [GameStoreKeys.GameDataKeys.Bonus]: 50,
      [GameStoreKeys.GameDataKeys.Settings]: {},
    },
    [GameStoreKeys.GameState]: consts.STATE.PREPARE,
    [GameStoreKeys.Role]: consts.ROLE.HOST,
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
    case actionTypes.SET_GAME_STATE:
      return Object.assign({}, state,
        {
          gameStore: {
            ...state.gameStore,
            [GameStoreKeys.GameState]: action.gameState,
            [GameStoreKeys.GameData]: action.gameData,
          },
        },
      );
    case actionTypes.SET_ROLE:

      return Object.assign({}, state,
        {
          gameStore: {
            ...state.gameStore,
            [GameStoreKeys.Role]: action.role,
          },
        },
      );
    case actionTypes.SET_GAME_DATA:
      return Object.assign({}, state,
        {
          gameData: action.gameData,
        },
      );
    default:
      console.log('unhandled action type');
      console.log(action);
      return state;
  }
}
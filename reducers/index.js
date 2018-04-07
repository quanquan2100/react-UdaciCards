import { combineReducers } from 'redux'
import { sortByTime } from "../utils/helper"

import {
  FETCH_DECKS,
  NEW_DECK,
  SET_CURRENT_DECK,
} from "../actions"

/**
 * 全局相关 reducer
 */

const globalState = {
  currentDeck: ""
}

function globalReducer(state = globalState, action) {
  switch (action.type) {
    case SET_CURRENT_DECK:
      return {
        ...state,
        currentDeck: action.id
      };
    default:
      return state;
  }
}


/**
 * 分类相关 reducer
 */

const deckState = {
  decks: {},
  decksArr:[]
}

function deckReducer(state = deckState, action) {
  let copy, copy2;
  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        decks: Object.assign({}, action.decks),
        decksArr: Object.keys(action.decks).sort(sortByTime)
      };
    case NEW_DECK:
      copy = state.decksArr.concat();
      copy.unshift(action.id)
      copy2 = Object.assign({}, state.decks)
      copy2[action.id] = {
        title: action.title,
        questions: []
      }
      return {
        ...state,
        decksArr: copy,
        decks: copy2
      }
    default:
      return state;
  }
}

export default combineReducers({
  globalReducer,
  deckReducer,
});
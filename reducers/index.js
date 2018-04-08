import { combineReducers } from 'redux'
import { sortByTime } from "../utils/helper"

import {
  FETCH_DECKS,
  NEW_DECK,
  SET_CURRENT_DECK,
  NEW_CARD,
  // START_QUIZ
} from "../actions"

/**
 * 全局相关 reducer
 */

const globalState = {
  currentDeck: "",
  // currentCard: 0,
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
    case NEW_CARD:
      copy2 = Object.assign({}, state.decks)
      copy2[action.deckId].questions = state.decks[action.deckId].questions.concat()
      copy2[action.deckId].questions.push(action.card)
      return {
        ...state,
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
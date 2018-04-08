export const FETCH_DECKS = "FETCH_DECKS";
export const NEW_DECK = "NEW_DECK";
export const SET_CURRENT_DECK="SET_CURRENT_DECK"
export const NEW_CARD = "NEW_CARD"
// export const START_QUIZ = "START_QUIZ"

export const fetchDecks = (decks) => {
  return {
    type: FETCH_DECKS,
    decks
  }
}

export const newDeck = (id, title) => ({
  type: NEW_DECK,
  id,
  title
})

export const setCurrentDeck = (id) => ({
  type: SET_CURRENT_DECK,
  id
})

export const newCard = (deckId, card) => ({
  type: NEW_CARD,
  deckId,
  card
})

// export const startQuiz = () => ({
//   type: START_QUIZ
// })
// getDecks: 返回包含卡片集标题、问题及答案信息的所有卡片集。 
// getDeck: 传入单个id参数并返回与该id相关的卡片集。 
// saveDeckTitle: 传入单个id参数并将其添加至卡片集 
// addCardToDeck: 传入两个参数，即标题和卡片，然后将卡片添加至带有相关标题的卡片集下的问题列表

import { AsyncStorage } from 'react-native'
// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'

const DECKS_STORAGE_KEY = "decks";


// Generate a unique token for storing your bookshelf data on the backend server.
let token = null;
AsyncStorage.getItem("token")
  .then((value) => {
    // if (true) {
    if (value === null) {
      const defaultData = {
        ["1523097278489"]: {
          title: 'React',
          questions: [
            {
              id: "1523097337115",
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              id: "1523097380046",
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        ["1523097306818"]: {
          title: 'JavaScript',
          questions: [
            {
              id: "1523097358286",
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
      };
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(defaultData))
        .then((data) => (AsyncStorage.setItem("token", Math.random().toString(36).substr(-8))))
    } else {
      return value;
    }
  }).then((value) => {
    token = value;
  })


export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => (JSON.parse(data)))
}

// export function getDeck (id) {
//   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
//     .then(data => {
//       //获取特定 id 的值
//       if(data){
//       }
//       return data;
//     })
// }

export function saveDeckTitle (title) {
  const id = Date.now() + "";
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => {
      const value = JSON.parse(data)
      value[id] = {
        title,
        questions: []
      }
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(value));
    }).then(data => {
      return {id, title}
    })
}

export function addCardToDeck (id, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => {
      // 创建问题卡片
      //
      return data;
    })
}

// export function fetchCalendarResults () {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then(formatCalendarResults)
// }

// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }
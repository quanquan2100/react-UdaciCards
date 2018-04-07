// getDecks: 返回包含卡片集标题、问题及答案信息的所有卡片集。 
// getDeck: 传入单个id参数并返回与该id相关的卡片集。 
// saveDeckTitle: 传入单个id参数并将其添加至卡片集 
// addCardToDeck: 传入两个参数，即标题和卡片，然后将卡片添加至带有相关标题的卡片集下的问题列表

import { AsyncStorage } from 'react-native'
// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'

const DECKS_STORAGE_KEY = "decks";

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function getDeck (id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => {
      //获取特定 id 的值
      //
      return data;
    })
}
export function saveDeckTitle (id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => {
      // 创建卡片级
      //
      return data;
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
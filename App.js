import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View, Platform, StatusBar, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from './utils/colors' 
import DecksList from "./components/DecksList";
import CreateQuestion from "./components/CreateQuestion";
import DeckDetail from "./components/DeckDetail";
import Quiz from "./components/Quiz";
import CreateDeck from "./components/CreateDeck";
import { getDecks } from "./utils/api"
import { fetchDecks } from "./actions"
import { setLocalNotification, clearLocalNotification } from './utils/helper'

// 状态栏设置
function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// tab 导航设置
const Tabs = TabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-create-outline' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

// 堆栈导航设置
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      // title: "Deck Detail",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      title: "Create Deck",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  CreateQuestion: {
    screen: CreateQuestion,
    navigationOptions: {
      title: "Create Question",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
})


var store = createStore(reducer);


export default class App extends React.Component {
  componentDidMount() {
    // 设置通知提醒
    clearLocalNotification()
    setLocalNotification()
    
    getDecks()
      .then((data) => {
        store.dispatch(fetchDecks(data))
      })
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          
          <MainNavigator />

        </View>
      </Provider>
    );
  }
}


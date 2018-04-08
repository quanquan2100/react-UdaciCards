import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, bluegray, darkgray, black , yellow} from '../utils/colors'
import { getDecks } from "../utils/api"
import { fetchDecks, setCurrentDeck } from "../actions"


class DecksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(1),
    }
  }

  componentDidMount() {
    const { navigation, decks } = this.props;
    const params = navigation.state.params;
    if (params && params.enter) {
      this.props.selectDeck(params.enter)
      navigation.navigate('DeckDetail', { name: decks[params.enter].title })
    }
  }

  render() {
    const { decks, decksArr, selectDeck, navigation } = this.props;
    const { bounceValue } = this.state;
    return (
      <ScrollView>
        <View style={[styles.header]} >
          <Text style={[styles.title, {color: white}]}>Total {decksArr.length} Decks</Text>
        </View>
        <View style={styles.deckContainer} >
          {

            decksArr.map((deckId) => {
              let animateVal = new Animated.Value(1);
              return (
                <Animated.View 
                  style={[styles.deck, styles.shadow, {transform: [{scale: animateVal}]} ]}
                  key={deckId} 
                  >
                  <TouchableOpacity onPress={() => {
                    Animated.sequence([
                      Animated.timing(animateVal, { duration: 100, toValue: 1.04}),
                      Animated.spring(animateVal, { toValue: 1, friction: 4})
                    ]).start(() => {
                      selectDeck(deckId)
                      navigation.navigate('DeckDetail', { name: decks[deckId].title })
                    })
                  } } style={styles.container}>
                  <Text style={styles.deckTitle} >{decks[deckId].title}</Text>
                  <Text style={styles.deckInfo} >{decks[deckId].questions.length} Cards</Text>
                  </TouchableOpacity>
                </Animated.View>
              )
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    // fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
    "backgroundColor": yellow,
    color: white,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
  },
  shadow: {
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  deckContainer: {
  },
  deck: {
    height: 200,
    margin: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: white,
    borderRadius: 5,
  },
  deckTitle: {
    fontSize: 25,
    marginBottom: 10,
  },
  deckInfo: {
    color: bluegray,
  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps ({globalReducer, deckReducer}) {
  return {
    decks: deckReducer.decks,
    decksArr: deckReducer.decksArr
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectDeck: (id) => (dispatch(setCurrentDeck(id)))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksList);

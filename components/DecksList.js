import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, bluegray, darkgray, black , yellow} from '../utils/colors'
import { getDecks } from "../utils/api"
import { fetchDecks, setCurrentDeck } from "../actions"


class DecksList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log("props", this.props)
    // const { dispatch } = this.props;
    // console.log("dispatch is", dispatch)
    // getDecks()
    //   .then((data) => {
    //     console.log('data ',data);

    //     dispatch(fetchDecks(data))
    //   })
    // this.props.fetchDecks();
  }

  render() {
    const { decks, decksArr, selectDeck, navigation } = this.props;
    
    return (
      <ScrollView>
        <View style={[styles.header]} >
          <Text style={[styles.title, {color: white}]}>Total {decksArr.length} Decks</Text>
        </View>
        <View style={styles.deckContainer} >
          {
            decksArr.map((deckId) => (
              <TouchableOpacity 
                style={[styles.deck, styles.shadow]} 
                key={deckId} 
                onPress={() => {
                  selectDeck(deckId)
                  navigation.navigate('DeckDetail', { name: decks[deckId].title, id: deckId })
                } }>
                <Text style={styles.deckTitle} >{decks[deckId].title}</Text>
                <Text style={styles.deckInfo} >{decks[deckId].questions.length} Cards</Text>
              </TouchableOpacity>
            ))
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
    fontWeight: "0.4",
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
    alignItems: 'center',
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

import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button } from 'react-native'
import { connect } from 'react-redux'
// import { getDecks } from "../utils/api"
import { purple, white, bluegray, darkgray, black , yellow} from '../utils/colors'

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params

    return {
      title: name
    }
  }

  render() {
    const { navigation, decks, currentDeck } = this.props;
    // console.log(navigation)
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={styles.deckTitle}>{decks[currentDeck].title}</Text>
        <Text style={styles.deckInfo}>{decks[currentDeck].questions.length} cards</Text>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: white, color: yellow}]}
          onPress={() => navigation.navigate('CreateQuestion')}
          underlayColor='#fff'>
          <Text style={[styles.btnText, {color: yellow}]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: yellow, color: white}]}
          onPress={() => navigation.navigate('Quiz')}
          underlayColor='#fff'>
          <Text style={[styles.btnText, {color: white}]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  btn: {
    borderColor: yellow,
    padding: 15,
    width: 220,
    marginBottom: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  btnText: {
    fontSize: 20,
  },
  deckTitle: {
    fontSize: 30,
    marginBottom: 20,
  },
  deckInfo: {
    color: bluegray,
    marginBottom: 100,
  },
});

function mapStateToProps ({globalReducer, deckReducer}) {
  return {
    decks: deckReducer.decks,
    currentDeck: globalReducer.currentDeck,
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);


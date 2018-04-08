import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { purple, white, bluegray, darkgray, black , yellow} from '../utils/colors'
import { addCardToDeck } from "../utils/api"
import { newCard } from "../actions"

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addCard, currentDeck } = this.props;
    // const { question, answer } = this.refs;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.deckTitle}>Input the question.</Text>
          <TextInput style={styles.input} ref="question"/>
        </View>
        <View style={styles.row}>
          <Text style={styles.deckTitle}>Input the answer.</Text>
          <TextInput style={styles.input} ref="answer" />
          <Text style={styles.smallText}>Input Y/N is a judgment question</Text>
        </View>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: white, color: yellow}]}
          onPress={() => {
            if (!this.refs.question._lastNativeText || !this.refs.answer._lastNativeText) {
              return;
            }
            const question = this.refs.question._lastNativeText.trim();
            let answer = this.refs.answer._lastNativeText.trim();
            if (answer === "Y") {
              answer = true;
            } else if (answer === "N") {
              answer = false;
            }
            addCard({question, answer}, currentDeck)
          }}
          underlayColor='#fff'>
          <Text style={[styles.btnText, {color: yellow}]}>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallText: {
    color: bluegray,
    fontSize: 14,
  },
  row: {
    alignItems: "center",
    marginBottom: 15,
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: yellow, 
    borderWidth: 1,
    backgroundColor: white,
    margin: 15,
    width: 300,
    borderRadius: 3,
  },
  btn: {
    borderColor: yellow,
    padding: 15,
    width: 220,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: 50,
  },
  btnText: {
    fontSize: 20,
  },
  deckTitle: {
    fontSize: 23,
  }
});

function mapStateToProps ({globalReducer, deckReducer}) {
  return {
    currentDeck: globalReducer.currentDeck
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    addCard: (card, deckId) => {
      addCardToDeck(card, deckId)
        .then(data => {
          dispatch(newCard(deckId, data))
          navigation.goBack()
        })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateQuestion);

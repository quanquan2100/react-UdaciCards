import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, TextInput } from 'react-native'
import { connect } from 'react-redux';
import { newDeck } from "../actions";
import { saveDeckTitle } from "../utils/api"
import { purple, white, bluegray, darkgray, black , yellow} from '../utils/colors'

class CreateDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    }
  }
        // <TextInput autoFocus style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}} value={title}  onChangeText={(title) => this.setState({title})} />

  render() {
    const { title } = this.state;
    const { addDeck } = this.props;
    return (
      <View style={styles.container} >
        <Text style={styles.btnText}>What is the title of your new deck?</Text>
        <TextInput autoFocus style={styles.input} ref="input" />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (!this.refs.input._lastNativeText) {
              return;
            }
            addDeck(this.refs.input._lastNativeText.trim())
          }}
          underlayColor='#fff'>
          <Text style={[styles.btnText, {color: white}]}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  btnText: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
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
    backgroundColor: yellow,
  },
});

function mapStateToProps ({globalReducer, deckReducer}) {
  return {
    decks: deckReducer.decks,
    decksArr: deckReducer.decksArr
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  console.log(arguments);
  return {
    addDeck: (title) => {
      if (title.length === 0) {
        return;
      }
      saveDeckTitle(title)
        .then((data) => {
          dispatch(newDeck(data.id, data.title));
          navigation.navigate("Home", { enter: data.id })
        })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDeck);

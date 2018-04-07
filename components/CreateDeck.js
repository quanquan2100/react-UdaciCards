import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, TextInput } from 'react-native'
import { connect } from 'react-redux';
import { newDeck } from "../actions";
import { saveDeckTitle } from "../utils/api"

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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}} >
        <Text>What is the title of your new deck?</Text>
        <TextInput autoFocus style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}} ref="input" />
        <Button
            onPress={() => {
              addDeck(this.refs.input._lastNativeText.trim())
            }}
            title="incorrect"
            color="#841584"
            accessibilityLabel="incorrect"
          />
      </View>
    );
  }
}

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
          navigation.navigate("Home", { entryId: "1 " })
        })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDeck);

import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'

export default class DecksList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Decks List1</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'DeckDetail',
            { entryId: "1 " }
          )}
        >
        <Text>press me</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

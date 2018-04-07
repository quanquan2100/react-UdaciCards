import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'

export default class DeckDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Deck Detail</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            { entryId: "1 " }
          )}
        >
        <Text>press me to quiz</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'CreateQuestion',
            { entryId: "1 " }
          )}
        >
        <Text>press me</Text>
        </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}

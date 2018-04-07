import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'

export default class CreateDeck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View><Text>Create Deck</Text></View>
    );
  }
}

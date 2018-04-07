import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button } from 'react-native'
import { connect } from 'react-redux'

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <Text >1/2</Text>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}} >
          <Text>问题描述</Text>
          <Text>Answer</Text>
          <Button
            onPress={() => ("")}
            title="correct"
            color="#841584"
            accessibilityLabel="correct"
          />
          <Button
            onPress={() => ("")}
            title="incorrect"
            color="#841584"
            accessibilityLabel="incorrect"
          />

        </View>
      </View>
    );
  }
}

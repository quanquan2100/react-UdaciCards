import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'

export default class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} />
        </View>
        <View>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} />
        </View>
        <Button
          onPress={() => ("")}
          title="incorrect"
          color="#841584"
          accessibilityLabel="incorrect"
        />
      </View>
    );
  }
}

import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { lightred, purple, white, bluegray, darkgray, black , yellow} from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from "../utils/helper"

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flip: true,
      score: 0,
      currentCard: 0,
      seeAnswer: false,
    }

    this.showAnswer = this.showAnswer.bind(this)
    this.showQuestion = this.showQuestion.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
    this.restartQuiz = this.restartQuiz.bind(this)

  }

  componentDidMount() {
    this.setState({
      flip: true,
      score: 0,
      currentCard: 0,
      seeAnswer: false,
    })
  }

  showAnswer() {
    this.setState({seeAnswer: true})
  }

  showQuestion() {
    this.setState({seeAnswer: false})
  }

  nextQuestion(check) {
    if (this.state.currentCard == (this.props.questions.length - 1)) {
      // 当测验完成时清除今日通知
      clearLocalNotification()
        .then(setLocalNotification)
    }
    this.setState((data) => ({
      ...data,
      currentCard: data.currentCard + 1,
      score: check ? (data.score + 1) : data.score
    }))
  }

  restartQuiz() {
    this.setState({
      flip: true,
      score: 0,
      currentCard: 0,
      seeAnswer: false,
    })
  }

  render() {
    const { questions, nextQuestion, navigation } = this.props;
    const { currentCard, flip, score, seeAnswer } = this.state;
    if (currentCard === questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.finalTitle}>Congratulations, Quiz Finished !</Text>
          <Text style={styles.finalScore}>Your Score is {score}.</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.goBack()
            }}
            underlayColor='#fff'>
            <Text style={[styles.btnText, {color: white}]}>Return Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.restartQuiz()
            }}
            underlayColor='#fff'>
            <Text style={[styles.btnText, {color: white}]}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={{flex: 1}} >
        <Text style={styles.numText} >{currentCard + 1}/{questions.length}</Text>
        <View style={styles.container}>
          {
            seeAnswer
            ? <View style={styles.container} ><Text style={styles.answerText}>{typeof questions[currentCard].answer === "string" ? questions[currentCard].answer : (questions[currentCard].answer ? "Yes" : "No")}</Text></View>
            : <View style={styles.container} >
                <View style={styles.row}>
                  <Text style={styles.btnText}>{questions[currentCard].question}</Text>
                  {
                    typeof questions[currentCard].answer === "boolean"
                      ? ""
                      : <TextInput clearTextOnFocus={true} style={styles.input} ref={input => { this.textInput = input }} ref="answerInput"/>
                  }
                </View>
              
                {
                  typeof questions[currentCard].answer === "boolean"
                    ?  <React.Fragment><TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          this.nextQuestion(questions[currentCard].answer)
                        }}
                        underlayColor='#fff'>
                        <Text style={[styles.btnText, {color: white}]}>Yes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          this.nextQuestion(!questions[currentCard].answer)
                        }}
                        underlayColor='#fff'>
                        <Text style={[styles.btnText, {color: white}]}>No</Text>
                      </TouchableOpacity></React.Fragment>
                    : <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          let check = false;
                          if (this.refs.answerInput._lastNativeText) {
                            check = (this.refs.answerInput._lastNativeText.trim() === questions[currentCard].answer);
                          }
                          this.nextQuestion(check)
                        }}
                        underlayColor='#fff'>
                        <Text style={[styles.btnText, {color: white}]}>Confirm</Text>
                      </TouchableOpacity>
                }
              </View>
          }
          <View>
            {
              seeAnswer
              ? <Button onPress={() => {this.showQuestion()}} title="Question" color={lightred} accessibilityLabel="Tap to see the question"/>
              : <Button onPress={() => {this.showAnswer()}} title="Answer" color={lightred} accessibilityLabel="Tap to see the answer"/>
            }
          </View> 
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  numText: {
    fontSize: 16,
    color: bluegray,
    margin: 10,
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
    backgroundColor: yellow,
  },
  btnText: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  finalTitle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom:50,
  },
  finalScore: {
    fontSize:25,
    textAlign: "center",
  },
  answerText: {
    fontSize:25,
    textAlign: "center",
  }
});


function mapStateToProps ({globalReducer, deckReducer}) {
  return {
    currentDeck: globalReducer.currentDeck,
    // currentCard: globalReducer.currentCard,
    questions: deckReducer.decks[globalReducer.currentDeck].questions,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    // checkAnswer: (index) => ({}),
    // nextQuestion: (index) => ({})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);


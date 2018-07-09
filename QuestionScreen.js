import React, { Component } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import {LinearGradient} from 'expo'
import styles from "./Styles";

class QuestionScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {isLoading: true,};
    this._onPressButton = this._onPressButton.bind(this);
  }

  componentDidMount() {
    return fetch('http://192.168.0.104:3000/qs')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          isLoading: false,
          qid: 0,
          dataSource: response,
        }, function(){
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onPressButton() {
    this.setState({qid: (this.state.qid + 1),});
  }

  renderOptions(qid) {
    optionArr = this.state.dataSource[qid].options;

    return optionArr.map((item, i) => {
      return (
        <TouchableOpacity onPress={this._onPressButton} style={qsstyles.button} key={i}>
          <Image source={require('./assets/images/book-reading.jpg')} style={qsstyles.btnimg}/>
          <Text style={qsstyles.opttext}>{item.name}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }

    data = this.state.dataSource[this.state.qid]

    return (
      <View style={styles.container}>
        <Text style={qsstyles.qsfont}>{data.qs}</Text>
        {
          this.renderOptions(this.state.qid)
        }
      </View>
    );
  }
}

const qsstyles = StyleSheet.create({
  qsfont: {
    fontFamily: 'shadows-into-light-two',
    fontSize: 60,
    textAlign: 'center',
    padding: 20,
  },
  button: {
    marginBottom: 30,
    width: 280,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    elevation: 4,
  },
  btnimg: {
    width: 280,
    height: 60,
    borderRadius: 6,
    opacity: 0.5,
  },
  opttext: {
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
  }
})

export default QuestionScreen;

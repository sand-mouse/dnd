import React, { Component } from "react"
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  StatusBar
} from "react-native"
import { createMaterialTopTabNavigator } from "react-navigation"
import Icon from "react-native-vector-icons/Feather"
import {Font} from 'expo'

import QuestionScreen from "./QuestionScreen"
import MatchScreen from "./MatchScreen"
import SettingsScreen from "./SettingsScreen"

const TABICONSIZE = 22
const STATUSBARHEIGHT = StatusBar.currentHeight

class StatusBarOverlay extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#00b4c6', height: STATUSBARHEIGHT}}>
      </View>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Icon name="menu" color={'white'} size={TABICONSIZE} style={styles.menuIcon}/>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {fontLoaded: false}
  }

  async componentDidMount() {
    await Font.loadAsync({
      'shadows-into-light-two': require('./assets/fonts/ShadowsIntoLightTwo-Regular.ttf'),
    })
    this.setState({ fontLoaded: true })
  }

  render() {
    if(!this.state.fontLoaded) {
      return(
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBarOverlay />
          <Header />
          <AppTabNavigator />
        </View>
      )
    }
  }
}

const AppTabNavigator = createMaterialTopTabNavigator({
  Question: {
    screen: QuestionScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={TABICONSIZE} />
      )
    }
  },
  Match: {
    screen: MatchScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="heart" color={tintColor} size={TABICONSIZE} />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="bell" color={tintColor} size={TABICONSIZE} />
      )
    }
  }
}, {
    initialRouteName: 'Question',
    //tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#00b4c6',
        elevation: 1
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
      },
      tabStyle: {
        padding: 10
      },
      showIcon: true,
      showLabel: false,
    }
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#00b4c6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    marginLeft: 25
  },
  menuIcon: {
    marginLeft: 10
  }
})

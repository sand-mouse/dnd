import React, { Component } from "react";
import {
  View,
  Text
} from "react-native";

import styles from "./Styles";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

export default SettingsScreen;

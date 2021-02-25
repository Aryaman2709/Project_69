import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import ScanScreen from './screens/ScanScreen';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  ScanScreen :ScanScreen
})

const AppContainer = createAppContainer(SwitchNavigator)
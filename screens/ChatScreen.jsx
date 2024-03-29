import { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Import styles
import { globalsStyles, GLOBAL_COLOR } from '../styles/globals'
import styles from "../styles/ChatStyles";

//Import components

//Import modules

// Import redux
import { useDispatch, useSelector } from "react-redux";
import {  } from '../redux/reducers/user';
import {  } from '../redux/reducers/trips';
import {  } from '../redux/reducers/events';


export default function ChatScreen({ navigation }) {

  // 1. Redux storage
  const user = useSelector(state => state.user.value);
  const trips = useSelector(state => state.trips.value);
  const events = useSelector(state => state.events.value);
  const dispatch = useDispatch();

  // 2. UseEffect, UseState, UseRef


  // 3. Functions


  // 4. Return Component
  return (
    <View style={globalsStyles.container}>
      <Text style={globalsStyles.title}>ChatTripScreen</Text>
    </View>
  );
}

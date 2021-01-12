import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import StandardButton from '../StandardButton';

const SignIn = () => {
  return (
    <View>
      <View style={styles.signIn}>
        <Text style={styles.textItems}>Chess League is the shittt!</Text>
      </View>

      <StandardButton style={styles.signIn}></StandardButton>
    </View>
  )
}

export default SignIn

import React from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import styles from './styles';

const StandardButton = () => {
  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.buttonn}
        onPress={()=> {
          console.warn('Hey there');
        }}
      >
        <ImageBackground 
          source={require('../../assets/images/googlelogo.png')}
          style={styles.image}
        >
        </ImageBackground>
        <Text style={styles.textItems}>Sign In With Google</Text>
      </Pressable>
    </View>
  )
}

export default StandardButton

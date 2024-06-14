import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.text}>Hello World</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textView: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;

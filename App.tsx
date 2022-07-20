import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import ViewPic from './components/ViewPic';

const App = () => {
  // const reference = storage().ref('black-t-shirt-sm.png');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.containerV}>
        {/* <PickImage /> */}
        {/* <Bio /> */}
        <ViewPic />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerV: {
    flex: 1,
  },
});

export default App;

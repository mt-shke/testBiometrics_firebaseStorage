import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const Bio: React.FC = () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    const {biometryType, available, error} =
      await rnBiometrics.isSensorAvailable();
    console.log('biometryType:' + biometryType);
    console.log('is Available:' + available);
    console.log('has error:' + error);

    if (available && biometryType === BiometryTypes.TouchID) {
      console.log('TouchID is supported');
    } else if (available && biometryType === BiometryTypes.FaceID) {
      console.log('FaceID is supported');
    } else if (available && biometryType === BiometryTypes.Biometrics) {
      console.log('Biometrics is supported');
    } else {
      console.log('Biometrics not supported');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Bio</Text>
    </View>
  );
};

export default Bio;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
  },
});

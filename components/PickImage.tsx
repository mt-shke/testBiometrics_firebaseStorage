import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

let options = {
  title: 'Select Image',
  type: 'library',
  // allowEditing: true,
  customButtons: [
    {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  ],
  options: {
    maxHeight: 200,
    maxWidth: 200,
    mediaType: 'photo',
    includeBase64: false,
    selectionLimit: 1,
    // includeExtra
  },
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const PickImage: React.FC = () => {
  const pickImagehandler = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel) {
        console.log('User did cancel action');
        return;
      }
      if (!result.assets) {
        throw new Error('No file found');
      }

      const fileName = result.assets[0].fileName;
      const ref = storage().ref('/assets/user032/' + fileName);
      // const ref = storage().ref('/assets/userUid/' + fileName);
      const response = await ref.putFile(result.assets[0].uri);
      console.log(response);

      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const cameraHandler = async () => {
    const camOptions = {...options, saveToPhotos: true};
    const result = await launchCamera(camOptions);
    if (result.didCancel) {
      console.log('User did cancel action');
      return;
    }
    console.log(result);
  };

  // const reference = storage().ref('/');

  return (
    <>
      <TouchableOpacity
        style={styles.buttonPick}
        onPress={() => pickImagehandler()}>
        <Text>PickImage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCam}
        onPress={() => cameraHandler()}>
        <Text>Open camera</Text>
      </TouchableOpacity>
    </>
  );
};

export default PickImage;

const styles = StyleSheet.create({
  buttonPick: {
    backgroundColor: 'lightgreen',
    padding: 20,
  },
  buttonCam: {
    backgroundColor: 'orange',
    padding: 20,
    marginTop: 50,
  },
});

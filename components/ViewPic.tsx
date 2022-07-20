import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import PickImage from './PickImage';

// Get array of pictures and set in state
const ViewPic: React.FC = () => {
  const [imgs, setImg] = useState<false | string[]>(false);

  const noPic = !imgs && require('../assets/download.jpg');

  const getPicture = async userUid => {
    try {
      //   const ref = storage().ref('assets/userUid');
      const ref = storage().ref('assets/user032');
      const response = await ref.list();
      if (!response) {
        console.log('!resp');
        return;
      }
      console.log('Response is: ' + response);
      console.log('ResponseLength is: ' + response.items.length);
      let imgsArray: string[] = [];

      for (let index = 0; index < response.items.length; index++) {
        const url = await response.items[index].getDownloadURL();
        imgsArray.push(url);
      }

      setImg(imgsArray);
    } catch (error) {
      console.log(error);
      setImg(false);
      return;
    }
  };

  console.log(imgs);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonCam} onPress={() => getPicture()}>
        <Text>Get picture</Text>
      </TouchableOpacity>

      {!!noPic && (
        <ImageBackground source={noPic} resizeMode="cover" style={styles.img} />
      )}
      {/* 
      {!!imgs &&
        imgs.map((img, index) => (
          <ImageBackground
            key={index}
            source={{uri: img}}
            resizeMode="cover"
            style={styles.img}
          />
        ))} */}
      {!!imgs && (
        <FlatList
          style={styles.containerFL}
          initialNumToRender={10}
          numColumns={1}
          // horizontal={true}
          data={imgs}
          // ListHeaderComponent={
          // }
          renderItem={({item, index}) => (
            <ImageBackground
              key={index}
              source={{uri: item}}
              resizeMode="cover"
              style={styles.img}
            />
          )}
          // ItemSeparatorComponent={({highlighted}) => (
          //   // <Gap height={20} backgroundColor={colors.white} />
          //   <View style={{backgroundColor: 'white', height: 20}} />
          // )}
          ListFooterComponent={
            <View style={styles.footer}>
              <PickImage />
            </View>
          }
        />
      )}
    </View>
  );
};

export default ViewPic;

const styles = StyleSheet.create({
  container: {flex: 1},
  buttonCam: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginTop: 50,
  },
  containerFL: {paddingVertical: 100},
  footer: {paddingVertical: 100},
  img: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 100,
  },
});

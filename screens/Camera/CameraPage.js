/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const CameraPage = ({navigation}) => {
  let camera = Camera;

  // Get permission
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Check Focused
  const isFocused = useIsFocused();

  const __takePicture = async () => {
    if (!camera) {
      return;
    }
    const photo = await camera.takePictureAsync();
    const photoUri = Image.resolveAssetSource(photo).uri;
    const photoWidth = Image.resolveAssetSource(photo).width;
    const photoHeight = Image.resolveAssetSource(photo).height;
    navigation.navigate('Nhận diện', {photoUri, photoWidth, photoHeight});
  };

  const __pickImage = async () => {
    const photo = await launchImageLibrary({mediaType: 'photo'});
    if (photo.didCancel === true) {
      return;
    }
    const photoUri = Image.resolveAssetSource(photo).assets[0].uri;
    const photoWidth = Image.resolveAssetSource(photo).assets[0].width;
    const photoHeight = Image.resolveAssetSource(photo).assets[0].height;
    navigation.navigate('Nhận diện', {photoUri, photoWidth, photoHeight});
  };

  // Screen Ratio and image padding
  const [realCameraWidth, setRealCameraWidth] = useState(0);
  const [ratio, setRatio] = useState('4:3'); // default is 4:3
  const {height, width} = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = '4:3'; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0], 10) / parseInt(parts[1], 10);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      const realCameraWidthCalc = Math.floor(
        (width * screenRatio) / realRatios[desiredRatio],
      );
      setRealCameraWidth(realCameraWidthCalc);
      // set the preview padding and preview ratio
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          onCameraReady={setCameraReady}
          style={[styles.camera, {width: realCameraWidth}]}
          type={type}
          ratio={ratio}
          ref={r => {
            camera = r;
          }}>
          <View style={styles.buttonsPositioner}>
            <View style={styles.buttonsContainer}>
              <View>
                <TouchableOpacity
                  style={styles.imgPicker}
                  onPress={__pickImage}>
                  <Image
                    source={require('../../assets/icons/media-image.png')}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                />
              </View>

              <View style={{width: 60}} />
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'black',
  },
  buttonsPositioner: {
    flex: 1,
    position: 'absolute',
    bottom: 90,
    width: '100%',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(33, 33, 33, 0.85)',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CameraPage;

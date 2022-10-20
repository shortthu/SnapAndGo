import React, {useRef, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  ImageBackground,
  Button,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
// import {Tensor, InferenceSession} from 'onnxruntime-react-native';
// import {Asset} from 'expo-asset';
// import ndarray from 'ndarray';
// import * as FileSystem from 'expo-file-system';
// import * as tf from '@tensorflow/tfjs';

// function preprocess(data, width, height) {
//   const dataFromImage = ndarray(new Float32Array(data), [width, height, 4]);
//   const dataProcessed = ndarray(new Float32Array(width * height * 3), [
//     1,
//     3,
//     height,
//     width,
//   ]);

//   // Normalize 0-255 to (-1)-1
//   ndarray.ops.divseq(dataFromImage, 128.0);
//   ndarray.ops.subseq(dataFromImage, 1.0);

//   // Realign imageData from [224*224*4] to the correct dimension [1*3*224*224].
//   ndarray.ops.assign(
//     dataProcessed.pick(0, 0, null, null),
//     dataFromImage.pick(null, null, 2),
//   );
//   ndarray.ops.assign(
//     dataProcessed.pick(0, 1, null, null),
//     dataFromImage.pick(null, null, 1),
//   );
//   ndarray.ops.assign(
//     dataProcessed.pick(0, 2, null, null),
//     dataFromImage.pick(null, null, 0),
//   );

//   return dataProcessed.data;
// }

// const convertPhotoBase64 = async photo => {
//   const imgUri = photo.uri;
//   const imgB64 = await FileSystem.readAsStringAsync(imgUri, {
//     encoding: FileSystem.EncodingType.Base64,
//   });
//   return imgB64;
// };

// const TensorConvert = async photo => {
//   const imgUri = photo.uri;
//   const imgB64 = await FileSystem.readAsStringAsync(imgUri, {
//     encoding: FileSystem.EncodingType.Base64,
//   });
//   const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
//   const raw = new Float32Array(imgBuffer);
//   const imageTensor = new Tensor(raw, [1, 640, 480, 3]);
//   console.log(imageTensor);
//   return imageTensor;
//   // const raw = new Uint8Array(imgBuffer);
//   // const imageTensor = new Tensor(raw, [1, 2]);
//   // console.log(imageTensor);
//   // return imageTensor;

//   // const imageData = photo.getImageData(
//   //   0,
//   //   0,
//   //   photo.canvas.width,
//   //   photo.canvas.height,
//   // );
//   // const {data, width, height} = imageData;
//   // const dataTensor = ndarray(new Float32Array(data), [width, height, 4]);
//   // const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [
//   //   1,
//   //   3,
//   //   width,
//   //   height,
//   // ]);
//   // ops.assign(
//   //   dataProcessedTensor.pick(0, 0, null, null),
//   //   dataTensor.pick(null, null, 2),
//   // );
//   // ops.assign(
//   //   dataProcessedTensor.pick(0, 1, null, null),
//   //   dataTensor.pick(null, null, 1),
//   // );
//   // ops.assign(
//   //   dataProcessedTensor.pick(0, 2, null, null),
//   //   dataTensor.pick(null, null, 0),
//   // );
//   // ops.divseq(dataProcessedTensor, 255);
//   // ops.subseq(dataProcessedTensor.pick(0, 0, null, null), 0.485);
//   // ops.subseq(dataProcessedTensor.pick(0, 1, null, null), 0.456);
//   // ops.subseq(dataProcessedTensor.pick(0, 2, null, null), 0.406);
//   // ops.divseq(dataProcessedTensor.pick(0, 0, null, null), 0.229);
//   // ops.divseq(dataProcessedTensor.pick(0, 1, null, null), 0.224);
//   // ops.divseq(dataProcessedTensor.pick(0, 2, null, null), 0.225);
//   // const tensor = new Tensor(new Float32Array(3 * width * height), 'float32', [
//   //   1,
//   //   3,
//   //   width,
//   //   height,
//   // ]);
//   // tensor.data.set(dataProcessedTensor.data);
// };

// async function Detect(photo) {
//   const assets = await Asset.loadAsync(require('../../assets/yolov5s.ort'));
//   let modelPath = assets[0].localUri;
//   const session = await InferenceSession.create(modelPath);

//   const result = session.run(TensorConvert(photo), [
//     'num_detection:0',
//     'detection_classes:0',
//   ]);
//   console.log(result);
// }

const ImageDetectPage = ({route, navigation}) => {
  const {photo, result} = route.params;
  // Detect(photo);

  const actionSheetRef = useRef(null);

  useEffect(() => {
    actionSheetRef.current?.show();
  }, []);

  console.log('From imgDetect page: ', result);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={styles.container}
      />
      <ActionSheet ref={actionSheetRef}>
        <Text style={{color: '#000000'}}>{result}</Text>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ImageDetectPage;

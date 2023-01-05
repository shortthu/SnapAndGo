import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  StatusBar,
} from 'react-native';
import {ref, set, update, onValue, remove} from 'firebase/database';
import {db} from '../components/firebase';
import moment from 'moment';
export default function HistoryPage() {
  const [ObjectsName, setObjectsName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = moment().utcOffset('+07:00').format(' hh:mm:ss a');
    setCurrentDate(date);
  }, []);

  function createData() {
    // const newKey = push(child(ref(database), 'users')).key;

    set(ref(db, 'HistorySearch/' + ObjectsName), {
      ObjectsName: ObjectsName,
      currentDate: currentDate,
    })
      .then(() => {
        // Data saved successfully!
        alert('data updated!');
      })
      .catch(error => {
        // The write failed...
        alert(error);
      });
  }

  // function update() {
  //   // const newKey = push(child(ref(database), 'users')).key;

  //   update(ref(db, 'users/' + username), {
  //     username: username,
  //     email: email,
  //   })
  //     .then(() => {
  //       // Data saved successfully!
  //       alert('data updated!');
  //     })
  //     .catch(error => {
  //       // The write failed...
  //       alert(error);
  //     });
  // }

  function readData() {
    const starCountRef = ref(db, 'HistorySearch/' + ObjectsName);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      for (keys in data) {
        console.log(keys);
      }
      snapshot.forEach(grandchildSnapshot => {
        let item = grandchildSnapshot.val();
        console.log(item.currentDate);
      });

      // setCurrentDate(data.currentDate);
    });
  }

  function deleteData() {
    remove(ref(db, 'users/' + username));
    alert('removed');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <TextInput
        value={ObjectsName}
        onChangeText={ObjectsName => {
          setObjectsName(ObjectsName);
        }}
        placeholder="Objects"
        style={styles.textBoxes}></TextInput>
      {/* <TextInput value={currentDate} onChangeText={(currentDate) => { setCurrentDate(currentDate) }} type style={styles.textBoxes}></TextInput> */}
      <Button
        onPress={createData}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBoxes: {
    width: '90%',
    fontSize: 18,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 10,
  },
});

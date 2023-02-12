import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import UserContext from '../context/UserContext';

const FirstScreen = ({navigation}) => {
  const {saveUser} = useContext(UserContext);
  const [userData, setData] = useState({
    name: '',
    province: '',
    city: '',
  });

  return (
    <View>
      <TextInput
        placeholder="Masukkan Nama"
        value={userData.name}
        onChangeText={input => setData({...userData, name: input})}
      />
      <TextInput
        placeholder="Pilih Provinsi"
        value={userData.province}
        onChangeText={input => setData({...userData, province: input})}
      />
      <TextInput
        placeholder="Pilih Kota"
        value={userData.city}
        onChangeText={input => setData({...userData, city: input})}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});

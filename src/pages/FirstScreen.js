/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../context/UserContext';
import {Dropdown} from 'react-native-element-dropdown';
import {provinceAndCityIndonesia, provinceIndonesia} from '../data/data';
import Colors from '../styles/Colors';
import {useIsFocused} from '@react-navigation/native';

const FirstScreen = ({navigation}) => {
  const {saveUser} = useContext(UserContext);
  const [userData, setData] = useState({
    name: '',
    province: null,
    city: null,
  });
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const focused = useIsFocused();

  const filterCity = provinceData => {
    const cityArray = provinceAndCityIndonesia;

    const results = cityArray.filter(data => data.province === provinceData);
    setCityData(results[0].cities);
  };

  const prosesHandler = () => {
    if (userData.name === '') {
      Alert.alert('Perhatian!', 'Harap isi nama anda terlebih dahulu');
    } else if (userData.province === null) {
      Alert.alert(
        'Perhatian!',
        'Harap pilih Provinsi asal anda terlebih dahulu',
      );
    } else if (userData.city === null) {
      Alert.alert('Perhatian!', 'Harap pilih Kota asal anda terlebih dahulu');
    } else {
      proses();
    }
  };

  const proses = () => {
    saveUser(userData);
    navigation.navigate('Weather');
  };

  useEffect(() => {
    if (focused) {
      setStateData(provinceIndonesia);
      setData({...userData, name: '', province: null, city: null});
    }
  }, [focused]);

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>Selamat Datang!</Text>
      <View style={styles.subIntroContainer}>
        <Text style={styles.subIntro}>
          Silahkan masukan nama, provinsi dan kota untuk melihat cuaca di daerah
          anda
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <TextInput
          placeholder="Masukkan Nama"
          value={userData.name}
          onChangeText={input => setData({...userData, name: input})}
          style={styles.textInputStyle}
        />
        <Dropdown
          data={stateData}
          labelField="name"
          valueField="value"
          value={userData.province}
          showsVerticalScrollIndicator={false}
          placeholder="Pilih Provinsi"
          onChange={item => {
            setData({...userData, province: item.name});
            filterCity(item.name);
          }}
          search
          searchPlaceholder="Cari Provinsi"
          style={styles.dropdownStyle}
          maxHeight={200}
          placeholderStyle={styles.dropdownTextStyle}
          selectedTextStyle={styles.dropdownTextStyle}
          itemTextStyle={styles.dropdownTextStyle}
          containerStyle={styles.dropdownContainerStyle}
          inputSearchStyle={styles.inputSearchContainerStyle}
          keyboardAvoiding={false}
        />
        <Dropdown
          data={cityData}
          labelField="name"
          valueField="value"
          value={userData.city}
          onChange={item => {
            setData({...userData, city: item.name});
          }}
          showsVerticalScrollIndicator={false}
          placeholder="Pilih Kota"
          disable={userData.province === null ? true : false}
          search
          searchPlaceholder="Cari Kota"
          style={
            userData.province === null
              ? styles.dropdownStyleDisabled
              : styles.dropdownStyle
          }
          maxHeight={200}
          placeholderStyle={styles.dropdownTextStyle}
          selectedTextStyle={styles.dropdownTextStyle}
          itemTextStyle={styles.dropdownTextStyle}
          containerStyle={styles.dropdownContainerStyle}
          inputSearchStyle={styles.inputSearchContainerStyle}
          keyboardAvoiding={false}
        />
        <TouchableOpacity onPress={prosesHandler} style={styles.button}>
          <Text style={styles.buttonText}>Proses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.periwinkle,
  },
  intro: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    marginBottom: 20,
    color: Colors.yinminBlue,
  },
  subIntroContainer: {
    width: '70%',
    marginBottom: 30,
    alignSelf: 'center',
  },
  subIntro: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: Colors.yinminBlue,
    textAlign: 'center',
  },
  contentContainer: {width: '70%'},
  textInputStyle: {
    borderWidth: 1,
    borderColor: Colors.yinminBlue,
    color: Colors.yinminBlue,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: Colors.yinminBlue,
    color: Colors.yinminBlue,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
  },
  dropdownStyleDisabled: {
    borderWidth: 1,
    borderColor: Colors.yinminBlue,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    backgroundColor: Colors.grey,
  },
  dropdownTextStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: Colors.yinminBlue,
  },
  dropdownContainerStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  inputSearchContainerStyle: {
    borderRadius: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    padding: 5,
  },
  button: {
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: Colors.yinminBlue,
    width: '70%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: Colors.white,
  },
});

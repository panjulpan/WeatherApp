/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../context/UserContext';
import {WeatherService} from '../services';
import NavBarComponent from '../components/NavBarComponent';
import Colors from '../styles/Colors';
import {ImgURL} from '../config';

const SecondScreen = ({navigation}) => {
  const {userInfo} = useContext(UserContext);
  const [refresh, setRefresh] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  // Get weather data by city
  const getWeatherData = async () => {
    try {
      const dataWeather = await WeatherService.getWeatherByCity(
        userInfo.location,
      );

      console.log('data: ', dataWeather.data.list);

      const groupedData = dataWeather.data.list.reduce((acc, obj) => {
        const date = obj.dt_txt.split(' ')[0]; // Extract the date part only
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(obj);
        return acc;
      }, {});

      const newData = Object.keys(groupedData).map(date => {
        return {
          item: date,
          data: groupedData[date],
        };
      });

      setWeatherData(newData);
      setCurrentWeather(newData[0].data[0]);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // konversi jam saat ini menjadi waktu sapaan seperti 'siang', 'pagi', 'malam' dll
  const getHourType = () => {
    const d = new Date();
    const hour = d.getHours();

    let hourType;
    if (hour >= 0 && hour < 6) {
      hourType = 'Malam';
    } else if (hour >= 6 && hour < 12) {
      hourType = 'Pagi';
    } else if (hour >= 12 && hour < 15) {
      hourType = 'Siang';
    } else if (hour >= 15 && hour < 18) {
      hourType = 'Sore';
    } else {
      hourType = 'Malam';
    }

    return hourType;
  };

  // handler untuk refresh weather data
  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    getWeatherData();
  }, [refresh]);

  return (
    <ImageBackground
      source={require('../../assets/images/morning.jpg')}
      style={styles.container}
      resizeMode="cover">
      <NavBarComponent
        backButton={() => navigation.goBack()}
        refreshButton={handleRefresh}
      />
      <Text style={styles.introduction}>
        Selamat {getHourType()}, {userInfo.username}!
      </Text>
      <View style={styles.currentWeatherContainer}>
        <View style={styles.weatherStatusContainer}>
          <Image
            source={{uri: ImgURL + currentWeather.weather[0].icon + '.png'}}
            resizeMode="cover"
            style={styles.icon}
          />
          <Text style={styles.weatherStatus}>
            {currentWeather.weather[0].main}
          </Text>
        </View>
        <Text style={styles.temperature}>
          {Math.ceil(currentWeather.main.temp)}°
        </Text>
        <Text style={styles.location}>{userInfo.location}</Text>
      </View>
    </ImageBackground>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  introduction: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: Colors.yinminBlue,
    marginLeft: 30,
    marginVertical: 15,
  },
  currentWeatherContainer: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  weatherStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherStatus: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: Colors.yinminBlue,
  },
  icon: {height: 35, width: 35},
  temperature: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 42,
    color: Colors.yinminBlue,
    textAlign: 'center',
    padding: 0,
  },
});

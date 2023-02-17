/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../context/UserContext';
import {WeatherService} from '../services';
import NavBarComponent from '../components/NavBarComponent';
import Colors from '../styles/Colors';
import {ImgURL} from '../config';
import LoadingComponent from '../components/LoadingComponent';
import {Icon} from '../../assets/icons';
import WeatherDataComponent from '../components/WeatherDataComponent';

const SecondScreen = ({navigation}) => {
  const {userInfo} = useContext(UserContext);
  const [refresh, setRefresh] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const dateNow = new Date();
  const [isLoading, setIsLoading] = useState(false);

  // Get weather data by city
  const getWeatherData = async () => {
    setIsLoading(true);
    try {
      const dataWeather = await WeatherService.getWeatherByCity(
        userInfo.location,
      );

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
          title: date,
          data: groupedData[date],
        };
      });

      // console.log('data: ', newData);

      setWeatherData(newData);
      setCurrentWeather(newData[0].data[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 404) {
        Alert.alert(
          'Mohon Maaf',
          'Data kota tidak di temukan. Silahkan pilih kota yang lain',
          [{text: 'Kembali', onPress: () => navigation.goBack()}],
        );
      }
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

  // handler untuk back button
  const handleBackButton = () => {
    Alert.alert(
      'Perhatian!',
      'Anda yakin ingin kembali ke halaman sebelumnya?',
      [
        {
          text: 'Ya',
          onPress: () => navigation.goBack(),
        },
        {text: 'Tidak', onPress: () => null, style: 'cancel'},
      ],
    );
  };

  // Function render content
  const sectionContentRender = title => {
    return <WeatherDataComponent data={title} key={title.title} />;
  };

  useEffect(() => {
    getWeatherData();
    const backAction = () => {
      Alert.alert(
        'Perhatian!',
        'Anda yakin ingin kembali ke halaman sebelumnya?',
        [
          {
            text: 'Ya',
            onPress: () => navigation.goBack(),
          },
          {text: 'Tidak', onPress: () => null, style: 'cancel'},
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [refresh]);

  if (!currentWeather) {
    return <LoadingComponent />;
  }

  return (
    <ImageBackground
      source={require('../../assets/images/morning.jpg')}
      style={styles.container}
      resizeMode="cover">
      <NavBarComponent
        backButton={handleBackButton}
        refreshButton={handleRefresh}
      />
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.introduction}>
            Selamat {getHourType()}, {userInfo.username}!
          </Text>
          <Text style={styles.temperature}>
            {Math.ceil(currentWeather.main.temp)}°C
          </Text>
          <Text style={styles.location}>
            {userInfo.location}, {dateNow.toDateString()}
          </Text>
        </View>
        <View style={styles.weatherStatusContainer}>
          <Text style={styles.weatherStatus}>
            {currentWeather.weather[0].main}
          </Text>
          <Image
            source={{uri: ImgURL + currentWeather.weather[0].icon + '.png'}}
            resizeMode="cover"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.weatherDetail}>
          <Icon.Humidity width={30} height={30} style={styles.detailIcon} />
          <Text style={styles.detail}>{currentWeather.main.humidity}%</Text>
          <Text style={styles.detail}>Humidity</Text>
        </View>
        <View style={styles.weatherDetail}>
          <Icon.Pressure width={30} height={30} style={styles.detailIcon} />
          <Text style={styles.detail}>{currentWeather.main.pressure} hpa</Text>
          <Text style={styles.detail}>Pressure</Text>
        </View>
        <View style={styles.weatherDetail}>
          <Icon.Cloud width={30} height={30} style={styles.detailIcon} />
          <Text style={styles.detail}>{currentWeather.clouds.all}%</Text>
          <Text style={styles.detail}>Cloudiness</Text>
        </View>
        <View style={styles.weatherDetail}>
          <Icon.Wind width={30} height={30} style={styles.detailIcon} />
          <Text style={styles.detail}>{currentWeather.wind.speed} m/s</Text>
          <Text style={styles.detail}>Wind</Text>
        </View>
      </View>
      <View style={styles.forecastContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {weatherData.map(itemWeather => {
            return sectionContentRender(itemWeather);
          })}
        </ScrollView>
      </View>
      {isLoading ? <LoadingComponent /> : null}
    </ImageBackground>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  introduction: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: Colors.yinminBlue,
  },
  topContainer: {
    marginHorizontal: 30,
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherStatusContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherStatus: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: Colors.yinminBlue,
  },
  icon: {height: 80, width: 80},
  temperature: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 42,
    color: Colors.yinminBlue,
    padding: 0,
  },
  location: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: Colors.yinminBlue,
  },
  contentContainer: {
    marginHorizontal: 30,
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: Colors.yinminBlueTrans,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherDetail: {
    alignItems: 'center',
  },
  detailIcon: {color: Colors.white, marginBottom: 10},
  detail: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
    color: Colors.white,
  },
  forecastContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: Colors.yinminBlueTrans,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});

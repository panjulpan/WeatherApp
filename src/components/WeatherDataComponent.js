import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {ImgURL} from '../config';
import Colors from '../styles/Colors';

const WeatherDataComponent = ({data}) => {
  const date = new Date(data.title);
  const options = {weekday: 'short', month: 'numeric', day: 'numeric'};
  const formattedDate = date.toLocaleDateString('id-ID', options);

  const renderItem = ({item}) => {
    const time = item.dt_txt.split(' ')[1];
    const timeArray = time.split(':'); // ['12', '00', '00']
    const formattedTime = timeArray[0] + ':' + timeArray[1]; // '12:00'

    return (
      <View style={styles.weatherDataContainer}>
        <Text style={styles.weatherDataTitle}>{formattedTime}</Text>
        <Image
          source={{uri: ImgURL + item.weather[0].icon + '.png'}}
          resizeMode="cover"
          style={styles.icon}
        />
        <Text style={styles.weatherDataContent}>{item.main.temp}°C</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{formattedDate}</Text>
      </View>
      <FlatList
        data={data.data}
        keyExtractor={item => item.dt}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatListStyle}
      />
    </View>
  );
};

export default WeatherDataComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  contentContainer: {flex: 0.2, alignSelf: 'center'},
  contentTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: Colors.white,
  },
  flatListStyle: {flex: 0.5},
  weatherDataContainer: {marginLeft: 15, alignItems: 'center'},
  weatherDataTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: Colors.white,
  },
  icon: {height: 50, width: 50},
  weatherDataContent: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: Colors.white,
  },
});

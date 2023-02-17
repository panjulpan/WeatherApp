import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../styles/Colors';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingCard}>
        <ActivityIndicator size="large" color="#608C74" />
        <Text style={styles.loadingText}>Loading . . . .</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: '100%',
  },
  loadingCard: {
    backgroundColor: Colors.white,
    width: '70%',
    height: '20%',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    alignSelf: 'center',
    paddingTop: 20,
    fontFamily: 'Poppins-Medium',
    color: Colors.yinminBlue,
  },
});

export default LoadingComponent;

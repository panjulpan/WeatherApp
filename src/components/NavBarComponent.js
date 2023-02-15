import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from '../../assets/icons';
import Colors from '../styles/Colors';

const NavBarComponent = ({backButton, refreshButton}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={backButton}>
        <Icon.LeftArrow
          width={25}
          height={25}
          style={{color: Colors.yinminBlue}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={refreshButton}>
        <Icon.Refresh
          width={25}
          height={25}
          style={{color: Colors.yinminBlue}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavBarComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 25,
    justifyContent: 'space-between',
  },
});

import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import UserContext from './src/context/UserContext';
import StackNavigation from './src/navigations/StackNavigation';

const App = () => {
  const [userData, setUserData] = useState({
    location: '',
    username: '',
  });

  const userValue = {
    saveUser: data => {
      setUserData({
        ...userData,
        username: data.username,
        location: data.location,
      });
    },
    userInfo: userData,
  };

  return (
    <UserContext.Provider value={userValue}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;

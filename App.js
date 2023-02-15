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
        username: data.name,
        location: data.city,
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

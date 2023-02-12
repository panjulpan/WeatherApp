import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FirstScreen, SecondScreen} from '../pages';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const routes = [
    {route: 'Main', component: FirstScreen},
    {route: 'Weather', component: SecondScreen},
  ];

  return (
    <Stack.Navigator initialRouteName={'Main'}>
      {routes.map((item, index) => {
        return (
          <Stack.Screen
            key={`idx-${index}`}
            name={item.route}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default StackNavigation;

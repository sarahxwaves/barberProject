

import React from 'react';
import MainStrack from './src/stacks/MainStack';
import UserContextProvider from './src/contexts/UserContext';

import {NavigationContainer} from '@react-navigation/native';
export default () => {
  return (
    <UserContextProvider>

    <NavigationContainer>
      <MainStrack/>
    </NavigationContainer>

    </UserContextProvider>
  );
};

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Store from './Store/ConfigureStore'
import Navigation from './Navigation/Navigation';

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>

        <Navigation /> 
        

      </NavigationContainer>
    </Provider>
  );
}

import * as React from 'react';
import {View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetails.js';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>   
      <Search naviguer={navigation}/>
    </View>
  );
}

function FilmDetailScreen({route, navigation}) {
  const idFilm=route.params;    
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>      
      <FilmDetail idFilm={idFilm} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator 
    initialRouteName="Rechercher" 
    screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="Rechercher" component={HomeScreen} />     
      <Stack.Screen name="Details" component={FilmDetailScreen} />    
    </Stack.Navigator>
  );
}



import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Menu from './src/components/Menu/Menu';



const Stack = createNativeStackNavigator();

export default function App() {
  console.log("En app")
  return (
    <NavigationContainer style={styles.navcontainer}>
    <Stack.Navigator>
    <Stack.Screen name='Register' component={Register} options={ { headerShown: false } }/>
    <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
    <Stack.Screen name='Menu' component={Menu} options={ { headerShown: false } }/>  
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

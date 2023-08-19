/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ListView from './views/ListView';
import AddShiftView from './views/AddShiftView';
import ExportView from './views/ExportView';
import SettingsView from './views/SettingsView';
import { RootStackParamList, ShiftStackParamList } from './types/views';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ShiftStack = createNativeStackNavigator<ShiftStackParamList>();

const ShiftStackCompoenent = memo(() => {
  return (
    <ShiftStack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
      }}>
      <ShiftStack.Screen name="List" component={ListView} />
      <ShiftStack.Screen name="Add" component={AddShiftView} />
    </ShiftStack.Navigator>
  );
});

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Shifts"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Shifts" component={ShiftStackCompoenent} />
        <Stack.Screen name="Export" component={ExportView} />
        <Stack.Screen name="Settings" component={SettingsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;

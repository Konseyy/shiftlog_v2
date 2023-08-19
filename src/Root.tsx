/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { memo, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ListView from './views/ListView';
import SelectedEntry from './views/SelectedEntry';
import ExportView from './views/ExportView';
import SettingsView from './views/SettingsView';
import { RootStackParamList, ShiftStackParamList } from './types/views';
import { useShiftStore } from './zustand/shiftStore';
import { Text } from 'react-native';
import NavigationFooter from './components/common/NavigationFooter';

const Tabs = createBottomTabNavigator<RootStackParamList>();

const ShiftStack = createNativeStackNavigator<ShiftStackParamList>();

const ShiftStackCompoenent = memo(() => {
  return (
    <ShiftStack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
      }}>
      <ShiftStack.Screen name="List" component={ListView} />
      <ShiftStack.Screen name="Selected" component={SelectedEntry} />
    </ShiftStack.Navigator>
  );
});

const Root = () => {
  const loadState = useShiftStore(state => state.loadSavedEntries);

  useEffect(() => {
    // Load state from storage on mount
    loadState();
  }, [loadState]);

  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="Shifts"
        tabBar={props => <NavigationFooter {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen name="Shifts" component={ShiftStackCompoenent} />
        <Tabs.Screen name="Export" component={ExportView} />
        <Tabs.Screen name="Settings" component={SettingsView} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default Root;

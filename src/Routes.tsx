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
import SelectedShift from './views/SelectedShift';
import ExportView from './views/ExportView';
import SettingsView from './views/SettingsView';
import { RootStackParamList, ShiftStackParamList } from './types/views';
import { useShiftStore } from './zustand/shiftStore';
import NavigationFooter from './components/common/NavigationFooter';
import tamaguiConfig from '../tamagui.config';
import { TamaguiProvider } from 'tamagui';

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
      <ShiftStack.Screen
        options={{
          headerShown: true,
          headerBackVisible: true,
        }}
        name="Selected"
        component={SelectedShift}
      />
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
    <TamaguiProvider config={tamaguiConfig}>
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
    </TamaguiProvider>
  );
};

export default Root;

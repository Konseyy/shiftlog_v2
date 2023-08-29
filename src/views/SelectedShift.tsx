import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ShiftStackParamList } from '../types/views';
import { useShiftStore } from '../zustand/shiftStore';
import ShiftEntryForm from '../components/SelectedEntry/ShiftEntryForm';

const SelectedShift = memo(() => {
  const route = useRoute<RouteProp<ShiftStackParamList, 'Selected'>>();
  const navigation =
    useNavigation<NavigationProp<ShiftStackParamList, 'Selected'>>();
  const selectedEntry = useShiftStore(state => {
    const selectedId = route.params?.id;
    if (selectedId) return state.list[selectedId];
    return undefined;
  });

  const headerText =
    selectedEntry === undefined ? 'Add new shift' : 'Edit shift';

  useEffect(() => {
    navigation.setOptions({ title: headerText });
  }, [headerText, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ShiftEntryForm />
    </SafeAreaView>
  );
});

export default SelectedShift;

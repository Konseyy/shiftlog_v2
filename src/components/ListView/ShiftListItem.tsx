import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { ShiftEntryInState } from '../../types/shifts';
import { useShiftStore } from '../../zustand/shiftStore';
import { ShiftStackParamList } from '../../types/views';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
  entry: ShiftEntryInState;
};

const ShiftListItem = memo(({ entry }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShiftStackParamList, 'List'>>();
  const removeShift = useShiftStore(state => state.removeEntry);
  const persistShifts = useShiftStore(state => state.saveEntries);

  const deleteShift = useCallback(
    (...params: Parameters<typeof removeShift>) => {
      removeShift(...params);
      persistShifts();
    },
    [removeShift, persistShifts],
  );
  return (
    <View
      key={entry.id}
      style={{
        paddingVertical: 10,
      }}>
      <TouchableOpacity
        onLongPress={() => {
          Alert.alert(
            'Select operation',
            'Do you want to edit or delete this shift?',
            [
              {
                text: 'Edit',
                onPress: () => {
                  navigation.navigate('Selected', { id: entry.id });
                },
              },
              {
                text: 'Delete',
                onPress: () => {
                  Alert.alert(
                    'Delete shift',
                    `Are you sure you want to delete the shift starting at ${new Date(
                      entry.startDate,
                    ).toLocaleString()}?`,
                    [
                      {
                        text: 'Yes',
                        onPress: () => deleteShift(entry.id),
                      },
                      {
                        text: 'Cancel',
                      },
                    ],
                  );
                },
              },
            ],
          );
        }}>
        <Text>id: {entry.id}</Text>
        <Text>start: {entry.startDate}</Text>
        <Text>end: {entry.endDate}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ShiftListItem;

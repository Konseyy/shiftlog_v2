import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { ShiftEntryInState } from '../../types/shifts';
import { useShiftStore } from '../../zustand/shiftStore';

type Props = {
  entry: ShiftEntryInState;
  onEdit: (id: string) => void;
};

const ShiftListItem = memo(({ entry, onEdit }: Props) => {
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
    <View key={entry.id}>
      <TouchableOpacity
        onLongPress={() => {
          Alert.alert(
            'Select operation',
            'Do you want to edit or delete this shift?',
            [
              {
                text: 'Edit',
                onPress: () => onEdit(entry.id),
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
        <Text>break: {entry.breakDuration}</Text>
        <Text>notes: {entry.description}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ShiftListItem;

import { RouteProp, useRoute } from '@react-navigation/native';
import React, { memo, useState } from 'react';
import { Text, View } from 'react-native';
import { ShiftStackParamList } from '../types/views';
import { useShiftStore } from '../zustand/shiftStore';

const SelectedEntry = memo(() => {
  const route = useRoute<RouteProp<ShiftStackParamList, 'Selected'>>();
  const selectedEntry = useShiftStore(state => {
    const selectedId = route.params?.id;
    if (selectedId) return state.list[selectedId];
    return undefined;
  });

  const [startDate, setStartDate] = useState(
    selectedEntry !== undefined ? selectedEntry.startDate : Date.now(),
  );
  const [endDate, setEndDate] = useState(
    selectedEntry !== undefined ? selectedEntry.endDate : Date.now(),
  );
  const [breakDuration, setBreakDuration] = useState(
    selectedEntry !== undefined ? selectedEntry.breakDuration : 0,
  );
  const [description, setDescription] = useState(
    selectedEntry !== undefined ? selectedEntry.description : '',
  );

  return (
    <View>
      <Text>
        {selectedEntry === undefined
          ? 'Add new shift'
          : `Selected shift: ${selectedEntry.id}`}
      </Text>
      <View>
        <View>
          <Text>Start date</Text>
          <Text>{new Date(startDate).toLocaleString()}</Text>
        </View>
        <View>
          <Text>End date</Text>
          <Text>{new Date(endDate).toLocaleString()}</Text>
        </View>
        <View>
          <Text>Break duration</Text>
          <Text>{breakDuration}</Text>
        </View>
        <View>
          <Text>Description</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </View>
  );
});

export default SelectedEntry;

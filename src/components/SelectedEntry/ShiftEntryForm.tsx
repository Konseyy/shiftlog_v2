import React, { useMemo, useState } from 'react';
import {
  View,
  Alert as NativeAlert,
  Text,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import { Button, Input, XStack, YStack } from 'tamagui';
import { useShiftStore } from '../../zustand/shiftStore';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ShiftStackParamList } from '../../types/views';
import { ShiftEntryInState } from '../../types/shifts';
import { Check, Delete } from '@tamagui/lucide-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { styles } from './styles';

const ShiftEntryForm = () => {
  const route = useRoute<RouteProp<ShiftStackParamList, 'Selected'>>();
  const navigation =
    useNavigation<NavigationProp<ShiftStackParamList, 'Selected'>>();
  const selectedEntry = useShiftStore(state => {
    const selectedId = route.params?.id;
    if (selectedId) return state.list[selectedId];
    return undefined;
  });
  const addEntry = useShiftStore(state => state.addEntry);
  const updateEntry = useShiftStore(state => state.updateEntry);
  const removeEntry = useShiftStore(state => state.removeEntry);

  const [startDate, setStartDate] = useState(
    selectedEntry !== undefined ? selectedEntry.startDate : Date.now(),
  );
  const [endDate, setEndDate] = useState(
    selectedEntry !== undefined ? selectedEntry.endDate : Date.now(),
  );

  const startDateObj = useMemo(() => new Date(startDate), [startDate]);
  const endDateObj = useMemo(() => new Date(endDate), [endDate]);
  const [breakDuration, setBreakDuration] = useState(
    selectedEntry !== undefined ? selectedEntry.breakDuration : 0,
  );
  const [description, setDescription] = useState(
    selectedEntry !== undefined ? selectedEntry.description : '',
  );

  const headerText =
    selectedEntry === undefined ? 'Add new shift' : 'Edit shift';

  const onSave = () => {
    if (selectedEntry === undefined) {
      addEntry({
        startDate,
        endDate,
        breakDuration,
        description,
      });
    } else {
      updateEntry(selectedEntry.id, {
        startDate,
        endDate,
        breakDuration,
        description,
      });
    }
    navigation.navigate('List');
    // TODO: Show success toast
  };

  const onDelete = (entry: ShiftEntryInState) => {
    NativeAlert.alert(
      'Delete entry?',
      `Are you sure you want to delete the entry starting at ${new Date(
        entry.startDate,
      ).toLocaleString('en-GB')}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeEntry(entry.id);
            navigation.navigate('List');
          },
        },
      ],
    );
  };

  const handleSelectDate = (
    date: Date,
    setDate: (newTimestamp: number) => void,
  ) => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: startDateObj,
      onChange(event, newDate) {
        if (newDate !== undefined) {
          setDate(newDate.getTime());
        }
      },
    });
  };

  const handleSelectTime = (
    date: Date,
    setDate: (newTimestamp: number) => void,
  ) => {
    DateTimePickerAndroid.open({
      mode: 'time',
      is24Hour: true,
      value: startDateObj,
      onChange(event, newDate) {
        if (newDate !== undefined) {
          setDate(newDate.getTime());
        }
      },
    });
  };

  const displayDate = (date: Date) => date.toLocaleDateString('en-GB');
  const displayTime = (date: Date) =>
    date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <View style={{ height: '100%' }}>
      <View style={{ marginVertical: 10, marginHorizontal: 25 }}>
        <XStack>
          <XStack style={styles.dateTimeSection}>
            <Text style={styles.dateTimeLabel}>Start date</Text>
            <TouchableOpacity
              onPress={() => handleSelectDate(startDateObj, setStartDate)}>
              <Text style={styles.dateTimeInput}>
                {displayDate(startDateObj)}
              </Text>
            </TouchableOpacity>
          </XStack>
          <XStack style={styles.dateTimeSection}>
            <Text style={styles.dateTimeLabel}>Start time</Text>
            <TouchableOpacity
              onPress={() => handleSelectTime(startDateObj, setStartDate)}>
              <Text style={styles.dateTimeInput}>
                {displayTime(startDateObj)}
              </Text>
            </TouchableOpacity>
          </XStack>
        </XStack>
        <XStack>
          <XStack style={styles.dateTimeSection}>
            <Text style={styles.dateTimeLabel}>End date</Text>
            <TouchableOpacity
              onPress={() => handleSelectDate(endDateObj, setEndDate)}>
              <Text style={styles.dateTimeInput}>
                {displayDate(endDateObj)}
              </Text>
            </TouchableOpacity>
          </XStack>
          <XStack style={styles.dateTimeSection}>
            <Text style={styles.dateTimeLabel}>End time</Text>
            <TouchableOpacity
              onPress={() => handleSelectDate(endDateObj, setEndDate)}>
              <Text style={styles.dateTimeInput}>
                {displayTime(endDateObj)}
              </Text>
            </TouchableOpacity>
          </XStack>
        </XStack>
        <View>
          <Text>Break duration</Text>
          <TextInput
            keyboardType="numeric"
            value={breakDuration.toString()}
            onChangeText={text => {
              if (text.length === 0) return setBreakDuration(0);
              setBreakDuration(parseInt(text.replace(/\D/g, ''), 10));
            }}
          />
        </View>
        <View>
          <Text>Description</Text>
          <Text>{description}</Text>
        </View>
      </View>
      <Button
        style={{ position: 'absolute', bottom: 10, right: 10, padding: 5 }}
        onPress={onSave}
        icon={<Check />}>
        Save
      </Button>
      {selectedEntry !== undefined && (
        <Button
          style={{ position: 'absolute', bottom: 10, left: 10, padding: 5 }}
          onPress={() => onDelete(selectedEntry)}
          icon={<Delete />}>
          Delete
        </Button>
      )}
    </View>
  );
};

export default ShiftEntryForm;

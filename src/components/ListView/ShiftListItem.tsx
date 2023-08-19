import React, { memo, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { ShiftEntryInState } from '../../types/shifts';
import { useShiftStore } from '../../zustand/shiftStore';
import { ShiftStackParamList } from '../../types/views';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = {
  entry: ShiftEntryInState;
  idx: number;
};

const evenBgColor = 'rgba(0,0,0,0.08)';
const oddBgColor = 'rgba(0,0,0,0)';

const ShiftListItem = memo(({ entry, idx }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShiftStackParamList, 'List'>>();
  const removeShift = useShiftStore(state => state.removeEntry);

  const [expanded, setExpanded] = useState(false);

  const onPress = () => setExpanded(o => !o);
  const onHold = () => {
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
                  onPress: () => removeShift(entry.id),
                },
                {
                  text: 'Cancel',
                },
              ],
            );
          },
        },
        {
          text: 'Cancel',
        },
      ],
    );
  };

  const getDateDiff = (startDate: Date, endDate: Date) => {
    const diff = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60 / 60 - hours) * 60);
    return { hours, minutes };
  };

  const startDateObj = useMemo(
    () => new Date(entry.startDate),
    [entry.startDate],
  );
  const endDateObj = useMemo(() => new Date(entry.endDate), [entry.endDate]);

  const difference = useMemo(
    () => getDateDiff(startDateObj, endDateObj),
    [startDateObj, endDateObj],
  );

  return (
    <View
      key={entry.id}
      style={{
        paddingVertical: expanded ? 15 : 10,
        paddingHorizontal: 15,
        backgroundColor: idx % 2 === 0 ? evenBgColor : oddBgColor,
      }}>
      <TouchableOpacity onPress={onPress} onLongPress={onHold}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>
              {startDateObj.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text>{startDateObj.toLocaleDateString('en-GB')}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>
              {endDateObj.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text>{endDateObj.toLocaleDateString('en-GB')}</Text>
          </View>
          <View>
            <Text>
              {difference.hours}h {difference.minutes}m
            </Text>
          </View>
        </View>

        {expanded && (
          <View style={{ marginTop: 5 }}>
            <View>
              <Text>id: {entry.id}</Text>
            </View>
            <View>
              <Text>break: {entry.breakDuration}</Text>
            </View>
            <View>
              <Text>description: {entry.description}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
});

export default ShiftListItem;

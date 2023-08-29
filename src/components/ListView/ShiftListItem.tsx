import React, { memo, useMemo } from 'react';
import { Text, View, Alert } from 'react-native';
import { ShiftEntryInState } from '../../types/shifts';
import { useShiftStore } from '../../zustand/shiftStore';
import { ShiftStackParamList } from '../../types/views';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import SimpleAccordion from '../common/SimpleAccordion';

type Props = {
  entryId: ShiftEntryInState['id'];
  idx: 'even' | 'odd';
};

const evenBgOpacity = 0.07;
const oddBgOpacity = 0.02;

const ShiftListItem = memo(({ entryId, idx }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShiftStackParamList, 'List'>>();
  const removeShift = useShiftStore(state => state.removeEntry);
  const entry = useShiftStore(state => state.list[entryId]);

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
    <SimpleAccordion
      onLongPress={onHold}
      container={({ expanded, children }) => (
        <View
          style={{
            paddingVertical: expanded ? 15 : 10,
            paddingHorizontal: 15,
            backgroundColor:
              idx === 'even'
                ? `rgba(0,0,0,${evenBgOpacity})`
                : `rgba(0,0,0,${oddBgOpacity})`,
          }}>
          {children}
        </View>
      )}
      summary={({}) => (
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
      )}
      details={({}) => (
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
    />
  );
});

export default ShiftListItem;

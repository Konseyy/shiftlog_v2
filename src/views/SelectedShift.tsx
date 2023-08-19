import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ShiftStackParamList } from '../types/views';
import { useShiftStore } from '../zustand/shiftStore';
import SaveButton from '../components/SelectedEntry/SaveButton';
import { Alert, Center, HStack, useToast } from 'native-base';

const SelectedShift = memo(() => {
  const toast = useToast();
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
    toast.show({
      placement: 'top',
      render: () => {
        return (
          <Alert variant={'left-accent'} status="success">
            <HStack>
              <Center>
                <Alert.Icon />
              </Center>
              <Text style={{ marginLeft: 5 }}>Saved successfully</Text>
            </HStack>
          </Alert>
        );
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({ title: headerText });
  }, [headerText, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <SaveButton onPress={onSave} />
    </SafeAreaView>
  );
});

export default SelectedShift;

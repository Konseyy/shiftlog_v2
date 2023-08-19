import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ShiftStackParamList } from '../../types/views';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';

type Props = {};

const AddEntryButton = ({}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShiftStackParamList, 'List'>>();

  return (
    <Button
      style={{ position: 'absolute', bottom: 10, right: 10 }}
      onPress={() => navigation.navigate('Selected', undefined)}
      icon={<Plus />}>
      Add
    </Button>
  );
};

export default AddEntryButton;

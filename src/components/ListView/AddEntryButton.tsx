import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ShiftStackParamList } from '../../types/views';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddIcon, Button } from 'native-base';

type Props = {};

const AddEntryButton = ({}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShiftStackParamList, 'List'>>();

  return (
    <Button
      style={{ position: 'absolute', bottom: 10, right: 10 }}
      colorScheme={'info'}
      onPress={() => navigation.navigate('Selected', undefined)}
      leftIcon={<AddIcon />}>
      Add
    </Button>
  );
};

export default AddEntryButton;

import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShiftStackParamList } from '../../types/views';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {};

const AddEntry = ({}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShiftStackParamList, 'List'>>();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
      }}>
      <Button
        title="Add new"
        onPress={() => navigation.navigate('Selected', undefined)}
      />
    </View>
  );
};

export default AddEntry;

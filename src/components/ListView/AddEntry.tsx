import React from 'react';
import { Button } from 'react-native';

type Props = {
  onNewEntry: () => void;
};

const AddEntry = ({ onNewEntry }: Props) => {
  return <Button title="Add new" onPress={onNewEntry} />;
};

export default AddEntry;

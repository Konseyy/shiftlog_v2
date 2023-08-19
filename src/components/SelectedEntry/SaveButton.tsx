import { Button, CheckIcon } from 'native-base';
import React from 'react';

type Props = {
  onPress(): void;
};

const SaveButton = ({ onPress }: Props) => {
  return (
    <Button
      style={{ position: 'absolute', bottom: 10, right: 10, padding: 5 }}
      colorScheme={'info'}
      onPress={onPress}
      leftIcon={<CheckIcon />}
    />
  );
};

export default SaveButton;

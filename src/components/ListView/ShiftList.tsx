import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useShiftStore } from '../../zustand/shiftStore';
import ShiftListItem from './ShiftListItem';

type Props = {
  onEdit: (id: string) => void;
};

const ShiftList = ({ onEdit }: Props) => {
  const shiftEntries = useShiftStore(state => state.list);
  const shiftEntriesArray = useMemo(
    () => Object.values(shiftEntries).sort((a, b) => a.startDate - b.startDate),
    [shiftEntries],
  );
  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {shiftEntriesArray.map(entry => {
        return <ShiftListItem key={entry.id} entry={entry} onEdit={onEdit} />;
      })}
    </ScrollView>
  );
};

export default ShiftList;

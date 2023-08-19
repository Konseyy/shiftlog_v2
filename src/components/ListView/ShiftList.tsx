import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useShiftStore } from '../../zustand/shiftStore';
import ShiftListItem from './ShiftListItem';
import { Accordion } from 'tamagui';

type Props = {};

const ShiftList = ({}: Props) => {
  const shiftEntries = useShiftStore(state => state.list);
  const sortedShifts = useMemo(
    () => Object.values(shiftEntries).sort((a, b) => b.startDate - a.startDate),
    [shiftEntries],
  );
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
      <Accordion type={'multiple'}>
        {sortedShifts.map((entry, idx) => {
          return <ShiftListItem key={entry.id} entry={entry} idx={idx} />;
        })}
      </Accordion>
    </ScrollView>
  );
};

export default ShiftList;

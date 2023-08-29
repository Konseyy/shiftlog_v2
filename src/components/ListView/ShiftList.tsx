import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useShiftStore } from '../../zustand/shiftStore';
import ShiftListItem from './ShiftListItem';

type Props = {};

const ShiftList = ({}: Props) => {
  const shiftEntries = useShiftStore(state => state.list);
  const sortedShiftIds = useMemo(
    () =>
      Object.values(shiftEntries)
        .sort((a, b) => b.startDate - a.startDate)
        .map(e => e.id),
    [shiftEntries],
  );
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
      {sortedShiftIds.map((entry, idx) => {
        return (
          <ShiftListItem
            key={entry}
            entryId={entry}
            idx={idx % 2 === 0 ? 'even' : 'odd'}
          />
        );
      })}
    </ScrollView>
  );
};

export default ShiftList;

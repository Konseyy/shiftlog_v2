import React, { memo, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useShiftStore } from '../zustand/shiftStore';
import ShiftList from '../components/ListView/ShiftList';
import ListHeader from '../components/ListView/ListHeader';
import AddEntry from '../components/ListView/AddEntry';

const ListView = memo(() => {
  const loadState = useShiftStore(state => state.loadSavedEntries);
  const shiftEntries = useShiftStore(state => state.list);
  const persistState = useShiftStore(state => state.saveEntries);
  const addShiftEntry = useShiftStore(state => state.addEntry);
  const editShiftEntry = useShiftStore(state => state.updateEntry);

  const addShift = useCallback(
    (...params: Parameters<typeof addShiftEntry>) => {
      addShiftEntry(...params);
      persistState();
    },
    [addShiftEntry, persistState],
  );

  const editShift = useCallback(
    (id: string) => {
      editShiftEntry(id, {
        ...shiftEntries[id],
        endDate: Date.now(),
      });
    },
    [editShiftEntry, shiftEntries],
  );

  useEffect(() => {
    // Load state from storage on mount
    loadState();
  }, [loadState]);

  const onNewEntry = useCallback(() => {
    // Later replace with navigating to the new entry screen
    addShift({
      startDate: Date.now(),
      endDate: Date.now(),
      breakDuration: 0,
    });
  }, [addShift]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ListHeader />
      <ShiftList onEdit={editShift} />
      <AddEntry onNewEntry={onNewEntry} />
    </SafeAreaView>
  );
});

export default ListView;

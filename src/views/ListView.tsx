import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';
import ShiftList from '../components/ListView/ShiftList';
import ListHeader from '../components/ListView/ListHeader';
import AddEntryButton from '../components/ListView/AddEntryButton';

const ListView = memo(() => {
  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      <ListHeader />
      <ShiftList />
      <AddEntryButton />
    </SafeAreaView>
  );
});

export default ListView;

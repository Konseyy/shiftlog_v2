import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';
import ShiftList from '../components/ListView/ShiftList';
import ListHeader from '../components/ListView/ListHeader';
import AddEntry from '../components/ListView/AddEntry';

const ListView = memo(() => {
  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      <ListHeader />
      <ShiftList />
      <AddEntry />
    </SafeAreaView>
  );
});

export default ListView;

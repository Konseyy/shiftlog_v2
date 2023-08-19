import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  ShiftEntryInState,
  ShiftEntryInput,
  shiftEntryValidator,
} from '../types/shifts';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

type ShiftStoreState = {
  list: {
    [id: string]: ShiftEntryInState;
  };
};

type ShiftStoreActions = {
  addEntry(entry: ShiftEntryInput): string;
  updateEntry(id: string, entry: ShiftEntryInput): void;
  removeEntry(id: string): void;
  loadSavedEntries(): void;
};

const asyncStorageKey = 'shifts';

const persistShifts = (list: ShiftStoreState['list']) => {
  AsyncStorage.setItem(asyncStorageKey, JSON.stringify(list)).catch(
    console.error,
  );
};

const getPersistedShifts = async (): Promise<ShiftStoreState['list']> => {
  try {
    const storedData = await AsyncStorage.getItem(asyncStorageKey);
    if (!storedData) return {};
    const dataValidator = z.object({}).catchall(shiftEntryValidator);
    const validatedData = dataValidator.parse(JSON.parse(storedData || '{}'));
    return validatedData;
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const useShiftStore = create(
  immer<ShiftStoreState & ShiftStoreActions>((set, get) => {
    return {
      // state
      list: {},
      // actions
      addEntry: entry => {
        const uid = uuid.v4();
        const id = uid.toString();
        set(state => {
          state.list[id] = { id, ...entry };
        });
        persistShifts(get().list);
        return id;
      },
      updateEntry: (id, entry) => {
        set(state => {
          state.list[id] = { id, ...entry };
        });
        persistShifts(get().list);
      },
      removeEntry: id => {
        set(state => {
          delete state.list[id];
        });
        persistShifts(get().list);
      },
      loadSavedEntries: async () => {
        const persistedShifts = await getPersistedShifts();
        set(state => {
          state.list = persistedShifts;
        });
      },
    };
  }),
);

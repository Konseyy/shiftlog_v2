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
  updateEntry(id: string, entry: ShiftEntryInState): void;
  removeEntry(id: string): void;
  saveEntries(): void;
  loadSavedEntries(): void;
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
        return id;
      },
      updateEntry: (id, entry) => {
        set(state => {
          state.list[id] = entry;
        });
      },
      removeEntry: id => {
        set(state => {
          delete state.list[id];
        });
      },
      saveEntries: () => {
        AsyncStorage.setItem('shifts', JSON.stringify(get().list)).catch(
          console.error,
        );
      },
      loadSavedEntries: () => {
        try {
          AsyncStorage.getItem('shifts').then(data => {
            if (data) {
              const list = JSON.parse(data);
              const validatedData = z
                .object({})
                .catchall(shiftEntryValidator)
                .parse(list);
              set(state => {
                state.list = validatedData;
              });
            }
          });
        } catch (e) {
          console.error(e);
          set(state => {
            state.list = {};
          });
        }
      },
    };
  }),
);

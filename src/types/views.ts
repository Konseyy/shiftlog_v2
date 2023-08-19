export type RootStackParamList = {
  Shifts: undefined;
  Export: undefined;
  Settings: undefined;
};

export type ShiftStackParamList = {
  List: undefined;
  // undefined for add, string `id` for edit
  Add: undefined | { id: string };
};

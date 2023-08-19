import { z } from 'zod';

export const shiftEntryValidator = z.object({
  id: z.string(),
  startDate: z.number(),
  endDate: z.number(),
  breakDuration: z.number(),
  description: z.string().optional(),
});

export interface ShiftEntryInState
  extends z.infer<typeof shiftEntryValidator> {}

export interface ShiftEntryInput
  extends Omit<z.infer<typeof shiftEntryValidator>, 'id'> {}

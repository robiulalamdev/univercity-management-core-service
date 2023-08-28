import { z } from 'zod';

const create = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'Title is Required',
    }),
    floor: z.string({
      required_error: 'Title is Required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    roomNumber: z.string().optional(),
    floor: z.string().optional(),
  }),
});

export const RoomValidation = {
  create,
  update,
};

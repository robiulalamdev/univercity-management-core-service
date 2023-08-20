import { z } from 'zod';

const createAcademicSemesterValidation = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is Required',
    }),
    title: z.string({
      required_error: 'Title is Required',
    }),
    startMonth: z.string({
      required_error: 'start Month is Required',
    }),
    endMonth: z.string({
      required_error: 'End Month is Required',
    }),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidation,
};

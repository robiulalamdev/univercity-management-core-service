import { z } from 'zod';

const createStudent = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'student Id is Required',
    }),
    firstName: z.string({
      required_error: 'First Name is Required',
    }),
    middleName: z.string({
      required_error: 'Middle Name is Required',
    }),
    lastName: z
      .string({
        required_error: 'Last Name is Required',
      })
      .optional(),
  }),
  profileImage: z.string({
    required_error: 'profile Image is Required',
  }),
  email: z.string({
    required_error: 'email is Required',
  }),
  contactNo: z.string({
    required_error: 'contact No is Required',
  }),
  gender: z.string({
    required_error: 'gender is Required',
  }),
  bloodGroup: z.string({
    required_error: 'blood Group is Required',
  }),
  academicSemesterId: z.string({
    required_error: 'academic Semester Id is Required',
  }),
  academicDepartmentId: z.string({
    required_error: 'academic Id is Required',
  }),
  academicFacultyId: z.string({
    required_error: 'academic Faculty Id is Required',
  }),
});

const updateStudent = z.object({
  body: z.object({
    studentId: z
      .string({
        required_error: 'student Id is Required',
      })
      .optional(),
    firstName: z
      .string({
        required_error: 'First Name is Required',
      })
      .optional(),
    middleName: z
      .string({
        required_error: 'Middle Name is Required',
      })
      .optional(),
    lastName: z
      .string({
        required_error: 'Last Name is Required',
      })
      .optional(),
  }),
  profileImage: z
    .string({
      required_error: 'profile Image is Required',
    })
    .optional(),
  email: z
    .string({
      required_error: 'email is Required',
    })
    .optional(),
  contactNo: z
    .string({
      required_error: 'contact No is Required',
    })
    .optional(),
  gender: z
    .string({
      required_error: 'gender is Required',
    })
    .optional(),
  bloodGroup: z
    .string({
      required_error: 'blood Group is Required',
    })
    .optional(),
  academicSemesterId: z
    .string({
      required_error: 'academic Semester Id is Required',
    })
    .optional(),
  academicDepartmentId: z
    .string({
      required_error: 'academic Id is Required',
    })
    .optional(),
  academicFacultyId: z
    .string({
      required_error: 'academic Faculty Id is Required',
    })
    .optional(),
});

export const studentValidation = {
  createStudent,
  updateStudent,
};

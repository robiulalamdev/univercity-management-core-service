import { Prisma, PrismaClient, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { StudentSearchAbleFields } from './student.constant';
import { IStudentFilter } from './student.interface';

const prisma = new PrismaClient();

const insertIntoDb = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IStudentFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, skip, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: StudentSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([key, value]) => ({
        [key]: {
          equals: value,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.student.count();
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleData = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const deleteFromDBById = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const updateIntoDbById = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const studentService = {
  insertIntoDb,
  getAllFromDB,
  deleteFromDBById,
  updateIntoDbById,
  getSingleData,
};

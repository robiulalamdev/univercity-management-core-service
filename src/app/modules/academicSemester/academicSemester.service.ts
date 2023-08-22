import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  AcademicSemesterFilterAbleFileds,
  AcademicSemesterSearchAbleFields,
} from './academicSemester.constant';
import { IAcademicSemesterFilter } from './academicSemester.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

const getDataFromDB = async (
  filters: IAcademicSemesterFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { limit, skip, page, sortOrder, sortBy } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AcademicSemesterSearchAbleFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: AcademicSemesterFilterAbleFileds.map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleDataById = async (
  id: string
): Promise<AcademicSemester | null> => {
  const result = prisma.academicSemester.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const result = prisma.academicSemester.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};
const deleteFromDbById = async (id: string): Promise<AcademicSemester> => {
  const result = prisma.academicSemester.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const academicSemesterService = {
  insertIntoDB,
  getDataFromDB,
  getSingleDataById,
  updateDataById,
  deleteFromDbById,
};

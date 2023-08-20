import { AcademicSemester, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

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
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { limit, skip, page } = paginationHelpers.calculatePagination(options);

  const result = await prisma.academicSemester.findMany({
    skip,
    take: limit,
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

export const academicSemesterService = {
  insertIntoDB,
  getDataFromDB,
};

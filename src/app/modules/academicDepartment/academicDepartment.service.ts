import { AcademicDepartment, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from './../../../interfaces/common';
import { academicDepartmentSearchAbleFields } from './academicDepartment.constant';
import { IAcademicFilter } from './academicDepartment.interface';

const prisma = new PrismaClient();

const insertIntoDb = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IAcademicFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicDepartmentSearchAbleFields.map(field => ({
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

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.academicDepartment.count();

  return {
    data: result,
    meta: {
      total,
      limit,
      page,
    },
  };
};

const getSingleData = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const deleteFromDBById = async (id: string): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const updateIntoDbById = async (
  id: string,
  data: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id: id,
    },
    data: data,
  });
  return result;
};

export const academicDepartmentService = {
  insertIntoDb,
  getAllFromDB,
  getSingleData,
  deleteFromDBById,
  updateIntoDbById,
};

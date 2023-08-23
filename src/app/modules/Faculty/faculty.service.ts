import { Faculty, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { FacultySearchAbleFields } from './faculty.constant';
import { IFacultyFilter } from './faculty.interface';

const prisma = new PrismaClient();

const insertFacultyIntoDb = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });
  return result;
};

const getAllFacultyFromDB = async (
  filters: IFacultyFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, skip, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: FacultySearchAbleFields.map(field => ({
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

  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.faculty.count();
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleFacultyData = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const deleteFacultyFromDBById = async (id: string): Promise<Faculty> => {
  const result = await prisma.faculty.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const updateFacultyIntoDbById = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const facultyService = {
  insertFacultyIntoDb,
  getAllFacultyFromDB,
  deleteFacultyFromDBById,
  updateFacultyIntoDbById,
  getSingleFacultyData,
};

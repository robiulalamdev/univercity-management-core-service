import { AcademicFaculty, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AcademicFacultySearchAbleFields } from './academicFaculty.constant';
import { IAcademicFacultyFilter } from './academicFaculty.interface';

const prisma = new PrismaClient();

const insertIntoDb = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IAcademicFacultyFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, skip, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AcademicFacultySearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    console.log(filtersData);
    andConditions.push({
      AND: Object.entries(filtersData).map(([key, value]) => ({
        [key]: {
          equals: value,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicFaculty.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.academicFaculty.count({
    where: whereConditions,
  });
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleData = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const deleteFromDBById = async (id: string): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const updateIntoDbById = async (
  id: string,
  payload: Partial<AcademicFaculty>
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const academicFacultyService = {
  insertIntoDb,
  getAllFromDB,
  deleteFromDBById,
  updateIntoDbById,
  getSingleData,
};

import { Building, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { BuildingSearchAbleFields } from './building.constant';
import { IBuildingFilter } from './building.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getDataFromDB = async (
  filters: IBuildingFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  const { limit, skip, page, sortOrder, sortBy } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BuildingSearchAbleFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: {
          equals: value,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.building.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.building.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleDataById = async (id: string): Promise<Building | null> => {
  const result = prisma.building.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Building>
): Promise<Building> => {
  const result = prisma.building.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};
const deleteFromDbById = async (id: string): Promise<Building> => {
  const result = prisma.building.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const buildingService = {
  insertIntoDB,
  getDataFromDB,
  getSingleDataById,
  updateDataById,
  deleteFromDbById,
};

import { Prisma, PrismaClient, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { RoomSearchAbleFields } from './room.constant';
import { IRoomFilter } from './room.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
  });
  return result;
};

const getDataFromDB = async (
  filters: IRoomFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  const { limit, skip, page, sortOrder, sortBy } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: RoomSearchAbleFields.map(filed => ({
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

  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.room.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.room.count({
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

const getSingleDataById = async (id: string): Promise<Room | null> => {
  const result = prisma.room.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Room>
): Promise<Room> => {
  const result = prisma.room.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};
const deleteFromDbById = async (id: string): Promise<Room> => {
  const result = prisma.room.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const roomService = {
  insertIntoDB,
  getDataFromDB,
  getSingleDataById,
  updateDataById,
  deleteFromDbById,
};

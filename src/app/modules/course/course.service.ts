import { Course, Prisma, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { asyncForEach } from '../../../shared/utils';
import { CourseSearchAbleFields } from './course.constant';
import {
  ICourseCreateData,
  ICourseFilter,
  IPrerequisiteCourseRequest,
} from './course.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  console.log('course data', courseData);
  console.log('pre requisite course data: ', preRequisiteCourses);

  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      await asyncForEach(
        preRequisiteCourses,
        async (preRequisiteCourse: IPrerequisiteCourseRequest) => {
          const createPrerequisite =
            await transactionClient.courseToPreRequisite.create({
              data: {
                courseId: result.id,
                preRequisiteId: preRequisiteCourse.courseId,
              },
            });
          console.log(createPrerequisite);
        }
      );
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const getDataFromDB = async (
  filters: ICourseFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { limit, skip, page, sortOrder, sortBy } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: CourseSearchAbleFields.map(filed => ({
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

  const whereConditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.course.count({
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

const getSingleDataById = async (id: string): Promise<Course | null> => {
  const result = prisma.course.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Course>
): Promise<Course> => {
  const result = prisma.course.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};
const deleteFromDbById = async (id: string): Promise<Course> => {
  const result = prisma.course.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const courseService = {
  insertIntoDB,
  getDataFromDB,
  getSingleDataById,
  updateDataById,
  deleteFromDbById,
};

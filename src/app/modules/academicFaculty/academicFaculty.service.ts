import { AcademicFaculty, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertIntoDb = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
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
  deleteFromDBById,
  updateIntoDbById,
  getSingleData,
};

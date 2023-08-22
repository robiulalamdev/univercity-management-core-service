import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyFilterAbleFields } from './academicFaculty.constant';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.insertIntoDb(req.body);
    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Create Successful!',
      data: result,
    });
  }
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicFacultyFilterAbleFields);
    const options = pick(req.query, paginationFields);
    const result = await academicFacultyService.getAllFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty delete Successful!',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.getSingleData(req.params.id);
    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty get Successful!',
      data: result,
    });
  }
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.updateIntoDbById(
      req.params.id,
      req.body
    );
    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Update Successful!',
      data: result,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.deleteFromDBById(req.params.id);
    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty delete Successful!',
      data: result,
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};

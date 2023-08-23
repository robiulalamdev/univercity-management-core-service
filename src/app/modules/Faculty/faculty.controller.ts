import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FacultyFilterAbleFields } from './faculty.constant'; // Update to the actual constant
import { facultyService } from './faculty.service'; // Update to the actual service

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.insertFacultyIntoDb(req.body); // Update function name
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Create Successful!',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FacultyFilterAbleFields); // Update to the actual filter fields
  const options = pick(req.query, paginationFields);
  const result = await facultyService.getAllFacultyFromDB(filters, options); // Update function name
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieval Successful!',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.getSingleFacultyData(req.params.id); // Update function name
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieval Successful!',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.updateFacultyIntoDbById(
    req.params.id,
    req.body
  ); // Update function name
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Update Successful!',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.deleteFacultyFromDBById(req.params.id); // Update function name
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Delete Successful!',
    data: result,
  });
});

export const facultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};

import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CourseFilterAbleFields } from './course.constant';
import { buildingService, courseService } from './course.service';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.insertIntoDB(req.body);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Create Successful',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CourseFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await courseService.getDataFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve Courses Successful',
    meta: result?.meta,
    data: result?.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.getSingleDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve Get Successful',
    data: result,
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.updateDataById(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Update Successful',
    data: result,
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.deleteFromDbById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course Delete Successful',
    data: result,
  });
});

export const courseController = {
  createBuilding,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};

import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BuildingFilterAbleFields } from './building.constant';
import { buildingService } from './building.service';

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
  const filters = pick(req.query, BuildingFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await buildingService.getDataFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve Buildings Successful',
    meta: result?.meta,
    data: result?.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.getSingleDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve Get Successful',
    data: result,
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.updateDataById(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Update Successful',
    data: result,
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.deleteFromDbById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Delete Successful',
    data: result,
  });
});

export const buildingController = {
  createBuilding,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};

import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { RoomFilterAbleFields } from './building.constant';
import { roomService } from './building.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.insertIntoDB(req.body);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Create Successful',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, RoomFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await roomService.getDataFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve Rooms Successful',
    meta: result?.meta,
    data: result?.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.getSingleDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve Get Successful',
    data: result,
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.updateDataById(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Update Successful',
    data: result,
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.deleteFromDbById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Delete Successful',
    data: result,
  });
});

export const roomController = {
  create,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};

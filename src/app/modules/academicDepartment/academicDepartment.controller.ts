import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterAbleFields } from './academicDepartment.constant';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDept = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentService.insertIntoDb(req.body);

  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Create Successful!',
    data: result,
  });
});
const getAllAcademicDept = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterAbleFields);
  const options = pick(req.query, paginationFields);
  const result = await academicDepartmentService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department get Successful!',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleAcademicDept = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.getSingleData(req.params.id);

    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department get Successful!',
      data: result,
    });
  }
);

const updateAcademicDeptById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.updateIntoDbById(
      req.params.id,
      req.body
    );

    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department update Successful!',
      data: result,
    });
  }
);

const deleteAcademicDeptById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.deleteFromDBById(
      req.params.id
    );
    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department delete Successful!',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createAcademicDept,
  getAllAcademicDept,
  getSingleAcademicDept,
  updateAcademicDeptById,
  deleteAcademicDeptById,
};

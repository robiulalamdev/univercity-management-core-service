import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(academicSemesterValidation.createAcademicSemesterValidation),
  academicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoutes = router;

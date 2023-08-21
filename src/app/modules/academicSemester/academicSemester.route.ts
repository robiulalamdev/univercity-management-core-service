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
router.get('/', academicSemesterController.getAllFromDB);
router.get('/:id', academicSemesterController.getDataById);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterValidation),
  academicSemesterController.updateDataById
);
router.delete('/:id', academicSemesterController.deleteDataById);

export const AcademicSemesterRoutes = router;

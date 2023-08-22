import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(academicFacultyValidation.createAcademicFaculty),
  academicFacultyController.createAcademicFaculty
);
router.get('/', academicFacultyController.getAllAcademicFaculties);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateAcademicFaculty),
  academicFacultyController.updateAcademicFaculty
);
router.delete('/:id', academicFacultyController.deleteAcademicFaculty);

export const AcademicFacultyRoutes = router;

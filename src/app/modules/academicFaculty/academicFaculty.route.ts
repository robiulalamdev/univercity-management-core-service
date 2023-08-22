import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post('/', academicFacultyController.createAcademicFaculty);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch('/:id', academicFacultyController.updateAcademicFaculty);
router.delete('/:id', academicFacultyController.deleteAcademicFaculty);

export const AcademicFacultyRoutes = router;

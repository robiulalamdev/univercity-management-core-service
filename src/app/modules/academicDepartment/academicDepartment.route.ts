import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();

router.post('/', AcademicDepartmentController.createAcademicDept);
router.get('/', AcademicDepartmentController.getAllAcademicDept);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDept);
router.patch('/:id', AcademicDepartmentController.updateAcademicDeptById);
router.delete('/:id', AcademicDepartmentController.deleteAcademicDeptById);

export const AcademicDepartmentRoutes = router;

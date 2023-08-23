import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentValidation } from './student.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(studentValidation.createStudent),
  studentController.createStudent
);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudent),
  studentController.updateStudent
);
router.delete('/:id', studentController.deleteStudent);

export const StudentRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseController } from './course.controller';
import { CourseValidation } from './course.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(CourseValidation.create),
  courseController.createBuilding
);
router.get('/', courseController.getAllFromDB);
router.get('/:id', courseController.getDataById);
router.patch(
  '/:id',
  validateRequest(CourseValidation.update),
  courseController.updateDataById
);
router.delete('/:id', courseController.deleteDataById);

export const CourseRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facultyController } from './faculty.controller'; // Update to the faculty controller
import { facultyValidation } from './faculty.validation'; // Update to the faculty validation
const router = express.Router();

router.post(
  '/',
  validateRequest(facultyValidation.createFaculty), // Update validation function
  facultyController.createFaculty // Update controller function
);
router.get('/', facultyController.getAllFaculties); // Update controller function
router.get('/:id', facultyController.getSingleFaculty); // Update controller function
router.patch(
  '/:id',
  validateRequest(facultyValidation.updateFaculty), // Update validation function
  facultyController.updateFaculty // Update controller function
);
router.delete('/:id', facultyController.deleteFaculty); // Update controller function

export const FacultyRoutes = router;

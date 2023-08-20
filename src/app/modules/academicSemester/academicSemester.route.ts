import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post('/', academicSemesterController.createAcademicSemester);

export const AcademicSemesterRoutes = router;

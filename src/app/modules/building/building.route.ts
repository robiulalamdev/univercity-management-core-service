import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { buildingController } from './building.controller';
import { BuildingValidation } from './building.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(BuildingValidation.create),
  buildingController.createBuilding
);
router.get('/', buildingController.getAllFromDB);
router.get('/:id', buildingController.getDataById);
router.patch(
  '/:id',
  validateRequest(BuildingValidation.update),
  buildingController.updateDataById
);
router.delete('/:id', buildingController.deleteDataById);

export const BuildingRoutes = router;

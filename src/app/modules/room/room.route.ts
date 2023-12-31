import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { roomController } from './room.controller';
import { RoomValidation } from './room.validation';
const router = express.Router();

router.post('/', validateRequest(RoomValidation.create), roomController.create);
router.get('/', roomController.getAllFromDB);
router.get('/:id', roomController.getDataById);
router.patch(
  '/:id',
  validateRequest(RoomValidation.update),
  roomController.updateDataById
);
router.delete('/:id', roomController.deleteDataById);

export const RoomRoutes = router;

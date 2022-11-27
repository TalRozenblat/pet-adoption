import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";


router.route('/').get(userController.getallUsers);

router.route('/:id').get(userController.getUserById).put(userController.updateUser);

router.route('/:id/full').get(userController.getFullUserById)

export default router;

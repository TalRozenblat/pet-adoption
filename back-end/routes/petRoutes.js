import express from "express";
import multer from "multer";
const router = express.Router();
import petController from "../controllers/petController.js";
// import addPetValidation from '../middlewares/addPetValidation.js';
const upload = multer({ dest: process.env.UPLOAD_FOLDER + '/'});


router.route('/').get(petController.getPets).post(upload.single('picture'), petController.addPet);

router.route('/:id').get(petController.getPet).put(upload.single('picture'), petController.editPet);

router.route('/:id/adopt').post(petController.adoptPet);

router.route('/:id/return').post(petController.returnPet);

router.route('/:id/save').post(petController.savePet).delete(petController.deletePet);

router.route('/:id/like').get(petController.doesUserLike);

router.route('/user/:id').get(petController.getPetsByUserId2);




export default router;

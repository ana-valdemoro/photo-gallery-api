import { Router } from "express";
import {
  createPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
} from "../controllers/photo.controller";
import multer from "../libs/multer";

const router = Router();

router
  .route("/photos")
  .post(multer.single("image"), createPhoto)
  .get(getPhotos);

router.route("/photos/:id").get(getPhoto).delete(deletePhoto).put(updatePhoto);

export default router;

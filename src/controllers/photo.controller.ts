import { Request, Response } from "express";
import Photo from "../models/Photo";
import path from "path";
import fs from "fs-extra";

export async function getPhotos(
  req: Request,
  res: Response
): Promise<Response> {
  const photosArray = await Photo.find();
  return res.json(photosArray);
}

export async function createPhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { title, description } = req.body;

  if (req === undefined || req.file === undefined)
    return res
      .status(400)
      .json({ message: "Bad Request: Image is not being sent" });

  const newPhoto = {
    title,
    description,
    imagePath: req.file.path,
  };

  const photo = new Photo(newPhoto);

  await photo.save();

  console.log("saving photo", photo);
  return res.json({ message: "Photo successfully saved", photo });
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const foundPhoto = await Photo.findById(id);

  return res.json(foundPhoto);
}

export async function deletePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  const foundPhoto = await Photo.findByIdAndDelete(id);
  if (foundPhoto) {
    await fs.unlink(path.resolve(foundPhoto.imagePath));
  }

  return res.json({ message: "Photo deleted", photo: foundPhoto });
}

export async function updatePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedPhoto = await Photo.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    { new: true }
  );

  return res.json({ photo: updatedPhoto });
}

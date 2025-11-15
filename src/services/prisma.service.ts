import { PrismaClient } from "generated/prisma/client";
import {cache} from 'react';

const prisma = new PrismaClient();

export const getAllPhotographers = cache(() => prisma.photographer.findMany());

export const getPhotographer = cache((id: number) =>
  prisma.photographer.findUnique({
    where: { id },
  }));

export const getAllMediasForPhotographer = cache((photographerId : number) =>
  prisma.media.findMany({
    where: { photographerId },
  }));

export const updateNumberOfLikes = cache((mediaId: number, newNumberOfLikes: number) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  }));
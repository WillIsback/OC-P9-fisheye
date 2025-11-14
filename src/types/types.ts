import { fetchPhotographers, fetchPictures } from "@/actions/prisma.action"
import { VALID_SORTS } from "@/lib/constants";

export type Photographers = Awaited<ReturnType<typeof fetchPhotographers>> 
export type EnhancedPhotographers =  Array<
    Photographers[number] & {RatioCorrection: {
        zoom: number,
        x: string,
        y: string
    }}
>;
export type Photographer = Photographers[number];
export type EnhancedPhotographer = EnhancedPhotographers[number];

export type Pictures = Awaited<ReturnType<typeof fetchPictures>>;
export type Picture = Pictures[number];
export type SortCategory = typeof VALID_SORTS[number]; 
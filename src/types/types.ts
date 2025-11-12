import { fetchPhotographers, fetchPictures } from "@/actions/prisma.action"


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

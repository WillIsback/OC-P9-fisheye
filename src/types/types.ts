import { fetchPhotographers } from "@/actions/prisma.action"

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


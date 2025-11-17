import type {
	fetchPhotographers,
	fetchPictures,
} from "@/actions/prisma.action";
import type { VALID_SORTS } from "@/lib/constants";

export type Photographers = Awaited<ReturnType<typeof fetchPhotographers>>;

export type Photographer = NonNullable<Photographers>[number];

export type EnhancedPhotographer = Photographer & {
	RatioCorrection: {
		zoom: number;
		x: string;
		y: string;
	};
};

export type EnhancedPhotographers = Array<EnhancedPhotographer>;

export type Pictures = Awaited<ReturnType<typeof fetchPictures>>;
export type Picture = NonNullable<Pictures>[number];
export type SortCategory = (typeof VALID_SORTS)[number];

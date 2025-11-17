"use server";
import { getFocusCorrection, getRatioCorrection } from "@/lib/utils.server";
import {
	getAllMediasForPhotographer,
	getAllPhotographers,
	getPhotographer,
} from "@/services/prisma.service";

async function fetchPhotographers() {
	try {
		const listofPhotographers = await getAllPhotographers();
		const enhancedPhotographers = await Promise.all(
			listofPhotographers.map(async (p) => ({
				...p,
				RatioCorrection: await getRatioCorrection(p.portrait),
			})),
		);
		// console.log("listofPhotographers : ", enhancedPhotographers)
		return enhancedPhotographers;
	} catch (e) {
		console.error("Erreur de recupération des photographes :", e);
		return null;
	}
}

async function fetchPhotographer(photographerId: number) {
	try {
		const photographer = await getPhotographer(photographerId);
		if (photographer) {
			const enhancedPhotographer = {
				...photographer,
				RatioCorrection: await getRatioCorrection(photographer.portrait),
			};
			// console.log("Photographer : ", photographer)
			return enhancedPhotographer;
		} else {
			return null;
		}
	} catch (e) {
		console.error("Erreur de recupération des photographes :", e);
		return null;
	}
}

async function fetchPictures(photographerId: number) {
	try {
		const pictures = await getAllMediasForPhotographer(photographerId);
		const enhancedPictures = await Promise.all(
			pictures.map(async (p) => ({
				...p,
				Focus: p.image ? getFocusCorrection(p.image) : null,
			})),
		);
		return enhancedPictures;
	} catch (e) {
		console.error("Erreur de recupération des pictures :", e);
		return null;
	}
}

export { fetchPhotographers, fetchPhotographer, fetchPictures };

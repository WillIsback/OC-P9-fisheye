'use server';
import { getAllPhotographers, getPhotographer } from "@/services/prisma.service";
import { getRatioCorrection } from "@/lib/utils";

async function fetchPhotographers ()
{
    try {
        const listofPhotographers = await getAllPhotographers();
        const enhancedPhotographers = await Promise.all(
            listofPhotographers.map(async p => ({
            ...p,
            RatioCorrection: (await getRatioCorrection(p.portrait))
            }))
        );
        console.log("listofPhotographers : ", enhancedPhotographers)
        return enhancedPhotographers;
    } catch (e) {
        console.error("Erreur de recupération des photographes :", e)
        throw new Error("Erreur de recupération des photographes");
    }

}

async function fetchPhotographer (photographerId : number)
{
    try {
        const photographer = await getPhotographer(photographerId);
        if(photographer){
            const enhancedPhotographer = {
                ...photographer,
                RatioCorrection: (await getRatioCorrection(photographer.portrait))
            }
            console.log("Photographer : ", photographer)
            return enhancedPhotographer;
        } else{
            throw new Error("Photographers is null")
        }
    } catch (e) {
        console.error("Erreur de recupération des photographes :", e)
        throw new Error("Erreur de recupération des photographes");
    }

}



export { fetchPhotographers, fetchPhotographer }
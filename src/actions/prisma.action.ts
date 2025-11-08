'use server';
import { getAllPhotographers } from "@/services/prisma.service";


async function fetchPhotographers ()
{
    try {
        const listofPhotographers = await getAllPhotographers();
        console.log("listofPhotographers : ", listofPhotographers)
        return listofPhotographers;
    } catch (e) {
        console.error("Erreur de recupération des photographes :", e)
        throw new Error("Erreur de recupération des photographes");
    }

}


export { fetchPhotographers }
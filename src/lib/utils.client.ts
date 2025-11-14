import { type Pictures } from "@/types/types";

function handleSortingFilter (sort: string | null, media: Pictures){
    let tempMedia = [...media];
    switch (sort){
        case 'popularite': // Popularité (nombre de like dans Pictures[number].likes)
            return tempMedia.sort((a,b) => (b.likes - a.likes))
        case 'date': // Date (ordoné par date dans Pictures[number].date)
            return tempMedia.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        case 'titre': // Titre (ordoné par titre ordre alphabetique dans Pictures[number].title)
            return tempMedia.sort((a, b) => a.title.localeCompare(b.title))
        default:
            return tempMedia;
    }
}


function getVisibleWidth(img : HTMLImageElement  | null) {
    if(img){
        const containerHeight = img.clientHeight;
        const containerWidth = img.clientWidth;
        const naturalRatio = img.naturalWidth / img.naturalHeight;
        const containerRatio = containerWidth / containerHeight;

        return containerRatio > naturalRatio
            ? containerHeight * naturalRatio
            : containerWidth;
    } else {
        return 0;
    }

}


export { handleSortingFilter, getVisibleWidth }
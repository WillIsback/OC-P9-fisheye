import { type Pictures } from "@/types/types";

function handleSortingFilter (idx: number, media: Pictures){
    let tempMedia = [...media];
    switch (idx){
        case 0: // Popularité (nombre de like dans Pictures[number].likes)
            return tempMedia.sort((a,b) => (b.likes - a.likes))
        case 1: // Date (ordoné par date dans Pictures[number].date)
            return tempMedia.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        case 2: // Titre (ordoné par titre ordre alphabetique dans Pictures[number].title)
            return tempMedia.sort((a, b) => a.title.localeCompare(b.title))
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
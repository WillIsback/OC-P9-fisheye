import path from 'node:path'
import { Pictures, SortCategory} from '@/types/types';
import { VALID_SORTS } from "@/lib/constants";

const { imageSizeFromFile } = require('image-size/fromFile')

type QueryParamValue = string | string[] | undefined;

const rootDir = path.dirname('tsconfig.json');

function getImageFilePath(imageName: string): string {
  return path.join(rootDir, 'public', 'assets', imageName);
}

const getImageRatio = async (imagepath : string) => {
    const rootImagepath = getImageFilePath(imagepath);
    const dimensions = await imageSizeFromFile(rootImagepath);
    const imageRatio = dimensions.width/dimensions.height;
    return imageRatio;
}

async function getRatioCorrection (image : string){
    const imageRatio = await getImageRatio(image);
    if(imageRatio < 1){
        return {zoom: 1.4, x: '0px', y: '15px'} // portrait
    }
    else if(imageRatio > 1){
        return {zoom: 1.7, x: '5px', y: '15px'} // paysage
    }
    else{
        return {zoom: 1.25, x: '20px', y: '0px'}// fullsize
    }
}


type FocusPosition = { focusX: string; focusY: string }
type PhotoCategory = 'animals' | 'architecture' | 'art' | 'event' | 'fashion'  | 'portrait' | 'sport' | 'travel'

const photoCategoriesMap: Record<PhotoCategory, FocusPosition> = {
    'animals': { focusX: '30%', focusY: '30%' },
    'architecture': { focusX: '0%', focusY: '50%' },
    'art': { focusX: '30%', focusY: '30%' },
    'event': { focusX: '30%', focusY: '30%' },
    'fashion': { focusX: '30%', focusY: '10%' },
    'portrait': { focusX: '30%', focusY: '40%' },
    'sport': { focusX: '30%', focusY: '40%' }, // focusY =  - monte + descend
    'travel': { focusX: '30%', focusY: '30%' },
}

function getImagePattern (image: string){
    return image.split('_')[0].toLocaleLowerCase() || null;
}
function isPhotoCategory(str: string): str is PhotoCategory {
    return (str in photoCategoriesMap)
}
function getFocusCorrection (image : string){
    const imagePattern = getImagePattern(image);
    if(imagePattern && isPhotoCategory(imagePattern)){
        return photoCategoriesMap[imagePattern];
    }
    else {
        throw new Error("L'image pattern n'existe pas ou n'est pas reconnu");
    }
}

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
function isSortCategory(value: QueryParamValue): value is SortCategory {
  return typeof value === 'string' && (VALID_SORTS as readonly string[]).includes(value);
}
function isMediaId(mediaId: QueryParamValue){
    return (mediaId != null && mediaId != undefined)
}

function getMediaNavIndex (media : Pictures, mediaId: QueryParamValue){
  const sortedIds = media.map((p) => p.id);
  const currentIndex = sortedIds.indexOf(Number(mediaId));
  const nextIndex = (currentIndex + 1) % sortedIds.length;
  const nextMediaId = sortedIds[nextIndex];
  const prevIndex = (currentIndex - 1 + sortedIds.length) % sortedIds.length;
  const prevMediaId = sortedIds[prevIndex];
  return [nextMediaId, prevMediaId]
}

export { getRatioCorrection, getFocusCorrection, isSortCategory, handleSortingFilter, isMediaId, getMediaNavIndex};

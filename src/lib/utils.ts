import path from 'node:path'
const { imageSizeFromFile } = require('image-size/fromFile')

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

export { getRatioCorrection, getFocusCorrection };

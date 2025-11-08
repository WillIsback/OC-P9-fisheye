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

export { getRatioCorrection };
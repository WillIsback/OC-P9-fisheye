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


export { getVisibleWidth }
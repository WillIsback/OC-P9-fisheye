import { useMemo } from "react";
import Image from "next/image";

export default function MediaDisplay (
  {
    image,
    video,
    title,
    focus,
    width,
    height,
    objectfit,
  } :
  {
    readonly image: string | null,
    readonly video: string | null,
    readonly title: string,
    readonly focus: {focusX: string, focusY: string} | null,
    readonly width : number,
    readonly height: number,
    readonly objectfit: 'contain' | 'cover'
  }
) {

  const media = useMemo(() => {
      if(image){
          return(
              <Image
                  src={`/assets/${image}`}
                  alt={`image ${title}`}
                  style={{
                      objectFit: `${objectfit}`,
                      width: `${width}px`,
                      height: `${height}px`,
                      objectPosition: `${focus?.focusX} ${focus?.focusY}`,
                  }}
                  width={width}
                  height={height}
              />
          )
      } else {
          return (
              <video width="350" height="300" controls preload="none">
                  <source src={`/assets/${video}`} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
      )
      }
    },[image, video]);
    return (
      <>
        {media}
      </>
    )
}
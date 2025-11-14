'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import { getVisibleWidth } from "@/lib/utils.client";
import styles from './MiniaWork.module.css'
import { Spinner } from "@/components/components/ui/spinner";

function MiniMediaDisplay (
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


function BigMediaDisplay (
  {
    image,
    video,
    title,
    width,
    height,
  } :
  {
    readonly image: string | null,
    readonly video: string | null,
    readonly title: string,
    readonly width : number,
    readonly height: number,
  }
) {

  const media = useMemo(() => {
      if(image){
          return(
              <Image
                  src={`/assets/${image}`}
                  alt={`image ${title}`}
                  style={{
                      objectFit: 'contain',
                      maxWidth: `1050px`,
                      maxHeight: `900px`,
                  }}
                  width={width}
                  height={height}
                  onLoad={(e) => handleOnLoad(e.currentTarget)}
                  placeholder="blur"
                  blurDataURL="/logo.svg" 
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
    const [offset, setOffset] = useState(0); 

  function handleOnLoad(imgElement : HTMLImageElement){
    const calculatedWidth = getVisibleWidth(imgElement);
    const maringLeft = (imgElement.clientWidth - calculatedWidth) / 2;
    setOffset(maringLeft);
  }
  return (
    <div className={styles.bigmedia__content}>
      {media}
      <h2 style={{marginLeft: `${offset}px`}}>{title}</h2>
    </div>
  )
}

export { MiniMediaDisplay ,BigMediaDisplay } 
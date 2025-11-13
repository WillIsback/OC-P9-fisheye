import { useMemo } from "react";
import Image from "next/image";

export default function MediaDisplay (
  {
    image,
    video,
    title,
    focus,
  } :
  {
    readonly image: string | null,
    readonly video: string | null,
    readonly title: string,
    readonly focus: {focusX: string, focusY: string} | null,
  }
) {
  const foc = useMemo(() => {
    return (focus?.focusX ? `${focus?.focusX} ${focus?.focusY}` : '50% 50%')
  },[focus]);

  const media = useMemo(() => {
      if(image){
          return(
              <Image
                  src={`/assets/${image}`}
                  alt={`image ${title}`}
                  style={{
                      objectFit: 'cover',
                      width: '350px',
                      height: '300px',
                      objectPosition: foc,
                  }}
                  width={350}
                  height={300}
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
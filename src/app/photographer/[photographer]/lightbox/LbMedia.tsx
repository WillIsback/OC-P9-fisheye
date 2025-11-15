'use client';
import { BigMediaDisplay } from "@/components/Minia/Work/MediaDisplay";
import { Picture,  SortCategory } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useEffect, RefObject } from "react";

export default function LbMedia({
  picture,
  nextMediaId,
  prevMediaId,
  sort,
  dialogRef,
}: {
  readonly picture: Picture | null,
  readonly nextMediaId: number,
  readonly prevMediaId: number,
  readonly sort : SortCategory,
  readonly dialogRef: RefObject<HTMLDialogElement | null>,
}) {
  const router = useRouter();
  const btnNextRef = useRef<React.ComponentRef<'button'>>(null);
  const btnPrevRef = useRef<React.ComponentRef<'button'>>(null);
  const baseUrl = `/photographer/${picture?.photographerId}`;

  useEffect(()=>{
    const ref = dialogRef.current;
    function handleArrowKey(event: KeyboardEvent){
      if(event.key === "ArrowRight") {
        router.replace(`${baseUrl}/?sort=${sort}&mediaId=${nextMediaId}`)
      } else if (event.key === "ArrowLeft"){
        router.replace(`${baseUrl}/?sort=${sort}&mediaId=${prevMediaId}`)
      }
    }
    ref?.addEventListener('keydown', handleArrowKey)
    
    return () => {
      ref?.removeEventListener('keydown', handleArrowKey)
    }
  },[baseUrl, dialogRef, nextMediaId, prevMediaId, router, sort]);

  function handleNext(){
    router.replace(`${baseUrl}/?sort=${sort}&mediaId=${nextMediaId}`)
  }
  function handlePrev(){
    router.replace(`${baseUrl}/?sort=${sort}&mediaId=${prevMediaId}`)
  }

  if(!picture)return<div>Erreur de récupération de l&apos;image</div>

  return (
    <>
        <button type="button" onClick={handlePrev} className="modal__btn_nav" ref={btnPrevRef} >
          <span>
            <Image 
              src='/modal_chevron_left.svg'
              width={42}
              height={42}
              alt='button to navigato to previous media'
            />
          </span>
        </button>
      <BigMediaDisplay
          image={picture.image}
          video={picture.video}
          title={picture.title}
          width={1050}
          height={900}
      />
      <button type="button" onClick={handleNext}  className="modal__btn_nav"  ref={btnNextRef}>
          <span>
            <Image 
              src='/modal_chevron_right.svg'
              width={42}
              height={42}
              alt='button to navigate to next media'
            />
          </span>
        </button>
    </>
  )
}
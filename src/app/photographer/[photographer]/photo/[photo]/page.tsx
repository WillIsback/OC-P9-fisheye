'use client';
import { BigMediaDisplay } from "@/components/Minia/Work/MediaDisplay";
import { type Picture } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { type SortCategory } from "@/types/types";

export default function PhotoPage({
  picture,
  nextPhotoId,
  prevPhotoId,
  sort,
}: {
  readonly picture: Picture,
  readonly nextPhotoId: number,
  readonly prevPhotoId: number,
  readonly sort : SortCategory,
}) {

  if(!picture)return <div>Loading ...</div>

  const baseUrl = `/photographer/${picture?.photographerId}/photo`;

  return (
    <>
        <Link href={`${baseUrl}/${prevPhotoId}?sort=${sort}`} className="modal__btn_nav" replace>
          <span>
            <Image 
              src='/modal_chevron_left.svg'
              width={42}
              height={42}
              alt='button to close modal'
            />
          </span>
        </Link>
      <BigMediaDisplay
          image={picture.image}
          video={picture.video}
          title={picture.title}
          width={1050}
          height={900}
      />
      <Link href={`${baseUrl}/${nextPhotoId}?sort=${sort}`} className="modal__btn_nav" replace>
          <span>
            <Image 
              src='/modal_chevron_right.svg'
              width={42}
              height={42}
              alt='button to close modal'
            />
          </span>
        </Link>
    </>
  )
}
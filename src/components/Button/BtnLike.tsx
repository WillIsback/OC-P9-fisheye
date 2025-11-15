'use client'
 
import { incrementLike } from "@/actions/cookies.action"
import { useState } from 'react'
import Image from "next/image"
import styles from './btn.module.css'

export default function BtnLike(
{
    initialLikes, 
    title,
    mediaId,
}: { 
    readonly initialLikes: number, 
    readonly title: string,
    readonly mediaId: number,
}) {
  const [likes, setLikes] = useState(initialLikes)
 
  return (
      <button
        type="button"
        className={styles.btnlike}
        aria-labelledby="bouton pour ajouter un like a l'oeuvre"
        onClick={async () => {
          const updatedLikes = await incrementLike(`${mediaId}`, initialLikes)
          setLikes(updatedLikes)
        }}
      >
        <span className={styles.btnlike__span}>
          {likes}
            <Image
                src='/like_icon.svg'
                alt={`compteur de like pour l'image ${title}`}
                width={17.5}
                height={18.35}
                style={{
                    width: '21px',
                    height: '24px',
                    objectFit: 'fill',
                }}
            />
        </span>
      </button>
  )
}
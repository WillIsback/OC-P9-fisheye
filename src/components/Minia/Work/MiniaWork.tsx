'use client';
import { type Picture } from "@/types/types";
import styles from './MiniaWork.module.css';
import { MiniMediaDisplay } from "./MediaDisplay";
import Link from "next/link";
import { useSearchParams, usePathname } from 'next/navigation';
import BtnLike from "@/components/Button/BtnLike";
export default function MiniaWork(    
{
    picture
}:
{
    readonly picture: Picture
}){
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const sort = searchParams.get('sort')
    const url = `${pathName}/?sort=${sort}&mediaId=${picture.id}`
    const { title, image, video, likes, Focus } = picture;
    return(
        <article className={styles.miniawork__article} aria-labelledby={`Carte et miniature de l'image ${title}`}>
            <div className={styles.miniawork__article_media}>
                <Link href={url}>
                    <MiniMediaDisplay
                        image={image}
                        video={video}
                        title={title}
                        focus={Focus}
                        width={350}
                        height={300}
                        objectfit="cover"
                    />
                </Link>
            </div>
            <div className={styles.miniawork__article_content}>
                <h3 className={styles.miniawork__article_title}>{title}</h3>
                <BtnLike 
                    initialLikes={likes}
                    title={title}
                    mediaId={picture.id}
                />
            </div>
        </article>
    )
}
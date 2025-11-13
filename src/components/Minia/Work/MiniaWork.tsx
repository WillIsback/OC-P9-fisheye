import { type Picture } from "@/types/types";
import styles from './MiniaWork.module.css';
import Image from "next/image";
import MediaDisplay from "./MediaDisplay";

export default function MiniaWork(    {
        picture
    }:
    {
        readonly picture: Picture
    }){


    const { title, image, video, likes, Focus } = picture;
    return(
        <article className={styles.miniawork__article} aria-details='Carte et miniature des photographes du site'>
            <div className={styles.miniawork__article_media}>
                <MediaDisplay image={image} video={video} title={title} focus={Focus} />
            </div>
            <div className={styles.miniawork__article_content}>
                <h3 className={styles.miniawork__article_title}>{title}</h3>
                <span className={styles.miniawork__article_span}>{likes}
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
            </div>
        </article>
    )
}
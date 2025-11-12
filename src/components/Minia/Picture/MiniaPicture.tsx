import { type Picture } from "@/types/types";
import styles from './MiniaPicture.module.css';
import Image from "next/image";
import { Container } from "lucide-react";

export default function MiniaPicture(    {
        picture
    }:
    {
        readonly picture: Picture
    }){


    const { photographerId, title, image, video, likes, date, price, RatioCorrection } = picture;
    if (!RatioCorrection) return <div>Loading...</div>

    return(
        <article className={styles.miniapicture__article} aria-details='Carte et miniature des photographes du site'>
            <div className={styles.miniapicture__article_img}>
                {/* <Link href={`/photographer/${id}`} aria-label={`Voir la page du photographe ${name}`}> */}
                <Image
                    src={`/assets/${image}`}
                    alt={`image ${title}`}
                    sizes="100vw"
                    style={{
                        width: '350px',
                        height: '300px',
                        objectFit: 'fill',
                    }}
                    width={350}
                    height={300}
                />
                {/* </Link> */}
            </div>
            <h3 className={styles.miniapicture__article_title}>{title}</h3>
            <span className={styles.miniapicture__article_span}>{likes} 
                <Image
                    src='/like_icon.svg'
                    alt={`compteur de like pour l'image ${title}`}
                    width={17.5}
                    height={18.35}
                />
            </span>
        </article>
    )
}
import styles from './MiniaPhotographer.module.css'
import { type EnhancedPhotographer } from '@/types/types'
import Image from 'next/image';

export default function MiniaPhotographer(
    {
        photographer
    }:
    {
        readonly photographer: EnhancedPhotographer
    }){
    
    const { city, country, name, portrait, price, tagline, RatioCorrection } = photographer;
    const {zoom, x, y} = RatioCorrection;

    
    return (
        <article className={styles.miniaphotographer__article} aria-details='Carte et miniature des photographes du site'>
            <div className={styles.miniaphotographer__article_img}>
                <Image
                    src={`/assets/${portrait}`}
                    alt={`image portrait du photographe ${name}`}
                    fill
                    sizes="(width: 200px), 100vw"
                    loading='eager'
                    style={{ 
                        transform: `scale(${zoom}) 
                                    translate(${x},${y})`, 
                    }}
                />
            </div>
            <h2 className={styles.miniaphotographer__article_title}>{name}</h2>
            <h3 className={styles.miniaphotographer__article_subtitle}>{city}, {country}</h3>
            <p className={styles.miniaphotographer__article_p}>{tagline}</p>
            <span className={styles.miniaphotographer__article_span}>{price}€/jour</span>
        </article>
    )
}
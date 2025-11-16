'use client';
import { EnhancedPhotographer } from '@/types/types';
import styles from './BannerPhotographer.module.css'
import BtnContact from '@/components/Button/BtnContact';
import Image from 'next/image';


export default function BannerPhotographer({ photographer }:{ readonly photographer : EnhancedPhotographer}){
    const { city, country, name, portrait, tagline, RatioCorrection } = photographer;

    return (
        <article className={styles.bannerphotographer__article}>
            <div className={styles.bannerphotographer__article_content}>
                <h2 className={styles.bannerphotographer__article_title}>{name}</h2>
                <h3 className={styles.bannerphotographer__article_subtitle}>{city}, {country}</h3>
                <p className={styles.bannerphotographer__article_p}>{tagline}</p>
            </div>
            <BtnContact name={name} />
            <div className={styles.bannerphotographer__article_img}>
                <Image
                    src={`/assets/${portrait}`}
                    alt={`image portrait du photographe ${name}`}
                    fill
                    sizes="(width: 200px), 100vw"
                    loading='eager'
                    style={{
                        transform: `scale(${RatioCorrection.zoom})
                                    translate(${RatioCorrection.x},${RatioCorrection.y})`,
                    }}
                />
            </div>

        </article>
    )
}
"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { EnhancedPhotographer } from "@/types/types";
import styles from "./MiniaPhotographer.module.css";

export default function MiniaPhotographer({
	photographer,
}: {
	readonly photographer: EnhancedPhotographer;
}) {
	const { city, country, name, portrait, price, tagline, RatioCorrection, id } =
		photographer;
	const { zoom, x, y , dimensions} = RatioCorrection;
	const t = useTranslations('Photographer');

	return (
		<article
			className={styles.miniaphotographer__article}
			aria-label={t('cardAriaLabel')}
		>
            <Link
                href={`/photographer/${id}?sort=popularite`}
                aria-label={t('viewPageAriaLabel', { name })}
                className={styles.miniaphotographer__article_img}
            >
                <Image
                    src={`/assets/${portrait}`}
                    alt={t('portraitAlt', { name })}
										width={dimensions.width}
										height={dimensions.height}
										sizes="100vw"
                    style={{
                        transform: `scale(${zoom})
                                translate(${x} , ${y})`,
												width: '100%',
												height: 'auto'
                    }}
										preload
                />
            </Link>
			<h2 className={styles.miniaphotographer__article_title}>{name}</h2>
			<h3 className={styles.miniaphotographer__article_subtitle}>
				{city}, {country}
			</h3>
			<p className={styles.miniaphotographer__article_p}>{tagline}</p>
			<span className={styles.miniaphotographer__article_span}>
				{t('pricePerDay', { price })}
			</span>
		</article>
	);
}

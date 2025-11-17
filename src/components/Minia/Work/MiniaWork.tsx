"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import BtnLike from "@/components/Button/BtnLike";
import type { Picture } from "@/types/types";
import { MiniMediaDisplay } from "./MediaDisplay";
import styles from "./MiniaWork.module.css";
export default function MiniaWork({ picture }: { readonly picture: Picture }) {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const sort = searchParams.get("sort");
	const url = `${pathName}/?sort=${sort}&mediaId=${picture.id}`;
	const { title, image, video, likes, Focus } = picture;
	const t = useTranslations('Media');

	return (
		<article
			className={styles.miniawork__article}
			aria-label={t('cardAriaLabel', { title })}
		>
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
				<BtnLike initialLikes={likes} title={title} mediaId={picture.id} />
			</div>
		</article>
	);
}

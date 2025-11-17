"use client";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { incrementLike } from "@/actions/cookies.action";
import styles from "./btn.module.css";

export default function BtnLike({
	initialLikes,
	title,
	mediaId,
}: {
	readonly initialLikes: number;
	readonly title: string;
	readonly mediaId: number;
}) {
	const [likes, setLikes] = useState(initialLikes);
	const t = useTranslations('Media');

	return (
		<button
			type="button"
			className={styles.btnlike}
			aria-label={t('likeButtonAriaLabel')}
			onClick={async () => {
				const updatedLikes = await incrementLike(`${mediaId}`, initialLikes);
				setLikes(updatedLikes);
			}}
		>
			<span className={styles.btnlike__span}>
				{likes}
				<Image
					src="/like_icon.svg"
					alt={t('likeCounterAlt', { title })}
					width={17.5}
					height={18.35}
					style={{
						width: "21px",
						height: "24px",
						objectFit: "fill",
					}}
				/>
			</span>
		</button>
	);
}

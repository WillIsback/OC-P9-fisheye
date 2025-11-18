"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { incrementLike } from "@/actions/cookies.action";
import like_icon from "@/public/like_icon.svg";
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
	const t = useTranslations("Media");

	return (
		<button
			type="button"
			className={styles.btnlike}
			aria-label={t("likeButtonAriaLabel")}
			onClick={async () => {
				const updatedLikes = await incrementLike(`${mediaId}`, initialLikes);
				setLikes(updatedLikes);
			}}
		>
			<span className={styles.btnlike__span}>
				{likes}
				<Image
					src={like_icon}
					alt={t("likeCounterAlt", { title })}
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

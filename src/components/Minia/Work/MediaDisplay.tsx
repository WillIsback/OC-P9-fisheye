"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useIsMounted } from "@/hooks/useIsMounted";
import { getVisibleWidth } from "@/lib/utils.client";
import styles from "./MiniaWork.module.css";

function MiniMediaDisplay({
	image,
	video,
	title,
	focus,
	width,
	height,
	objectfit,
}: {
	readonly image: string | null;
	readonly video: string | null;
	readonly title: string;
	readonly focus: { focusX: string; focusY: string } | null;
	readonly width: number;
	readonly height: number;
	readonly objectfit: "contain" | "cover";
}) {
	const t = useTranslations('Media');

	const media = useMemo(() => {
		if (image) {
			return (
				<Image
					src={`/assets/${image}`}
					alt={t('imageAlt', { title })}
					style={{
						objectFit: `${objectfit}`,
						width: `${width}px`,
						height: `${height}px`,
						objectPosition: `${focus?.focusX} ${focus?.focusY}`,
					}}
					width={width}
					height={height}
				/>
			);
		} else {
			return (
				<video width="350" height="300" controls preload="none">
					<source src={`/assets/${video}`} type="video/mp4" />
					<track kind="captions" />
					{t('videoNotSupported')}
				</video>
			);
		}
	}, [image, video, width, height, title, objectfit, focus, t]);
	return <>{media}</>;
}

function BigMediaDisplay({
	image,
	video,
	title,
	width,
	height,
}: {
	readonly image: string | null;
	readonly video: string | null;
	readonly title: string;
	readonly width: number;
	readonly height: number;
}) {
	const [offset, setOffset] = useState(0);
	const isMounted = useIsMounted();
	const t = useTranslations('Media');

	const handleOnLoad = useCallback(
		(imgElement: HTMLImageElement) => {
      if(isMounted){
        const calculatedWidth = getVisibleWidth(imgElement);
        const maringLeft = (imgElement.clientWidth - calculatedWidth) / 2;
        setOffset(maringLeft);
      }
		},
		[isMounted],
	);

	const media = useMemo(() => {
		if (image) {
			return (
				<Image
					src={`/assets/${image}`}
					alt={t('imageAlt', { title })}
					style={{
						objectFit: "contain",
						maxHeight: `85vh`,
						height: "auto",
						width: "auto",
					}}
					width={width}
					height={height}
					onLoad={(e) => handleOnLoad(e.currentTarget)}
					placeholder="blur"
					blurDataURL="/logo.svg"
				/>
			);
		} else {
			return (
				<video
					width={width}
					height={height}
					controls
					preload="none"
					style={{ maxHeight: `85vh` }}
				>
					<source src={`/assets/${video}`} type="video/mp4" />
					<track kind="captions" />
					{t('videoNotSupported')}
				</video>
			);
		}
	}, [image, video, width, height, title, handleOnLoad, t]);

	return (
		<div className={styles.bigmedia__content}>
			{media}
			<h2 style={{ marginLeft: `${offset}px` }}>{title}</h2>
		</div>
	);
}

export { MiniMediaDisplay, BigMediaDisplay };

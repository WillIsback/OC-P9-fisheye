"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { type RefObject, useEffect, useRef } from "react";
import { BigMediaDisplay } from "@/components/Minia/Work/MediaDisplay";
import type { Picture, SortCategory } from "@/types/types";

export default function LbMedia({
	picture,
	nextMediaId,
	prevMediaId,
	sort,
	dialogRef,
}: {
	readonly picture: Picture | null;
	readonly nextMediaId: number;
	readonly prevMediaId: number;
	readonly sort: SortCategory;
	readonly dialogRef: RefObject<HTMLDialogElement | null>;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const mediaId = searchParams.get('mediaId');
	const btnNextRef = useRef<React.ComponentRef<"button">>(null);
	const btnPrevRef = useRef<React.ComponentRef<"button">>(null);
	const baseUrl = `/photographer/${picture?.photographerId}`;
	const t = useTranslations("Media");


	useEffect(() => {
		if(mediaId){
		dialogRef.current?.focus();
	}
	}, [dialogRef, mediaId]);

	useEffect(() => {
		const ref = dialogRef.current;
		function handleArrowKey(event: KeyboardEvent) {
			if (event.key === "ArrowRight") {
				event.preventDefault();
				router.replace(`${baseUrl}/?sort=${sort}&mediaId=${nextMediaId}`);
			} else if (event.key === "ArrowLeft") {
				event.preventDefault();
				router.replace(`${baseUrl}/?sort=${sort}&mediaId=${prevMediaId}`);
			}
		}
		ref?.addEventListener("keydown", handleArrowKey);

		return () => {
			ref?.removeEventListener("keydown", handleArrowKey);
		};
	}, [baseUrl, dialogRef, nextMediaId, prevMediaId, router, sort]);

	function handleNext() {
		router.replace(`${baseUrl}/?sort=${sort}&mediaId=${nextMediaId}`);
	}
	function handlePrev() {
		router.replace(`${baseUrl}/?sort=${sort}&mediaId=${prevMediaId}`);
	}

	if (!picture) return <div>{t("loadError")}</div>;

	return (
		<>
			<output aria-live='polite' aria-atomic="true" className="sr-only" tabIndex={-1}>
				{t('currentMedia', { title: picture.title })}
			</output>
			<button
				type="button"
				onClick={handlePrev}
				className="modal__btn_nav"
				ref={btnPrevRef}
			>
				<span>
					<Image
						src="/modal_chevron_left.svg"
						width={48}
						height={30}
						style={{ height: "auto", width: "auto" }}
						alt={t("previousMediaAlt")}
					/>
				</span>
			</button>
			<BigMediaDisplay
				image={picture.image}
				video={picture.video}
				title={picture.title}
				width={1050}
				height={900}
			/>
			<button
				type="button"
				onClick={handleNext}
				className="modal__btn_nav"
				ref={btnNextRef}
			>
				<span>
					<Image
						src="/modal_chevron_right.svg"
						width={48}
						height={30}
						style={{ height: "auto", width: "auto" }}
						alt={t("nextMediaAlt")}
					/>
				</span>
			</button>
		</>
	);
}

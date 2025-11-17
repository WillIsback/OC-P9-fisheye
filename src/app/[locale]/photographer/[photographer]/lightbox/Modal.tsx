"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/hooks/useIsMounted";
import type { Picture, SortCategory } from "@/types/types";
import LbMedia from "./LbMedia";

export default function Modal({
	picture,
	nextMediaId,
	prevMediaId,
	sort,
}: {
	readonly picture: Picture | null;
	readonly nextMediaId: number;
	readonly prevMediaId: number;
	readonly sort: SortCategory;
}) {
	const router = useRouter();
	const dialogRef = useRef<React.ComponentRef<"dialog">>(null);
	const isMounted = useIsMounted();
	const t = useTranslations("Media");

	useEffect(() => {
		if (isMounted) {
			dialogRef.current?.showModal();
		}
	}, [isMounted]);

	if (!isMounted) return null;

	function onDismiss() {
		router.back();
	}

	const modalRoot = document.getElementById("modal-root");

	if (!modalRoot) {
		console.error("Modal root element not found");
		return null;
	}

	return createPortal(
		<div className="modal-backdrop">
			<dialog ref={dialogRef} className="modal" onClose={onDismiss} tabIndex={-1}>
				<button type="button" onClick={onDismiss} className="close-button">
					<Image
						src="/close_ic.svg"
						width={42}
						height={42}
						alt={t("closeModalAlt")}
					/>
				</button>
				<LbMedia
					picture={picture}
					nextMediaId={nextMediaId}
					prevMediaId={prevMediaId}
					sort={sort}
					dialogRef={dialogRef}
				/>
			</dialog>
		</div>,
		modalRoot,
	);
}

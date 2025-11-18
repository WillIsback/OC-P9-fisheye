"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ReactNode, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import close_form from "@/public/close_form.svg"

export default function LbContactForm({
	isOpen,
	setIsOpen,
	children,
}: {
	readonly isOpen: boolean;
	readonly setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	readonly children: ReactNode;
}) {
	const lightBoxRef = useRef<HTMLDivElement>(null);
	const t = useTranslations("Contact");

	const onClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	// Gestion de la touche Escape
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	// gestion du focus trap
	useEffect(() => {
		const boxRef = lightBoxRef.current;
		if (isOpen && boxRef) {
			boxRef?.focus();
			const focusableElements =
				'button, input, textarea, [tabindex]:not([tabindex="-1"])';
			const focusableArray = Array.from(
				boxRef.querySelectorAll<HTMLElement>(focusableElements),
			);
			const firstFocusableElement = focusableArray[0];
			const lastFocusableElement = focusableArray[focusableArray.length - 1];
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === "Tab") {
					if (e.shiftKey) {
						// Shift + Tab
						if (document.activeElement === firstFocusableElement) {
							e.preventDefault();
							lastFocusableElement.focus();
						}
					} else if (document.activeElement === lastFocusableElement) {
						// Tab
						e.preventDefault();
						firstFocusableElement.focus();
					}
				}
			};
			boxRef.addEventListener("keydown", handleKeyDown);
			// Focus the first element inside when the trap is active
			firstFocusableElement?.focus();
			return () => {
				boxRef?.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className="lbcontact" ref={lightBoxRef}>
			<button
				type="button"
				className="lbcontact__overlay"
				onClick={onClose}
				aria-label={t("closeBackgroundAriaLabel")}
			/>
			<dialog
				className="lbcontact__content"
				aria-modal="true"
				aria-labelledby="dialog-title"
			>
				<button
					type="button"
					className="lbcontact__close"
					onClick={onClose}
					aria-label={t("closeFormAriaLabel")}
				>
					<Image src={close_form} alt="" />
				</button>
				{children}
			</dialog>
		</div>,
		document.body,
	);
}

"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Dispatch, SetStateAction } from "react";
import styles from "./btn.module.css";

export default function BtnDropDown({
	setDeploy,
	isDeploy,
}: {
	readonly setDeploy: Dispatch<SetStateAction<boolean>>;
	readonly isDeploy: boolean;
}) {
	const t = useTranslations("Filter");

	return (
		<button
			type="button"
			onClick={() => setDeploy(!isDeploy)}
			className={styles.btndropdown}
			aria-expanded={isDeploy}
			aria-haspopup="true"
			aria-controls="dropdown-list"
			aria-label={t("dropdownButtonLabel")}
		>
			<span>
				<Image
					src={
						isDeploy ? "/dropdown_chevron_up.svg" : "/dropdown_chevron_down.svg"
					}
					width={16}
					height={10}
					alt=""
					aria-hidden="true"
				/>
			</span>
		</button>
	);
}

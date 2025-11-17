"use client";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import styles from "./btn.module.css";

export default function BtnDropDown({
	setDeploy,
	isDeploy,
}: {
	readonly setDeploy: Dispatch<SetStateAction<boolean>>;
	readonly isDeploy: boolean;
}) {
	const t = useTranslations('Filter');

	return (
		<button
			type="button"
			onClick={() => setDeploy(!isDeploy)}
			className={styles.btndropdown}
		>
			<span>
				<Image
					src={
						isDeploy ? "/dropdown_chevron_up.svg" : "/dropdown_chevron_down.svg"
					}
					width={16}
					height={10}
					alt={t('dropdownIconAlt')}
				/>
			</span>
		</button>
	);
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import BtnDropDown from "../Button/BtnDropDown";
import styles from "./DropDownFilter.module.css";

export default function DropDownFilter() {
	const [isDeploy, setIsDeploy] = useState(false);
	const pathname = usePathname();
	const t = useTranslations('Filter');

	return (
		<section className={styles.dropdownfilter__section}>
			<h2>{t('sortBy')} </h2>
			<ul className={styles.dropdownlist}>
				<li className={styles.dropdownlist__default}>
					<Link href={`${pathname}?sort=popularite`}>
						<span>{t('popularity')}</span>
					</Link>
					<BtnDropDown setDeploy={setIsDeploy} isDeploy={isDeploy} />
				</li>
				<li
					className={
						isDeploy
							? styles.dropdownlist__displayed
							: styles.dropdownlist__hidden
					}
				>
					<Link href={`${pathname}?sort=date`}>
						<span>{t('date')}</span>
					</Link>
				</li>
				<li
					className={
						isDeploy
							? styles.dropdownlist__displayed
							: styles.dropdownlist__hidden
					}
				>
					<Link href={`${pathname}?sort=titre`}>
						<span>{t('title')}</span>
					</Link>
				</li>
			</ul>
		</section>
	);
}

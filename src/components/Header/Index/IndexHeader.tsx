"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import logo from "../../../../public/logo.svg";
import styles from "./IndexHeader.module.css";
import LangSelector from "./LangSelector";

export default function IndexHeader() {
	const pathname = usePathname();
	const currentLocale = useLocale();
	const t = useTranslations("Navigation");
	const tHome = useTranslations("HomePage");

	return (
		<header className={styles.index__header}>
			<Link
				href="/"
				className={styles.index__header_logo}
				aria-label={t("logoAriaLabel")}
			>
				<Image src={logo} alt={t("logoAlt")} preload />
			</Link>
			<nav>
				{/* <LangSelector /> */}
			</nav>
			{pathname === `/${currentLocale}` && pathname != null && (
				<h1
					className={styles.index__header_title}
					aria-label={t("titleAriaLabel")}
				>
					{tHome("title")}
				</h1>
			)}
		</header>
	);
}

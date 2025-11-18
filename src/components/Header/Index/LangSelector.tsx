"use client";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "src/i18n/navigation";
import styles from "./LangSelector.module.css";

export default function LangSelector() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const currentLocale = useLocale();
	const [isPending, startTransition] = useTransition();
	const t = useTranslations("Selector");

	const handleLocaleChange = (newLocale: string) => {
		if (newLocale !== currentLocale) {
			startTransition(() => {
				if (params.photographer) {
					router.replace(`${pathname}?sort=popularite`, { locale: newLocale });
				} else {
					router.replace(pathname, { locale: newLocale });
				}
			});
		}
	};

	return (
		<div className={styles.langselector}>
			<Select.Root
				value={currentLocale}
				onValueChange={handleLocaleChange}
				disabled={isPending}
			>
				<Select.Trigger
					className={styles.langselector__trigger}
					aria-label={t("ariaLabel")}
				>
					<span className={styles.langselector__label}>{t("label")} :</span>
					<Select.Value />
					<Select.Icon>
						<ChevronDownIcon />
					</Select.Icon>
				</Select.Trigger>

				<Select.Portal>
					<Select.Content
						className={styles.langselector__content}
						position="popper"
						sideOffset={5}
					>
						<Select.Viewport className={styles.langselector__viewport}>
							<Select.Item value="en" className={styles.langselector__item}>
								<Select.ItemText>
									<span className={styles.langselector__option}>
										<span className={styles.langselector__flag}>🇬🇧</span>
										<span className={styles.langselector__text}>English</span>
									</span>
								</Select.ItemText>
							</Select.Item>
							<Select.Item value="fr" className={styles.langselector__item}>
								<Select.ItemText>
									<span className={styles.langselector__option}>
										<span className={styles.langselector__flag}>🇫🇷</span>
										<span className={styles.langselector__text}>Français</span>
									</span>
								</Select.ItemText>
							</Select.Item>
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		</div>
	);
}

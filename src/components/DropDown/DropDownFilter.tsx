"use client";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "./DropDownFilter.module.css";

export default function DropDownFilter() {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentSort = searchParams.get("sort") || "popularite";
	const t = useTranslations("Filter");

	const handleSortChange = (newSort: string) => {
		router.push(`${pathname}?sort=${newSort}`);
	};

	// Mapping des valeurs pour l'affichage
	const sortLabels: Record<string, string> = {
		popularite: t("popularity"),
		date: t("date"),
		titre: t("title"),
	};

	return (
		<section
			className={styles.dropdownfilter__section}
			aria-labelledby="sort-heading"
		>
			<h2 id="sort-heading">{t("sortBy")}</h2>
			<Select.Root value={currentSort} onValueChange={handleSortChange}>
				<Select.Trigger
					className={styles.dropdownfilter__trigger}
					aria-label={t("dropdownButtonLabel")}
				>
					<Select.Value>
						{sortLabels[currentSort] || t("popularity")}
					</Select.Value>
					<Select.Icon>
						<ChevronDownIcon />
					</Select.Icon>
				</Select.Trigger>

				<Select.Portal container={document.body}>
					<Select.Content
						className={styles.dropdownfilter__content}
						position="popper"
						sideOffset={5}
					>
						<Select.Viewport className={styles.dropdownfilter__viewport}>
							<Select.Separator className={styles.dropdownfilter__separator} />
							<Select.Item
								value="popularite"
								className={styles.dropdownfilter__item}
							>
								<Select.ItemText>{t("popularity")}</Select.ItemText>
							</Select.Item>
							<Select.Separator className={styles.dropdownfilter__separator} />
							<Select.Item value="date" className={styles.dropdownfilter__item}>
								<Select.ItemText>{t("date")}</Select.ItemText>
							</Select.Item>
							<Select.Separator className={styles.dropdownfilter__separator} />
							<Select.Item
								value="titre"
								className={styles.dropdownfilter__item}
							>
								<Select.ItemText>{t("title")}</Select.ItemText>
							</Select.Item>
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
			<div className="sr-only" aria-live="polite" aria-atomic="true">
				{t("navigationHelp")}
			</div>
		</section>
	);
}

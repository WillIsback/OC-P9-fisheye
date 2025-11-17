"use client";
import { usePathname, useRouter } from "i18n/navigation";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";

export default function LangSelector() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const currentLocale = useLocale();
	const [selectedValue, setSelectedValue] = useState(currentLocale);
	const [isPending, startTransition] = useTransition();
	const t = useTranslations("Selector");

	useEffect(() => {
		console.log("LangSelector params : ", params);
		if (selectedValue !== currentLocale) {
			startTransition(() => {
				if(params.photographer){
					router.replace(`${pathname}?sort=popularite`, { locale: selectedValue });
				}else{
					router.replace(pathname, { locale: selectedValue });
				}

			});
		}
	}, [selectedValue, currentLocale, router, pathname, params]);

	return (
		<label>
			{t("label")} :
			<select
				name="lang"
				id="lang"
				aria-label={t("ariaLabel")}
				value={selectedValue}
				onChange={(e) => setSelectedValue(e.target.value)}
				disabled={isPending}
			>
				<option value="en">🇬🇧</option>
				<option value="fr">🇫🇷</option>
			</select>
		</label>
	);
}

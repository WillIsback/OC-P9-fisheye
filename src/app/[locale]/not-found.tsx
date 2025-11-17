import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('Errors');

	return {
		title: t('notFoundTitle'),
		description: t('notFoundDescription'),
	};
}

export default async function NotFound() {
	const t = await getTranslations('Errors');

	return (
		<div className="nf">
			<h2 className="nf__h2">{t('notFoundHeading')}</h2>
			<p className="nf__p">{t('notFoundMessage')}</p>
			<Link href="/" className="btn--primary">
				{t('returnHome')}
			</Link>
		</div>
	);
}

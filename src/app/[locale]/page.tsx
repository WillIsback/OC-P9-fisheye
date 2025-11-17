import { notFound } from "next/navigation";
import {getTranslations} from 'next-intl/server';
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { fetchPhotographers } from "@/actions/prisma.action";

import GridPhotographer from "@/components/Grid/GridPhotographer/GridPhotographer";
import Loading from "@/components/Loading/Loading";
import styles from "./page.module.css";

export default async function Home() {
	const photographers = await fetchPhotographers();
	if (!photographers) {
		notFound();
	}
	const fallback = await getTranslations('fallback');
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<ErrorBoundary fallback={<div>{fallback('message')}</div>}>
					<Suspense fallback={<Loading />}>
						<GridPhotographer enhancedPhotographers={photographers} />
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	);
}

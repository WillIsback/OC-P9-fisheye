import styles from './page.module.css';
import { fetchPhotographers } from '@/actions/prisma.action';
import { Suspense } from 'react';
import Loading from '@/components/Loading/Loading';
import GridPhotographer from '@/components/Grid/GridPhotographer/GridPhotographer';
import { ErrorBoundary } from "react-error-boundary";
import { getRatioCorrection } from '@/lib/utils';

export default async function Home() {
  const photographers = await fetchPhotographers();

  const enhancedPhotographers = await Promise.all(
    photographers.map(async p => ({
      ...p,
      RatioCorrection: (await getRatioCorrection(p.portrait))
    }))
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Suspense fallback={<Loading />}>
          <GridPhotographer enhancedPhotographers={enhancedPhotographers}  />
        </Suspense>
      </ErrorBoundary>
      </main>
    </div>
  );
}

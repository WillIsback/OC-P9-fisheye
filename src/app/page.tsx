import styles from './page.module.css';
import { fetchPhotographers } from '@/actions/prisma.action';
import { Suspense } from 'react';
import Loading from '@/components/Loading/Loading';
import GridPhotographer from '@/components/Grid/GridPhotographer/GridPhotographer';
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
  const photographers = await fetchPhotographers();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Suspense fallback={<Loading />}>
          <GridPhotographer enhancedPhotographers={photographers}  />
        </Suspense>
      </ErrorBoundary>
      </main>
    </div>
  );
}

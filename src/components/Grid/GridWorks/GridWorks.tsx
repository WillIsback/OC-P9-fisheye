'use client';
import styles from './GridWorks.module.css'
import { type Pictures } from '@/types/types'
import MiniaWork from '@/components/Minia/Work/MiniaWork'
import { handleSortingFilter } from '@/lib/utils.client';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

export default function GridWorks ({
    pictures,
  }:  {
    readonly pictures: Pictures,
  }){
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const sort = searchParams.get('sort');

    console.log("searchParams : ", sort)

    const sortedPicture = handleSortingFilter(sort, pictures);
    if (sortedPicture === undefined)return <div>Loading ...</div>

  return (
    <section className={styles.gridworks__section}>
      {sortedPicture.map((picture) => (
        <Link key={picture.id} href={`${pathName}/photo/${picture.id}?sort=${sort}`}>
          <MiniaWork
            key={picture.id}
            picture={picture}
          />
        </Link>
      ))}
    </section>
  );
}
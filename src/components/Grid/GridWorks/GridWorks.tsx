'use client';
import styles from './GridWorks.module.css'
import { Pictures } from '@/types/types'
import MiniaWork from '@/components/Minia/Work/MiniaWork'
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';


export default function GridWorks ({
    pictures,
  }:  {
    readonly pictures: Pictures,
  }){
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const sort = searchParams.get('sort')
  return (
    <section className={styles.gridworks__section}>
      {pictures.map((picture) => (
        <Link key={picture.id} href={`${pathName}/?sort=${sort}&mediaId=${picture.id}`}>
          <MiniaWork
            key={picture.id}
            picture={picture}
          />
        </Link>
      ))}
    </section>
  );
}
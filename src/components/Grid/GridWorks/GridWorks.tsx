'use client';
import styles from './GridWorks.module.css'
import { type Pictures } from '@/types/types'
import MiniaWork from '@/components/Minia/Work/MiniaWork'
import { useContext } from 'react';
import { FilterContext } from '@/context/FilterProvider';
import { handleSortingFilter } from '@/lib/utils.client';

export default function GridWorks ({
    pictures,
  }:  {
    readonly pictures: Pictures,
  }){
    const [activeFilter, _setActiveFilter] = useContext(FilterContext);
    console.log("pictures : ", pictures)

    const sortedPicture = handleSortingFilter(activeFilter, pictures);
    if (sortedPicture === undefined)return <div>Loading ...</div>

  return (
    <section className={styles.gridworks__section}>
      {sortedPicture.map((picture) => (
        <MiniaWork
          key={picture.id}
          picture={picture}
        />
      ))}
    </section>
  );
}
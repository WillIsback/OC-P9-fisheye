'use client';
import styles from './GridWorks.module.css'
import { type Pictures } from '@/types/types'
import MiniaWork from '@/components/Minia/Work/MiniaWork'

export default function GridWorks ({
    pictures,
  }:  {
    readonly pictures: Pictures,
  }){
  return (
    <section className={styles.gridworks__section}>
      {pictures.map((picture) => (
        <MiniaWork
          key={picture.id}
          picture={picture}
        />
      ))}
    </section>
  );
}
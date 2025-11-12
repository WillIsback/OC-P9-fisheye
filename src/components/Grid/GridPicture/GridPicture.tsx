'use client';
import styles from './GridPicture.module.css'
import { type Pictures } from '@/types/types'
import MiniaPicture from '@/components/Minia/Picture/MiniaPicture'

export default function GridPicture ({
    pictures,
  }:  {
    readonly pictures: Pictures,
  }){
  return (
    <section className={styles.gridpicture__section}>
      {pictures.map((picture) => (
        <MiniaPicture
          key={picture.id} 
          picture={picture} 
        />
      ))}
    </section>
  );
}
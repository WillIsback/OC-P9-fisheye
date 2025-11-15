'use client';
import styles from './DropDownFilter.module.css'
import { useState } from 'react';
import BtnDropDown from '../Button/BtnDropDown';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DropDownFilter () {
    const [isDeploy, setIsDeploy] = useState(false);
    const pathname = usePathname()


    return (
        <section className={styles.dropdownfilter__section}>
            <h2>Trié par </h2>
            <ul className={styles.dropdownlist}>
                <li className={styles.dropdownlist__default}>
                    <Link href={`${pathname}?sort=popularite`}>
                        <span>Popularité</span>
                    </Link>
                    <BtnDropDown setDeploy={setIsDeploy} isDeploy={isDeploy}/>
                </li>
                <li className={isDeploy ? styles.dropdownlist__displayed : styles.dropdownlist__hidden}>
                    <Link href={`${pathname}?sort=date`}>
                        <span>Date</span>
                    </Link>
                </li>
                <li className={isDeploy ? styles.dropdownlist__displayed : styles.dropdownlist__hidden}>
                    <Link href={`${pathname}?sort=titre`}>
                        <span>Titre</span>
                    </Link>
                </li>
            </ul>
        </section>
    )
}
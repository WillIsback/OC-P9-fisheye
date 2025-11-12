'use client';
import styles from './DropDownFilter.module.css'
import { useState } from 'react';
import BtnDropDown from '../Button/BtnDropDown';

export default function DropDownFilter () {
    const [activeFilter, selectFilter] = useState(0);
    const [isDeploy, setDeploy] = useState(false);


    return (
        <section className={styles.dropdownfilter__section}>
            <ul className={styles.dropdownlist}>
                <li className={styles.dropdownlist__default}>
                    <button type='button' onClick={()=>selectFilter(0)}>
                        <span>Popularité</span>
                    </button>
                    <BtnDropDown setDeploy={setDeploy} isDeploy={isDeploy}/>
                </li>
                <li className={!isDeploy ? styles.dropdownlist__hidden : styles.dropdownlist__displayed}>
                    <button type='button' onClick={()=>selectFilter(1)}>
                        <span>Date</span>
                    </button>
                </li>
                 <li className={!isDeploy ? styles.dropdownlist__hidden : styles.dropdownlist__displayed}>
                    <button type='button' onClick={()=>selectFilter(2)}>
                        <span>Titre</span>
                    </button>
                </li>
            </ul>
        </section>
    )
}
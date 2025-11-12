'use client';
import styles from './DropDownFilter.module.css'
import { useState, useContext } from 'react';
import BtnDropDown from '../Button/BtnDropDown';
import { FilterContext } from '@/context/FilterProvider';

export default function DropDownFilter () {
    const [activeFilter, setActiveFilter] = useContext(FilterContext);
    const [isDeploy, setDeploy] = useState(false);
    return (
        <section className={styles.dropdownfilter__section}>
            <ul className={styles.dropdownlist}>
                <li className={styles.dropdownlist__default}>
                    <button type='button' 
                        onClick={()=>setActiveFilter(0)}
                    >
                        <span>Popularité</span>
                    </button>
                    <BtnDropDown setDeploy={setDeploy} isDeploy={isDeploy}/>
                </li>
                <li className={!isDeploy ? styles.dropdownlist__hidden : styles.dropdownlist__displayed}>
                    <button type='button' onClick={()=>setActiveFilter(1)}>
                        <span>Date</span>
                    </button>
                </li>
                 <li className={!isDeploy ? styles.dropdownlist__hidden : styles.dropdownlist__displayed}>
                    <button type='button' onClick={()=>setActiveFilter(2)}>
                        <span>Titre</span>
                    </button>
                </li>
            </ul>
        </section>
    )
}
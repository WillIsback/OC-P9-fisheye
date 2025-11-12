'use client';
import styles from './DropDownFilter.module.css'
import { useState } from 'react';
import BtnDropDown from '../Button/BtnDropDown';

export default function DropDownFilter () {
    const [activeFilter, selectFilter] = useState(0);
    const [isDeploy, setDeploy] = useState(false);
    const filtercategories = ['Popularité', 'Date', 'Titre'];

    function handleOnClick(){

    }


    return (
        <section className={styles.dropdownfilter__section}>
            <button
                type='button'
                className={`btn--primary ${styles.dropdownfilter__section_btn}`}
                onClick={()=>handleOnClick()}
            >
                {filtercategories[activeFilter]}
                <BtnDropDown setDeploy={setDeploy} isDeploy={isDeploy}/>
            </button>
        </section>
    )
}
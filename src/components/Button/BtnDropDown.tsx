import Image from "next/image"
import styles from './btn.module.css'

import { Dispatch, SetStateAction } from "react"

export default function BtnDropDown ( { setDeploy, isDeploy } : {readonly setDeploy: Dispatch<SetStateAction<boolean>>, readonly isDeploy: boolean} ) {
    return(
        <button
            type='button'
            onClick={()=>setDeploy(!isDeploy)}
            className={styles.btndropdown}
        >
            <span>
                <Image
                    src={isDeploy ? '/dropdown_chevron_up.svg' : '/dropdown_chevron_down.svg'}
                    width={16}
                    height={9.88}
                    alt='icon pour deplier le selecteur du filtre de triage de la gallerie photo'
                />
            </span>
        </button>
    )

}
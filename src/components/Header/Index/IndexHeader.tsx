'use client'

import styles from './IndexHeader.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function IndexHeader (){
    const pathname = usePathname()
    console.log("Current pathname :", (pathname ==='/' && pathname !=null));

    return (
        <header className={styles.index__header}>
            <div className={styles.index__header_logo} aria-details='website index clickable logo'>
                <Image
                    src="/logo.svg"
                    alt="website index clickable logo"
                    width={200}
                    height={50}
                />
            </div>
            {(pathname ==='/' && pathname !=null) &&
                <h1 className={styles.index__header_title} aria-details='static title'>
                    Nos Photographes
                </h1>
            }
        </header>
    )
}
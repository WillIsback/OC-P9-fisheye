import styles from './IndexHeader.module.css'
import Image from 'next/image'

export default function IndexHeader (){
    return (
        <header className={styles.index__header}>
            <div className={styles.index__header_logo} aria-details='website index clickable logo'>
                <Image
                    src="logo.svg"
                    alt="website index clickable logo"
                    width={200}
                    height={50}
                />
            </div>
            <h1 className={styles.index__header_title} aria-details='static title'>
                Nos Photographes
            </h1>
        </header>
    )
}
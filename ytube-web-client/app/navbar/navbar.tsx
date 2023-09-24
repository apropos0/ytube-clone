import Image from "next/image"
import styles from "./navbar.module.css"
import Link from "next/link"
export default function Watch() {
    return (
        <nav className={styles.nav}>
            <Link href="/">
            <Image
            src="/youtube-logo.svg" alt="Youtube logo" width={100} height={20}/>
            </Link>
        </nav>
    )
}
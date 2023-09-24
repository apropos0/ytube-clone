'use client';

import Image from "next/image"
import styles from "./navbar.module.css"
import Link from "next/link"
import SignIn from "./sign-in"
import { onAuthStateChangedHelper } from "../firebase/firebase"
import { useEffect, useState } from "react"
import { User } from "firebase/auth"

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubsribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        })

        return () => unsubsribe()
    })
    return (
        <nav className={styles.nav}>
            <Link href="/">
            <Image
            src="/youtube-logo.svg" alt="Youtube logo" width={100} height={20}/>
            </Link>
            <SignIn user={user}/>
        </nav>
    )
}
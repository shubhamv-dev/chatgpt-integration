import React from 'react';
import styles from '../styles/Header.module.css';
import Image from 'next/image';
import logo from '../icons/logo.png'
import backAero from '../icons/arrow.png'
import Link from 'next/link';

const Header = () => {
    return (
        <header  className={styles.header }>
            <nav>
                <div>
                    <Image src={logo} alt='logo'/>
                </div>
                <div className={styles.menu_btn_container}>
                    <div className={styles.menu_container}>
                        <Link href="/tools">Tools</Link>
                        <Link href="#">FAQ</Link>
                        <Link href="/pricing">Pricing</Link>
                    </div>
                    <div className={styles.button_container}>
                        <Link href='/login' >
                        <button className={styles.login_btn}>
                            Login
                        </button>
                        </Link>
                        <div className={styles.tryit_free_container}>
                            <button className={styles.free_btn}>
                                <Image src={backAero} className={styles.back_arrow_img} alt='back_arrow' />
                                Try It Free
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

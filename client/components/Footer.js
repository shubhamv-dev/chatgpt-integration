import React from 'react'
import fbicon from '@/icons/facebook.png'
import instaicon from '@/icons/instagram.png'
import twticon from '@/icons/twitter.png'
import phoneicon from '@/icons/phone.png'
import Image from 'next/image'
import styles from '@/styles/footer.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={`${styles.footer}`}>
      <div className="container">
        <div className='row mx-0 text-center'>
          <div className={`${styles.copyright} col-md-6`}>
            Copyright 2023 | All Rights Reserved
          </div>
          {/* <div className='col-md-4 d-flex align-items-center justify-content-center'>
            <Image src={fbicon} alt='icon' className='me-2' />
                    <Image src={instaicon} alt='icon' className='me-2' />
                    <Image src={twticon} alt='icon' className='me-2' />
                    <Image src={phoneicon} alt='icon' className='me-2' />
          </div> */}
          <div className={`${styles.privacy} col-md-6`}
            //  className={`${styles["col-md-4"]} ${styles["privacy"]}`}
            style={{ fontFamily: "Poppins", textDecoration: "none" }}
          >
            <Link
              rel="preload"
              style={{ textDecoration: "none", color: "#212529" }}
              href="/privacypolicy"
              as="style"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
            rel="preload"
              style={{ textDecoration: "none", color: "#212529" }}
              href="/termsofservice"
              as="style"
            >

              Terms Of Service
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer
"use client";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/Header.module.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../icons/logo.png";
import backAero from "../icons/arrow.png";
import { Button, } from "react-bootstrap";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/auth";

function BasicExample() {
  const [auth, setAuth] = useAuth();

  // if (!auth.user && !auth.token) {
  //   const authData = JSON.parse(localStorage.getItem("auth"));
  //   if (authData) {
  //     setAuth(authData);
  //   }
  // }

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className={styles.header}>
        <Link rel="preload" href="/" as="/">
          {" "}
          <Image src={logo} alt="logo" className={styles.navMainLogo} priority/>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.menu_toggle} />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.menu_btn_container}>
          <Nav className={styles.menu_container}>
            <Link rel="preload" as="tools" href="/tools">Tools</Link>
            <Link rel="preload" as="faq" href="/faq">FAQ</Link>
            <Link rel="preload" as="pricing" href="/pricing">Pricing</Link>
          </Nav>
          <Nav>
            <div className={styles.button_container}>
              {!auth.token
                ?
                (
                  <Link href="/login" rel="preload" as="login">
                    <button className={styles.login_btn}>Login</button>
                  </Link>
                )
                :
                (
                  <Link href="/" rel="preload" as="/">
                    <button onClick={handleLogout} className={styles.login_btn}>Logout</button>

                  </Link>
                )

              }

              {/* <button className={styles.login_btn}>Login</button> */}
              <div className={styles.tryit_free_container}>
                <button className={styles.free_btn}>
                  <Image src={backAero} className={styles.back_arrow_img} alt="backAero" priority />
                  Try It Free
                </button>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;

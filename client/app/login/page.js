"use client"

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from 'next/image';
import image from "../../icons/sideimage.jpeg";
import Link from 'next/link'
import { useAuth } from "@/context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from 'next/navigation';
import { backend } from "@/constant/config";

const Login = () => {
  const [auth, setAuth] = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const location = usePathname()

  //  console.log("location",location);
  const HandleSubmit = async (e) => {

    e.preventDefault()
    try {
      const res = await axios.post(`${backend}/api/v1/auth/login`, { email, password })
      // console.log("res",res);
      if (res.data.success) {
        setAuth({ ...auth, user: res.data.user, token: res.data.token })
        localStorage.setItem('auth', JSON.stringify(res.data))
        toast.success(res.data.message)
        router.push(location.state || "/")
      } else {
        toast.success(res.data.message)
      }
    } catch (error) {
      // console.log(error)
      toast.success("something went wrong")
    }

  }

  return (
    <div className="container">
    <div className="d-flex flex-wrap logindiv justify-content-center signup">
      <div className="loginleftdiv  justify-content-start col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex align-items-center flex-column">
        <div className="loginlogo  mt-4">
          {/* <Link href="/">
            <Image src={logo} className="img-responsive" alt="logo" />
          </Link> */}
        </div>

        <div className="d-flex flex-column columndiv justify-content-start align-items-center signupInnerfirst px-2">
          <div className="loginheadings">

            <h3>Login To Your Account</h3>
          </div>
          <div className="loginforminnerdiv mt-3">
            <Form onSubmit={HandleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="signUp_formLabel mb-2" >Email address</Form.Label>
                <Form.Control
                  className="signUp_formInput"
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="signUp_formLabel mb-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  className="signUp_formInput"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check className="loginsignupdiv " type="checkbox" label="Remember me" />
                </Form.Group>
                <Link className="loginsignupdiv " href="#" >
                  Forgot Password?
                </Link>
              </div>
              <Button className="signUp_registerBtn" size="lg" type="submit">
                Login
              </Button>
            </Form>
            <div className="loginsignupdiv mt-3 text-center">
              Don't have an account? <Link href="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-md-block loginimage">
        <div className="colordiv" style={{ height: '630px' }}>
          <Image className="h-100" src={image} alt="demo" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;

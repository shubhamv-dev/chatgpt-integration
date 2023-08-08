"use client"

import React, { useState} from "react";
import Button from "react-bootstrap/Button";
 import Form from "react-bootstrap/Form";
 import Image from 'next/image';
import image from "../../icons/sideimage.jpeg";
import logo from "../../icons/logo.png";
import Link from 'next/link'
import { backend } from "@/constant/config";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'

const Signup = (props) => {
  const [name,setName] =useState("")
  const [email,setEmail] =useState("") 
  const [password,setPassword] =useState("")
  const [con_password,setCon_password] =useState("")
//   const dispatch = useDispatch();
const router = useRouter();
  


  const HandleSubmit = async(e)=>{
    
    e.preventDefault()
    try {
      if (password !== con_password) {
        toast.success("Passwords not matched");
    } else {
        const res =await axios.post(`${backend}/api/v1/auth/register`,{name,email,password,})
        // console.log("res",res);
        if (res.data.success){
            
        toast.success(res.data.message)
        router.push("/login")
        }else{
            toast.success(res.data.message)
        }
      }
    } catch (error) {
        // console.log(error)
        toast.success("something went wrong")
    }
   
    }

 
  return (
    <>
    <div className="container">
      <div className="d-flex flex-wrap logindiv justify-content-center signup">
        <div className="loginleftdiv  justify-content-start col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex align-items-center flex-column">
          {/* <div className="loginlogo  mt-4">
            <Link href="/">
              <Image src={logo} className="img-responsive" alt="logo" />
            </Link>
          </div> */}
          <div className="d-flex flex-column columndiv justify-content-start align-items-center signupInnerfirst px-2">
            <div className="loginheadings w-100">
              <h3>
             
                Create a new Account
              </h3>
            </div>
            <div className="loginforminnerdiv mt-3">
              <Form onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className="signUp_formLabel mb-2">Name</Form.Label>
                  <Form.Control className="signUp_formInput"
                
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} 
                    required
                  />
                </Form.Group>

                

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="signUp_formLabel mb-2">Email address</Form.Label>
                  <Form.Control className="signUp_formInput"
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} 
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="signUp_formLabel mb-2">Password</Form.Label>
                  <Form.Control className="signUp_formInput"
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="signUp_formLabel mb-2">Confirm password</Form.Label>
                  <Form.Control className="signUp_formInput"
                    type="password"
                    placeholder="Confirm Password"
                    name="con_password"
                    value={con_password}
                    onChange={(e)=>setCon_password(e.target.value)} 
                    required
                  />
                </Form.Group>

                <Button className="signUp_registerBtn"  size="lg" type="submit">
                Create your Account
                </Button>
              </Form>
              <div className="loginsignupdiv mt-3 text-center">
                Already have an account?
                <Link rel="preload" as="style" href="/login"  className="ms-2 loginLink">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 d-none d-md-block col-xs-12 loginimage">
          <div className="colordiv " style={{height:'630px'}}>
            <Image className="h-100 " src={image} alt="image"/>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
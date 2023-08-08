"use client";
import Image from "next/image";
import vector from "../../icons/vector.png";
import arrow from "../../icons/arrow.png";
import right from "../../icons/right.png";
import styles from "@/styles/pricing.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { backend } from "@/constant/config";
const PricingPage = () => {
  const [amount, setAmount] = useState(14.95);
  const [amount2, setAmount2] = useState(49.95);
  const [auth, setAuth] = useAuth();
  const [count, setCount] = useState(0)
  console.log("auth in headerone", auth);

  const router = useRouter();

  const pay = async () => {
    if (auth.user) {
      setCount(count + 1);
      try {
        const fetchData = await axios.post(`${backend}/api/v1/auth/clickpay`, { amount: amount });
        // Redirect to the URL obtained from the third API response
        window.location.href = fetchData.data.url;
      } catch (error) {
        console.log("error", error.messgae)
      }

    } else {
      router.push("/login");
    }
  };


  const pay2 = async () => {
    if (auth.user) {
      setCount(count + 1)
      // await  axios.post(`${backend}/getID`,{user_id:auth.user._id})
      const fetchData = await axios.post(`${backend}/api/v1/auth/clickpay`, { amount: amount2 })
      window.location.href = fetchData.data.url

    } else {
      router.push("/login")
    }

  };
  useEffect(() => {
    const data = localStorage.getItem('auth')
    if (data) {
      const parseData = JSON.parse(data)
      setAuth({ ...auth, user: parseData.user, token: parseData.token })
    }
    // eslint-disable-next-line
  }, [])
  const fetchData = async () => {
    if (auth.user) {
      await axios.post(`${backend}/getID`, { user_id: auth.user._id })
    }
  }
  useEffect(() => {
    fetchData()
  }, [count])
  return (
    <div className="container">
      <div className={styles.choosePlanMain}>
        <div className={styles.choosePlanMainDiv}>
          <h3 className={styles.mainHeading}>
            Flexible, Scalable Pricing To Power Your Growth
          </h3>
        </div>
        <div className={styles.pricing}>
          <div className={styles.pricing_container}>
            <div className={styles.image_container}>
              <Image src={vector} className={styles.icon_image} alt="vector" />
              <h3 className={styles.plan_title}>Starter</h3>
            </div>

            <div
              className={`${styles.price_amount_container} d-flex align-items-end`}
            >
              <div>
                <h1 className={styles.price_amount}>${amount}</h1>
              </div>
              <div>
                <p className={styles.month_name}>month</p>
              </div>
            </div>

            <div>
              <p className={styles.plan_include_para}>Starters Includes</p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button onClick={pay} className={styles.get_started_btn}>
                <Image className={styles.arrow_img} src={arrow} alt="arrow" />
                <p className={styles.get_started}>Get Started</p>
              </button>
            </div>

            <div
              className={`${styles.allowed_option_list_container} d-flex flex-column`}
            >
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>Questions & Answers</p>
              </div>
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>Article Generator</p>
              </div>
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>Summarizer</p>
              </div>
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>Advertising Post</p>
              </div>
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>Social Media Post</p>
              </div>
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />{" "}
                <p className={styles.allowed_option_list}>
                  5,625 Words Per Month
                </p>
              </div>
            </div>
          </div>

          <div
            className={styles.pricing_container}
            style={{ border: "3px solid #2EAC1A" }}
          >
            <div className={styles.image_container}>
              <Image src={vector} className={styles.icon_image} alt="icon_image" />
              <h3 className={styles.plan_title}>Professional</h3>
            </div>

            <div
              className={`${styles.price_amount_container} d-flex align-items-end`}
            >
              <div>
                <h1 className={styles.price_amount}>${amount2}</h1>
              </div>
              <div>
                <p className={styles.month_name}>month</p>
              </div>
            </div>

            <div>
              <p className={styles.plan_include_para}>
                professional includes:
                <br /> everything in starter Plus
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={pay2}
                style={{ background: " #2EAC1A" }}
                className={styles.get_started_btn}
              >
                <Image src={arrow} className={styles.arrow_img} alt="arrow_img" />
                <p className={styles.get_started}>Get Started</p>
              </button>
            </div>

            <div
              className={`${styles.allowed_option_list_container} d-flex flex-column`}
            >
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>
                  Advanced AI Capabilities
                </p>
              </div>
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>Secure & Private</p>
              </div>
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>Dedicated Support</p>
              </div>
              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>API access</p>
              </div>

              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>Google Ads</p>
              </div>

              <div
                className={`${styles.allowed_option_list_div} d-flex align-items-center`}
              >
                <Image src={right} alt="right" />
                <p className={styles.allowed_option_list}>
                  18,750 Words Per Month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;


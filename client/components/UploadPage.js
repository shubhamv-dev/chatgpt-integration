"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/form.module.css"; // Replace 'form.module.css' with the name of your CSS file
import Image from "next/image";
import SendIcon from "../icons/send-btn.png";
import RegenrateIcon from "../icons/regenrate-logo.png";
import top from "../icons/top.png";
import bottom from "../icons/bottom.png";
import checkMark from "../icons/checkmark.png";
import copyIcon from "../icons/copy_icon.png";
import copy from "copy-to-clipboard";
import { backend } from "../constant/config";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth";

const UploadPage = () => {
  const router = useRouter();

  const [file, setFile] = useState("");
  const [apiData, setApiData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [status, setStatus] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false);
  const [iconSrc, setIconSrc] = useState(SendIcon);
  const [textareaBgColor, setTextareaBgColor] = useState("#ffffff");

  const [count, setCount] = useState(0);
  const [ip, setIp] = useState("");
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [limitExceededMessage, setLimitExceededMessage] = useState(
    "Limit exceeded please. Check our "
  );
  const [auth, setAuth] = useAuth();

  const [dummyvariable, setDummyvariable] = useState(0);

  const [userData, setUserData] = useState({})

  const getUser = async () => {
    const user = await axios.get(`${backend}/api/v1/auth/getuser/${auth.user?._id}`);
    console.log("user", user)
    if (user) {

      setStatus(user.data.data?.subscription.planStatus)
      setUserData(user);
    }
  }
  useEffect(() => {
    getUser()
  }, [auth])

  useEffect(() => {

    getIp();
  }, [dummyvariable]);

  const getIp = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    if (response) {
      getCount(data.ip);
    }
    setIp(data.ip);
  };

  const getCount = async (ip) => {
    axios
      .post(`${backend}/getCount`, { ip: ip })
      .then((res) => {
        setCount(res.data.count);
      })
      .catch((err) => console.log(err));
  };

  const handleFileChange = (event) => {
    // const selectedFile = event.target.files[0];
    // console.log("selectedFile", selectedFile)
    // setFile(selectedFile);
    const content = event.target.value; // Get the value from the text input
    // console.log("content", content);
    setFile(content);
  };



  const handleSubmit = async (event) => {
    setDummyvariable(dummyvariable + 1);
    event.preventDefault();

    try {
      if (status || count < 3) {
        // setIsLoading(true);

        if (!file) {
          console.error("Please enter some text first.");
          // setIsLoading(false);
          return;
        }

        const requestData = {
          documentContent: file,
        };

        const response = await axios.post(
          `${backend}/upload-content`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("RESPONSE", response);
        if (response.status === 200) {
          const data = response.data;
          setApiData(data);
          console.log("Text uploaded:", data);
          axios
            .post(`${backend}/setCount`, { ip: ip })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          // Add logic to show a success message or perform any other actions upon successful text upload
        } else {
          console.error("Failed to upload text.");
          // Add logic to show an error message or handle the error in a way that suits your application
        }
      } else {
        setLimitExceeded(true);

        setTimeout(() => {
          // Your code to run after the delay
          router.push("/pricing");
        }, 4000);
      }
    } catch (error) {
      console.error("Error uploading text:", error);
      // Add logic to show an error message or handle the error in a way that suits your application
    }
    // finally {
    //   setIsLoading(false);
    // }
    setIsSubmitted(true);
    setShowAnswer(true);
    setIconSrc(RegenrateIcon);
    setTextareaBgColor("#CEE1F4");
  };

  // console.log("File State", file);

  // console.log("Api Data State", apiData);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   // setIsLoading(true);

  //   try {
  //     if (!file) {
  //       console.error("Please enter some text first.");
  //       // setIsLoading(false);
  //       return;
  //     }

  //     const requestData = {
  //       documentContent: file,
  //     };
  //     // console.log("backend",backend);
  //     const response = await axios.post(
  //       `${backend}/upload-content`,
  //       requestData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     // console.log("RESPONSE", response);
  //     if (response.status === 200) {
  //       const data = response.data;
  //       setApiData(data);
  //       // console.log("Text uploaded:", data);
  //       // Add logic to show a success message or perform any other actions upon successful text upload
  //     } else {
  //       console.error("Failed to upload text.");
  //       // Add logic to show an error message or handle the error in a way that suits your application
  //     }
  //   } catch (error) {
  //     console.error("Error uploading text:", error);
  //     // Add logic to show an error message or handle the error in a way that suits your application
  //   }
  //   //  finally {
  //   // setIsLoading(false);
  //   // }
  //   setIsSubmitted(true);
  //   setShowAnswer(true);
  //   setIconSrc(RegenrateIcon);
  //   setTextareaBgColor("#CEE1F4");
  // };

  useEffect(() => {
    const displayAnswersOneByOne = () => {
      if (apiData && apiData.data && apiData.data.answers) {
        const totalAnswers = apiData.data.answers.length;

        if (currentAnswerIndex < totalAnswers) {
          const currentAnswer = apiData.data.answers[currentAnswerIndex];
          if (currentCharIndex < currentAnswer.length) {
            setCurrentCharIndex((prevIndex) => prevIndex + 1);
          } else {
            setCurrentAnswerIndex((prevIndex) => prevIndex + 1);
            setCurrentCharIndex(0);
          }
        }
      }
    };

    const timer = setTimeout(displayAnswersOneByOne, 10); // Adjust the delay time here (100ms)

    return () => clearTimeout(timer);
  }, [apiData, currentAnswerIndex, currentCharIndex]);

  const containsCode = (answer) => {
    // Replace this check with the logic to identify code in the answer
    return answer.includes("var") || answer.includes("const");
  };

  const handleCopyClick = (answer) => {
    copy(answer);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className={styles.main_div}>
        <div className={styles["form-container"]}>
          <div className={styles["heading-container"]}>
            <TypeAnimation
              sequence={[
                "Ask Anything...",
                800,
                "Write Anything...",
                5,
                "Calculate Anything...",
                900,
                "Summarize Anything...",
                5,
                "Find Anything...",
                900,
                "Plan Anything...",
                5,
              ]}
              // style={{ fontSize: '2em' }}
              className={styles.heading}
              speed={50}
              repeat={Infinity}
            />
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            {!isSubmitted && (
              <div className={styles["form-wrapper"]}>
                <textarea
                  className={styles["form-input"]}
                  onChange={handleFileChange}
                  name="documentContent"
                  rows={6}
                />

                <button className={styles["form-submit-button"]} type="submit">
                  <Image src={SendIcon} alt="sendIcon" />
                </button>
              </div>
            )}

            {isSubmitted && (
              <div
                className={`${styles["form-wrapper"]} ${styles["form-wrapper-response"]}`}
                style={{
                  backgroundColor: textareaBgColor,
                }}
              >
                <textarea
                  className={`${styles["form-input"]} ${styles["form-input-response"]}`}
                  onChange={handleFileChange}
                  name="documentContent"
                  rows={showAnswer ? 2 : 8}
                  value={file}
                  style={{
                    backgroundColor: "transparent",
                  }}
                />
                <button
                  className={styles["regenrate-btn"]}
                  type="submit"
                  style={{ backgroundColor: "#4586C6" }}
                >
                  <Image
                    src={iconSrc}
                    className={styles["regenrate-btnImg"]}
                    alt="iconSrc"
                  />
                </button>
              </div>
            )}
          </form>

          {!isSubmitted && (
            <div className={styles["demoQuestions"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Image src={top} className={styles.open_qoute} alt="top" />
              </div>

              <div className={styles.quote_para}>
                <div style={{ lineHeight: "25px" }}>
                  create an itinerary for a ten day vacation Italy....
                </div>
                <div style={{ lineHeight: "25px" }}>
                  write out a meal plan for someone lactose intolerant...
                </div>
                <div style={{ lineHeight: "25px" }}>
                  create a witty social media caption for this photo....
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Image src={bottom} alt="bottom" />
              </div>
            </div>
          )}

          {/* {isLoading && <div className={styles["loader"]}></div>} */}

          {limitExceeded ? (
            <div className={styles["api-data-container"]}>
              {limitExceededMessage}
              <Link
                rel="preload"
                style={{ textDecoration: "none", color: "#2EAC1A" }}
                href="/pricing"
                as="style"
              >
                Pricing
              </Link>
            </div>
          ) : (
            apiData && (
              <div
                className={`${styles["api-data-container"]} ${styles["api-data-container-response"]}`}
              >
                {apiData.data && apiData.data.answers ? (
                  apiData.data.answers
                    .slice(0, currentAnswerIndex + 1)
                    .map((answer, index) => (
                      <div key={index}>
                        <div>
                          {containsCode(answer) ? (
                            <pre className={styles["code-box"]}>
                              {index === currentAnswerIndex
                                ? answer.slice(0, currentCharIndex)
                                : answer}
                            </pre>
                          ) : (
                            <pre>
                              {index === currentAnswerIndex
                                ? answer.slice(0, currentCharIndex)
                                : answer}
                            </pre>
                          )}
                          {index !== currentAnswerIndex && "\n\n"}
                          <button
                            className={styles["copyBtn"]}
                            onClick={() => handleCopyClick(answer)}
                          >
                            {isCopied ? (
                              <>
                                <Image
                                  src={checkMark}
                                  className={styles["copyBtnIcon"]}
                                  alt="checkMark"
                                />
                              </>
                            ) : (
                              <>
                                <Image
                                  src={copyIcon}
                                  alt="copyIcon"
                                  className={styles["copyBtnIcon"]}
                                />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No answers available.</p>
                )}
              </div>
            )
          )}

          {/* {apiData && (
            <div
              className={`${styles["api-data-container"]} ${styles["api-data-container-response"]}`}
            >
              {apiData.data && apiData.data.answers ? (
                apiData.data.answers
                  .slice(0, currentAnswerIndex + 1)
                  .map((answer, index) => (
                    <div key={index}>
                      <div>
                        {containsCode(answer) ? (
                          <pre className={styles["code-box"]}>
                            {index === currentAnswerIndex
                              ? answer.slice(0, currentCharIndex)
                              : answer}
                          </pre>
                        ) : (
                          <pre>
                            {index === currentAnswerIndex
                              ? answer.slice(0, currentCharIndex)
                              : answer}
                          </pre>
                        )}
                        {index !== currentAnswerIndex && "\n\n"}
                        <button
                          className={styles["copyBtn"]}
                          onClick={() => handleCopyClick(answer)}
                        >
                          {isCopied ? (
                            <>
                              <Image
                                src={checkMark}
                                className={styles["copyBtnIcon"]}
                                alt="checkMark"
                              />
                            </>
                          ) : (
                            <>
                              <Image
                                src={copyIcon}
                                alt="copyIcon"
                                className={styles["copyBtnIcon"]}
                              />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p>No answers available.</p>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default UploadPage;
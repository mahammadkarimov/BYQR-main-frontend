import React from "react";
import ForgotHeader from "@/components/Profile/UserLogin/Forgot/ForgotHeader";
import styles from "./forgot.module.css";

import back from "../../../../../assets/icons/Profile/back.svg";
import message from "../../../../../assets/icons/Profile/message.svg";
import phone from "../../../../../assets/icons/Profile/phone.svg";
import Image from "next/image";

const page = () => {
  const text1 = "Forgot Password";
  const text2 =
    "Select with contact details should we use to reset yout password";

  return (
    <div className="min-h-screen mx-4">
      <ForgotHeader imageUrl={back} text1={text1} text2={text2} />
      <div className={styles.emailInp}>
        <Image
          src={message}
          className={styles.mailIcon}
          alt="email"
          loading="eager"
        />
        <h3>Email</h3>
        <h4>*******@gmail.com</h4>
      </div>
      <div className={styles.emailInp}>
        <Image
          src={phone}
          className={styles.mailIcon}
          alt="phone"
          loading="eager"
        />
        <h3>Phone Number</h3>
        <h4>** *** ***456</h4>
      </div>
    </div>
  );
};

export default page;

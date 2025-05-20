import Image from "next/image";
import React from "react";
import styles from "./newPassSuccess.module.css";

import x from "../../../../assets/icons/Profile/x.svg";
import success from "../../../../assets/icons/Profile/success.svg";
import ProfileRedBtn from "../ProfileRedBtn/ProfileRedBtn";

const NewPassSuccess = () => {
  return (
    <div className={styles.successContainer}>
      <div className={styles.iconContiner}>
        <Image src={x} loading="eager" alt="x" />
      </div>
      <div className={styles.illustrations}>
        <Image src={success} loading="eager" alt="success" />
      <div className={styles.textContainer}>
        <h2>Password Changed</h2>
        <h4>
          Password changed succesfully, You can login again with new password
        </h4>
      </div>
      </div>

      <ProfileRedBtn text="Sign in Now" />
    </div>
  );
};

export default NewPassSuccess;

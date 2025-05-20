import Image from "next/image";
import React from "react";
import styles from "./forgotHeader.module.css";

const ForgotHeader = (props) => {
  const { imageUrl, text1, text2 } = props;

  return (
    <div className={styles.forgotHeaderContainer}>
      <div className={styles.backContainer}>
        <Image src={imageUrl} loading="eager" alt="imageUrl" />
      </div>
      <div className={styles.textContainer}>
        <h2>{text1}</h2>
        <h4>{text2}</h4>
      </div>
    </div>
  );
};

export default ForgotHeader;

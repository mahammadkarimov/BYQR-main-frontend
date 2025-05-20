import React from "react";
import styles from "./whiteBoard.module.css";
import Image from "next/image";
import magnify from "../../../assets/images/Home/home-magnifying.svg";
import { colors } from "@/styles/color/colors";

const WhiteBoard = (props) => {
  const { text, showSearchIcon } = props;

  return (
    <div className={styles["whiteboardmain"]}>
      <div className={styles["boardText"]} style={{ color: colors.big_title }}>
        <h1>{text}</h1>
      </div>
     {showSearchIcon && (
       <div>
       <Image
         className="sm:w-[28px]"
         width={24}
         height={24}
         loading="eager"
         alt="magnify"
         src={magnify}
       />
     </div>
     )}
    </div>
  );
};

export default WhiteBoard;

"use client";
import React, { useEffect, useState } from "react";
import styles from "./BottomDetails.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { colors } from "../../../styles/color/colors";
import SmallMealTypes from "../SmallMealTypes/SmallMealTypes";
import StarPriceContent from "../StarPriceContent/StarPriceContent";

import Sheet from "react-modal-sheet";
import manat from '../../../assets/icons/Home/manat.svg'

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const BottomDetails = (props) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[700, 400, 300, 200]}
        initialSnap={2}
        onCloseEnd={() => setOpen(true)}>
        <Sheet.Container
          style={{
            borderRadius: "32px 32px 0 0",
            border: "1px solid #edf1f8",
          }}>
          <Sheet.Header />
          <Sheet.Content>
            <div className={`${styles["opened"]}`}>
              <div
                className={`${styles.bigTitle}`}
                style={{ color: colors.big_title }}>
                <h3 className={styles["detail-head"]}>
                  {props?.data?.data[0]?.name}
                </h3>
              </div>
              <div className="flex justify-center sm:justify-center gap-2 w-[80%]">
                <SmallMealTypes
                  text={props?.data?.data[0]?.vegan ? "vegan" : "non-vegan"}
                  fontSize="12px"
                />
              </div>
              <div className={styles["starPriceContainer"]}>
                <StarPriceContent
                  text={props?.data?.data[0]?.price}
                  fontWeight="600"
                  padding="0px 10px 0px 10px"
                  imageSrc={manat}
                  border="1px solid #EDF1F8"
                />
              </div>
              <div
                className={styles["textDetails"]}
                style={{ color: colors.big_title }}>
                <h5>Ingredients</h5>
                <p
                  className={plusJakarta.className}
                  style={{ color: "#808D9E" }}>
                  {props?.data?.data[0]?.ingredient}
                </p>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default BottomDetails;

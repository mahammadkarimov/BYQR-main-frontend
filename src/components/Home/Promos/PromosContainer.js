"use client";
import React from "react";
import styles from "./PromosContainer.module.css";

import byqrlogo from "../../../assets/images/Home/byqr-logo.svg";
import base from "../../../assets/images/Promos/base.svg";
import Image from "next/image";
import { useQuery } from "react-query";
import { DiscountsList } from "@/services/api/dataApi";

const PromosContainer = () => {
  const { data } = useQuery("discounts", DiscountsList);

  const discount = data?.data?.results;

  return (
    <div className={styles.PromoContainer}>
      {discount?.map((item, index) => (
        <div key={index} className={styles.baseDiv}>
          <Image
            src={base}
            sizes="100%"
            fill
            alt="restoran icon"
            loading="eager"
          />
          <div className={styles.card}>
            {item.image ? (
              <Image
                src={item.image}
                width={68}
                className="rounded-lg"
                height={68}
                alt="restoran icon"
                loading="eager"
              />
            ) : (
              <Image
                src={byqrlogo}
                width={68}
                className="rounded-lg"
                height={68}
                alt="restoran icon"
                loading="eager"
              />
            )}

            <div className={styles.textContainer}>
              <h3>{item.name}</h3>
              <h4>Valid till 30 May 2020</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromosContainer;

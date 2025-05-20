"use client";
import React from "react";

import styles from "./profilehomecard.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

import { useQuery } from "react-query";
import { MealCategoryList } from "@/services/api/dataApi";
import { useDispatch } from "react-redux";
import { selectCategorySlug } from "@/redux/features/categorySlugSlice";
import { usePathname, useRouter } from "next/navigation";

const ProfileHomeCard = () => {
  const { data } = useQuery("categories", MealCategoryList);

  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname()
  const customColors = ["#FFE8ED", "#EBF8E6", "#E5EDFA", "#FFEFB6"];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * customColors.length);
    return customColors[randomIndex];
  };


  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleCategories = (data) => {
    const slug = data?.slug;
    dispatch(selectCategorySlug(slug));
    router.push(`/${pathname.slice(1, 3)}/home`);
  };

  return (
    <>
      {data?.data?.map((item, index) => (
        <motion.div
          onClick={() => handleCategories(item)}
          key={index}
          className={styles["category-card"]}
          style={{ backgroundColor: getRandomColor() }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
          initial={{ opacity: 0 }}>
          <h3 className="mb-3 mt-2">{item?.name}</h3>
          <Image
            className={styles["category-img"]}
            width={149}
            height={150}
            src={item?.icon}
            alt="food-image"
          />
        </motion.div>
      ))}
    </>
  );
};

export default ProfileHomeCard;

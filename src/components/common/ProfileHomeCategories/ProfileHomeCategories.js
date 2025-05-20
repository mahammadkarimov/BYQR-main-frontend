"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./profilehomecategories.module.css";

import "@/../slick-carousel/slick/slick.css";
import "@/../slick-carousel/slick/slick-theme.css";

import homecategorymeal from "../../../assets/images/Home/homecategorymeal.svg";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { MealCategoryList} from "@/services/api/dataApi";
import { useDispatch } from "react-redux";
import { selectCategorySlug } from "@/redux/features/categorySlugSlice";

const ProfileHomeCategories = () => {
  const [selectedCategory, SetSelectedCategory] = useState(null);
  const { data } = useQuery("categories", MealCategoryList);
  const dispatch = useDispatch();

  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    slidesToScroll: 2,
    variableWidth: true,
  };

  const handleCatecoryClick = (index) => {
    SetSelectedCategory(index);
  };

  const handleselectedCategory = (data) => {
    const slug = data?.slug;
    dispatch(selectCategorySlug(slug));
  };

  const getAllProducts = () => {
    location.reload()
  }

  return (
    <>
      <div className="mx-4 mt-4 mb-[38px]">
        <h3 className={styles.chooseCategory}>Choose Category</h3>
        <Slider {...settings}>
          <div onClick={() => getAllProducts()} className={styles["home-category-card"]}>
            <div className={styles["home-category-img"]}>
              <Image
                src={homecategorymeal}
                width={64}
                height={64}
                loading="eager"
                alt="category-meal"
              />
            </div>
            <span>All</span>
          </div>
          {data?.data?.map((item, index) => (
            <div
              onClick={() => handleselectedCategory(item)}
              key={index}
              className={styles["home-category-card"]}>
              <div
                className={`${styles["home-category-img"]} ${selectedCategory === index ? styles.selectedCategory : ""
                  }`}
                onClick={() => handleCatecoryClick(index)}>
                {item?.icon ? (
                  <Image
                    src={item?.icon}
                    className={styles.categoryImage}
                    width={64}
                    height={64}
                    loading="eager"
                    alt="category-meal"
                  />
                ) : (
                  <Image
                    src={homecategorymeal}
                    width={64}
                    height={64}
                    loading="eager"
                    alt="category-meal"
                  />
                )}
              </div>
              <span>{item?.name}</span>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ProfileHomeCategories;

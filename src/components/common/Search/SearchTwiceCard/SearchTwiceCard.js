"use client";
import { colors } from "@/styles/color/colors";
import React from "react";
import SmallMealTypes from "../../SmallMealTypes/SmallMealTypes";
import StarPriceContent from "../../StarPriceContent/StarPriceContent";
import styles from "../../TwiceCards/TwiceCards.module.css";
import Image from 'next/image'
import manat from '../../../../assets/icons/Home/manat.svg'
import { selectProductSlug } from "@/redux/features/categorySlugSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

const TwiceCards = (props) => {
  const { product, imageSrc, text, index } = props;
  const dispatch = useDispatch();
  const textColor = colors.big_title;

  const style = {
    color: textColor,
    display: "flex",
    marginBottom: '16px',
    flexDirection: "column",
    width: "100%",
    borderRadius: "16px",
    padding: "0px 0px 20px 0px",
    boxShadow: "0 30px 60px 0 rgba(173, 177, 189, 0.25)",
    gap: "12px",
    flex: "0 0 calc(50% - 10px)",
  };

  const handleGetProductSlug = (product) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('productSlug', product.slug);
    window.history.pushState({}, '', newUrl);
  };

  return (
    <div onClick={() => handleGetProductSlug(product)} key={index} style={style} >
      <div className="relative">
        <Image
          width={100}
          height={100}
          style={{
            width: "100%",
            height: "147px",
            objectFit: "cover",
            borderRadius: "16px 16px 0 0",
          }}
          src={imageSrc}
          alt={imageSrc}
        />
        {
          product?.is_new &&
          <span className="absolute top-3 left-3 text-red-500 font-semibold text-md bg-[#FFEEE8] rounded px-2">new</span>
        }
      </div>
      <div className="flex justify-start items-start px-3 flex-col text-center">
        <div className={styles["cardText"]} style={{ color: colors.big_title }}>
          <h2>{text.length > 13 ? text.slice(0, 13) + '...' : text}</h2>
        </div>
        {/* <div className="flex justify-start sm:justify-center gap-2 mb-4 w-[80%]"> */}
          {/* <SmallMealTypes
            text={product?.vegan ? "vegan" : "non-vegan"}
            fontSize="10px"
          /> */}
          {
            product?.is_halal &&
            <div className="text-[#009000] bg-[#E0F1D5] px-2 rounded-[4px] flex items-center justify-center">
              <p className="text-[10px]">halal</p>
            </div>
          }
        {/* </div> */}
        <div className="w-full flex justify-between h-[20px]">
          <StarPriceContent
            justifyContent="start"
            price={product?.price}
            fontWeight="600"
            imageSize={24}
            imageSrc={manat}
          />
          {product?.etp && (
            <DeliveryMinute
              isTwiceCard="active"
              preparationTime={product?.etp}
              className={styles.deliveryMinute}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TwiceCards;
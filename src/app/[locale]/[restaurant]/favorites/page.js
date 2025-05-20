"use client";
import TwiceCards from "@/components/common/TwiceCards/TwiceCards";
import WhiteBoard from "@/components/common/WhiteBoard/WhiteBoard";
import React, { useEffect, useState } from "react";
import styles from "./favorites.module.css";
import { motion } from "framer-motion";

import HomeNavbar from "@/components/common/HomeNavbar/HomeNavbar";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const page = () => {
  const t = useTranslations('Home')
  const [filteredProductData, setFilteredProductData] = useState();
  const selFavoritesItems = useSelector((state) => state.favorites.items);

  useEffect(() => {
    setFilteredProductData(selFavoritesItems);
  }, []);

  return (
    <div>
      <div>
        <WhiteBoard text={t('Favourites')} showSearchIcon="true" />
      </div>
      <motion.div
        className={styles["twiceCardsContainer"]}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
        initial={{ opacity: 0 }}>
        {filteredProductData?.map((product) => (
          <TwiceCards
            product={product}
            text={product?.name}
            imageSrc={product?.image}
          />
        ))}
      </motion.div>
      <div>
        <HomeNavbar />
      </div>
    </div>
  );
};

export default page;

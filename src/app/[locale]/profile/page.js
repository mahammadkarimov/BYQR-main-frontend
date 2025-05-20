"use client";
import WhiteBoard from "@/components/common/WhiteBoard/WhiteBoard";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./profile.module.css";
import TextInp from "@/components/Profile/UserLogin/TextInp/TextInp";
import EmailInp from "@/components/Profile/UserLogin/EmailInp/EmailInp";
import PhoneInp from "@/components/Profile/UserLogin/PhoneInp/PhoneInp";

import logOut from "../../../assets/icons/Profile/logOut.svg";
import downloadProfile from "../../../assets/icons/Profile/downloadProfile.svg";
import circleProfile from "../../../assets/images/Home/circleProfile.svg";
import HomeNavbar from "@/components/common/HomeNavbar/HomeNavbar";
import PassInp from "@/components/Profile/UserLogin/PassInp/PassInp";
import ProfileRedBtn from "@/components/Profile/UserLogin/ProfileRedBtn/ProfileRedBtn";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openEditModal = () => {
    setIsOpen(!isOpen);
  };

  console.log(isOpen);

  return (
    <div className="relative overflow-hidden">
      <div>
        <div>
          <div className="mt-3">
            <WhiteBoard text="Profile" />
          </div>
          <div className="flex ml-4 items-center gap-4 mt-4">
            <div>
              <Image
                src={circleProfile}
                loading="eager"
                alt="profile"
                width={60}
                height={60}
              />
            </div>
            <div className={styles.profileName}>Sanan Abdullayev</div>
          </div>
          <div className="mt-6 ml-4 mr-4 flex flex-col gap-[14px]">
            <TextInp text="Sanan Abdullayev" />
            <EmailInp text="Sanan@byqr.az" />
            <PhoneInp />
          </div>
          <div className="ml-4 mt-[26px]">
            <div className="flex items-center gap-2 cursor-pointer w-[90px]">
              <Image
                src={logOut}
                alt="logout"
                loading="eager"
                width={24}
                height={24}
              />
              <h4 className={styles.logOut}>Log Out</h4>
            </div>
          </div>
          <div className={styles.editText}>
            <button onClick={openEditModal}>Edit Profile</button>
          </div>
          <HomeNavbar />
        </div>
      </div>
      <div className={`${isOpen?styles.slideEditOpen:styles.slideEditClose}`}>
        <div className={styles.editTop}>
          <h3>Edit Profile</h3>
          <button onClick={openEditModal}>Cancel</button>
        </div>
        <div className={styles.ProfilePhotoDiv}>
          <div className="relative">
            <Image
              src={circleProfile}
              className="object-cover"
              alt="profile"
              width={88}
              height={88}
            />
            <div className={styles.downloadPhoto}>
              <Image src={downloadProfile} alt="download" />
            </div>
          </div>
        </div>
        <div className={styles.inputsSlide}>
          <TextInp text="Sanan Abdullayev" />
          <EmailInp text="Sanan@byqr.az" />
          <PhoneInp />
          <PassInp text="Type your password" />
        </div>
        <div className="px-4 mt-44">
          <ProfileRedBtn text="Save Changes" />
        </div>
      </div>
    </div>
  );
};

export default page;

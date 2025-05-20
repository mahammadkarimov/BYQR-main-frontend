"use client";
import "../../../styles/style.css";
import React from "react";
import { Roboto } from "next/font/google";

import TopNavigation from "@/components/Admin/MainAdmin/TopNavigation";
import SideNavigation from "@/components/Admin/MainAdmin/SideNavigation/SideNavigation";
import MainLayout from "@/components/Admin/MainAdmin/MainLayout/MainLayout";
import ProfileSettingsPopup from '../../Admin/ProfileSettingsPopup/ProfileSettingsPopup'
import { useQuery } from "react-query";
import { getUserAuth } from "@/services/api/dataApi";
import AdminChooseLang from "@/components/Admin/AdminChooseLang/AdminChooseLang";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const page = ({ children }) => {

  const { data, isLoading } = useQuery(['user-auth'], getUserAuth)

  if (isLoading) {
    return null
  }
console.log(data)
  return (
    <div className={roboto.className}>
      <div className="flex">
        <main className="w-full">
          <TopNavigation />
          <AdminChooseLang />
          <div className="flex">
            <SideNavigation userAuth={data} />
            <ProfileSettingsPopup />
            <MainLayout>
              {children}
            </MainLayout>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;

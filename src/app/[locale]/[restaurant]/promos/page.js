import PromosContainer from "@/components/Home/Promos/PromosContainer";
import HomeNavbar from "@/components/common/HomeNavbar/HomeNavbar";
import WhiteBoard from "@/components/common/WhiteBoard/WhiteBoard";
import React from "react";

const page = () => {
  return (
    <div>
      <WhiteBoard text="Promos" />
      <PromosContainer/>
      <HomeNavbar />
    </div>
  );
};

export default page;

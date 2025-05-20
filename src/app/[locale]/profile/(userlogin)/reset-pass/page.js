import React from "react";

import back from "../../../../../assets/icons/Profile/back.svg";
import ForgotHeader from "@/components/Profile/UserLogin/Forgot/ForgotHeader";
import EmailInp from "@/components/Profile/UserLogin/EmailInp/EmailInp";
import ProfileRedBtn from "@/components/Profile/UserLogin/ProfileRedBtn/ProfileRedBtn";

const page = () => {
  const text1 = "Reset Password";
  const text2 =
    "Enter your email, we will send a verification code to your email";

  return (
    <div className="min-h-screen mx-4 flex flex-col justify-between">
      <ForgotHeader imageUrl={back} text1={text1} text2={text2} />
      <div className="flex-1 mt-6">
        <EmailInp />
      </div>
      <ProfileRedBtn text="Send Link" />
    </div>
  );
};

export default page;

import React from "react";
import back from "../../../../../assets/icons/Profile/back.svg";
import ForgotHeader from "@/components/Profile/UserLogin/Forgot/ForgotHeader";
import PassInp from "@/components/Profile/UserLogin/PassInp/PassInp";
import ProfileRedBtn from "@/components/Profile/UserLogin/ProfileRedBtn/ProfileRedBtn";

const page = () => {
  const text1 = "Create New Password";
  const text2 = "Your password must be different from previous used password";

  return (
    <div className="min-h-screen flex flex-col mx-4 justify-between">
      <div className="flex-1">
        <ForgotHeader imageUrl={back} text1={text1} text2={text2} />
        <div className="flex flex-col gap-4 mt-6">
          <PassInp text="Confirm your password"/>
          <PassInp text="Confirm your password"/>
        </div>
      </div>
      <ProfileRedBtn text="Reset Password" />
    </div>
  );
};

export default page;

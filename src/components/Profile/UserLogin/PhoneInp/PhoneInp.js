"use client";
import React, { useState } from "react";
import "./PhoneInp.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneInp = () => {
  const [value, setValue] = useState();

  return (
    <>
      <PhoneInput
        defaultCountry="AZ"
        className="phoneInput"
        international
        labels={{ RU: "RU", US: "USA" }}
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
      />
    </>
  );
};

export default PhoneInp;

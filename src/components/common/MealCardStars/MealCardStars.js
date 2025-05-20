import Image from "next/image";
import React from "react";
import star from "../../../assets/images/Home/star.svg";

const MealCardStars = (props) => {
  const { text } = props;

  const style = {
    width: "64px",
    height: "32px",
    borderRadius: "8px",
    padding: "8px 12px 8px 12px",
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    gap: "8px",
    backgroundColor: "rgba(31, 39, 45, 0.3)",
    backdropFilter: "blur(3px)",
    position:"absolute",
    top:"20px",
    left:"20px"
  };

  return (
    <div style={style}>
      <div>
        <Image src={star} width={16} height={16} loading="eager" alt={star} />
      </div>
      <div className="w-[16px] text-xs h-[16px] font-semibold text-white">
        {text}
      </div>
    </div>
  );
};

export default MealCardStars
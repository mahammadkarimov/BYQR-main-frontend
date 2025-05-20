"use client";
import React, { useRef, useState } from "react";
import styles from "./AccountSettings.module.css";
import download from "../../../assets/icons/Admin/AdminSettings/imageDownload.svg";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  UserList,
  HotelUserUpdate,
  UserUpdatePatch,
  GetHotelUserInfo
} from "@/services/api/dataApi";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AccountSettings = () => {
  const [activeRestData, setActiveRestData] = useState(null)
  const [activeHotelData, setActiveHotelData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isActiveLocalPhoto, setIsActiveLocalPhoto] = useState(false)
  const queryClient = useQueryClient()
  const fileInputRef = useRef(null);

  const { _, isLoading } = useQuery("userList", () => UserList(), {
    onSuccess: (data) => {
      if (data) {
        setActiveRestData(data?.data)
      }
    }
  });

  const { __, isLoading: isLoading2 } = useQuery("hoteUserList", () => GetHotelUserInfo(), {
    onSuccess: (data) => {
      if (data) {
        setActiveHotelData(data?.data)
      }
    }
  });

  const mutationUser = useMutation(
    (data) => UserUpdatePatch(data), {
    onSuccess: () => {
      toast.success('Saved user information...')
      queryClient.invalidateQueries(['user'])
    },
    onError: () => {
      toast.error('Oops, something went wrong!')
    },
  }
  );

  const { mutate: saveHotelProfileInfo } = useMutation(
    (data) => HotelUserUpdate(data), {
    onSuccess: () => {
      toast.error('Oops, something went wrong!')
    },
    onError: () => {
      toast.success('Saved user information...')
      queryClient.invalidateQueries(['hotelUser'])
    },
  }
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedObject = { ...activeRestData };
      updatedObject.profile_photo = file;
      setActiveRestData(updatedObject)
      setActiveHotelData(updatedObject)
      setIsActiveLocalPhoto(true)
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      };
      reader.readAsDataURL(file);
    } else {
      return
    }
  };

  const restHandle = (e) => {
    const updatedObject = { ...activeRestData };
    updatedObject.first_name = e.target.value;
    setActiveHotelData(updatedObject)
    setActiveRestData(updatedObject)
  };

  const restHandleAdress = (e) => {
    const updatedObject = { ...activeRestData };
    updatedObject.address = e.target.value;
    setActiveHotelData(updatedObject)
    setActiveRestData(updatedObject)
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof activeRestData.profile_photo === 'object') {
      mutationUser.mutate(activeRestData);
      return
    }else {
      const { profile_photo, ...newActiveRestData } = activeRestData
      mutationUser.mutate(newActiveRestData);
    }
    if (Cookies.get('login_type') === 'isHotel') {
      saveHotelProfileInfo(activeHotelData)
    }
  };

  return (
    <div className="flex justify-center">
      <div className={styles["accountContainer"]}>
        <div className={styles["formContainer"]}>
          <form>
            <div className={styles["imageDownload"]}>
              <input
                name="profile_photo"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />
              <label onClick={handleButtonClick} className={styles["imageLabel"]}>
                {
                  isLoading || isLoading2 ? <Skeleton
                    circle
                    width={140}
                    height={145}
                    containerClassName="avatar-skeleton" />
                    :
                    !activeRestData?.profile_photo && !activeHotelData?.profile_photo
                      ?
                      <Image
                        className="rounded-full w-[120px] h-[120px]"
                        alt="download"
                        src={download}
                        style={{ objectFit: "cover" }}
                        width={50}
                        height={50}
                        loading="lazy"
                      />
                      :
                      (activeRestData?.profile_photo && !selectedImage) ?
                        <Image
                          className="rounded-full w-[120px] h-[120px]"
                          alt="download"
                          src={activeRestData?.profile_photo}
                          style={{ objectFit: "cover" }}
                          width={50}
                          loading="eager"
                          height={50}
                        />
                        :
                        (activeHotelData?.profile_photo && !selectedImage)
                          ?
                          <Image
                            className="rounded-full w-[120px] h-[120px]"
                            alt="download"
                            src={activeHotelData?.profile_photo}
                            style={{ objectFit: "cover" }}
                            width={50}
                            loading="eager"
                            height={50}
                          />
                          :
                          <Image
                            className="rounded-full w-[120px] h-[120px]"
                            alt="download"
                            src={selectedImage ? selectedImage : download}
                            style={{ objectFit: "cover" }}
                            width={50}
                            loading="eager"
                            height={50}
                          />
                }
              </label>
            </div>
            <label>Restaurant Name</label>
            <br />
            <input  
              name="first_name"
              disabled
              onChange={(e) => restHandle(e)}
              value={activeRestData?.first_name ? activeRestData?.first_name : activeHotelData?.first_name}
              type="text"
              placeholder="Restaurant Name"
            />
            <br />
            <label>Address</label>
            <br />
            <input
              name="address"
              onChange={(e) => restHandleAdress(e)}
              value={activeRestData?.address ? activeRestData?.address : activeHotelData?.address}
              type="text"
              placeholder="Address"
            />
            <br />
            <button onClick={(e) => handleSubmit(e)}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

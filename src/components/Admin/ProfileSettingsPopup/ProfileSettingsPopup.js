'use client'
import React, { useRef, useState } from 'react'
import styles from '../AccountSettings/AccountSettings.module.css'
import user from '../../../assets/icons/Admin/mainAdmin/user.png'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  UserList,
  HotelUserUpdate,
  UserUpdatePatch,
  GetHotelUserInfo,
} from '@/services/api/dataApi'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import exampleImg from '../../../assets/images/pizza.jpg'
import editPencil from '../../../assets/icons/Admin/AdminSettings/editPencil.svg'

const AccountSettings = () => {
  const [activeRestData, setActiveRestData] = useState(null)
  const [activeHotelData, setActiveHotelData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isActivePopup, setIsActivePopup] = useState(false)
  const [isActiveLocalPhoto, setIsActiveLocalPhoto] = useState(false)
  const queryClient = useQueryClient()
  const fileInputRef = useRef(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('page') === 'profile-settings') {
      setIsActivePopup(true)
    } else {
      setIsActivePopup(false)
    }
  }, [searchParams.get('page')])

  const { _, isLoading } = useQuery('userList', () => UserList(), {
    onSuccess: (data) => {
      if (data) {
        setActiveRestData(data?.data)
      }
    },
  })

  const { __, isLoading: isLoading2 } = useQuery(
    'hoteUserList',
    () => GetHotelUserInfo(),
    {
      onSuccess: (data) => {
        if (data) {
          setActiveHotelData(data?.data)
        }
      },
    }
  )

  const mutationUser = useMutation((data) => UserUpdatePatch(data), {
    onError: () => {
      toast.success('Saved user information...')
      router.back()
      queryClient.invalidateQueries(['user'])
    },
    onSuccess: () => {
      toast.error('Oops, something went wrong!')
    },
  })

  const { mutate: saveHotelProfileInfo } = useMutation(
    (data) => HotelUserUpdate(data),
    {
      onSuccess: () => {
        toast.error('Oops, something went wrong!')
      },
      onError: () => {
        toast.success('Saved user information...')
        queryClient.invalidateQueries(['hotelUser'])
      },
    }
  )

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const updatedObject = { ...activeRestData }
      updatedObject.profile_photo = file
      setActiveRestData(updatedObject)
      setActiveHotelData(updatedObject)
      setIsActiveLocalPhoto(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      return
    }
  }

  const closeOverlay = (e) => {
    if (e.target.className.includes('popupOverlay')) {
      router.back()
    }
  }

  const restHandle = (e) => {
    const updatedObject = { ...activeRestData }
    updatedObject.first_name = e.target.value
    setActiveHotelData(updatedObject)
    setActiveRestData(updatedObject)
  }

  const restHandleAdress = (e) => {
    const updatedObject = { ...activeRestData }
    updatedObject.address = e.target.value
    setActiveHotelData(updatedObject)
    setActiveRestData(updatedObject)
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof activeRestData.profile_photo === 'object') {
      mutationUser.mutate(activeRestData)
      return
    } else {
      const { profile_photo, ...newActiveRestData } = activeRestData
      mutationUser.mutate(newActiveRestData)
    }
    if (Cookies.get('login_type') === 'isHotel') {
      saveHotelProfileInfo(activeHotelData)
    }
  }



  return (
    <div
      onClick={closeOverlay}
      className={` popupOverlay ${isActivePopup ? styles.overlay : null}`}
    >
      <div
        className={`${isActivePopup ? styles.showPopup : styles.hiddenPopup
          } popup`}
      >
        <div className="w-[527px] p-[12px] flex flex-col bg-white rounded-[8px] z-[99999999]">
          <div className="flex items-center justify-center h-[174px] w-full relative">
            {/* <Image
              className="w-full h-full object-cover rounded-[2px]"
              alt="exampleImg"
              src={exampleImg}
              width={500}
              height={500}
              loading="lazy"
            /> */}
            <>
              {isLoading || isLoading2 ? (
                <Skeleton
                  circle
                  width={140}
                  height={145}
                  containerClassName="avatar-skeleton"
                />
              ) : !activeRestData?.profile_photo &&
                !activeHotelData?.profile_photo ? (
                <Image
                  className="w-[100px]  h-[100px] object-cover absolute"
                  alt="user"
                  src={user}
                  style={{ objectFit: 'contain' }}
                  width={500}
                  height={500}
                  loading="lazy"
                />
              ) : activeRestData?.profile_photo && !selectedImage ? (
                <Image
                  className="w-[100px]  h-[100px] object-cover rounded-[50%] border-white border absolute"
                  alt="download"
                  src={activeRestData?.profile_photo}
                  style={{ objectFit: 'cover' }}
                  width={500}
                  loading="eager"
                  height={500}
                />
              ) : activeHotelData?.profile_photo && !selectedImage ? (
                <Image
                  className="w-[100px]  h-[100px] object-cover rounded-[50%] border-white border absolute"
                  alt="download"
                  src={activeHotelData?.profile_photo}
                  style={{ objectFit: 'cover' }}
                  width={500}
                  loading="eager"
                  height={500}
                />
              ) : (
                <Image
                  className="w-[100px]  h-[100px] object-cover rounded-[50%] border-white border absolute"
                  alt="download"
                  src={selectedImage ? selectedImage : download}
                  style={{ objectFit: 'cover' }}
                  width={500}
                  loading="eager"
                  height={500}
                />
              )}
            </>
            <div
              name="profile_photo"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
              className={`${styles.fileUpload} w-[40px] cursor-pointer hover:scale-105 ease-in duration-300 h-[36px] bg-white rounded-[50%] p-1 absolute`}
            >
              <Image
                className="w-[200px]"
                alt="exampleImg"
                src={editPencil}
                width={500}
                height={500}
                loading="lazy"
              />
              <input id="file-upload" type="file" />
            </div>
          </div>
          <div className="w-full mt-[12px] flex flex-col gap-[40px]">
            <div className={styles.paragraph}>
              <h1>Restaurant Name</h1>
              <h3>{activeRestData?.first_name}</h3>
            </div>
          </div>
          {/* <div className="w-full mt-[12px] flex flex-col gap-[40px]">
            <div className={styles.paragraph}>
              <h1>Restaurant Address</h1>
              <input
                name="address"
                onChange={(e) => restHandleAdress(e)}
                value={
                  activeRestData?.address
                    ? activeRestData?.address
                    : activeHotelData?.address
                }
                type="text"
                placeholder="Address"
              />
            </div>
          </div> */}
          <button
            onClick={(e) => handleSubmit(e)}
            className={styles.saveButton}
          >
            Yadda Saxla
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings

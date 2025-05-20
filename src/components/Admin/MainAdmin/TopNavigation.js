'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import userProfile from '../../../assets/icons/Admin/mainAdmin/user.png'
import polygon from '../../../assets/icons/Admin/ProfileAccount/polygon.svg'
import { useDispatch } from 'react-redux'
import { handleSidebar } from '@/redux/features/adminSidebarSlice'
import ProfileToggleBar from '../ProfileToggleBar/ProfileToggleBar'
import { handleToggleBar } from '@/redux/features/adminProfileBarSlice'
import { useQuery } from 'react-query'
import { GetRestaurantListFromHotel, UserList } from '@/services/api/dataApi'
import Skeleton from 'react-loading-skeleton'
import Cookies from 'js-cookie'
import styles from './TopNavigation.module.css'

const page = () => {
  const [isActiveRest, setIsActiveRest] = useState(
    Cookies.get('hotel-rest-username')
  )
  const dispatch = useDispatch()

  const { data, isLoading } = useQuery(['user'], UserList)
  const { data: hotelRestaurantList } = useQuery(
    ['hotel-restaurant-list'],
    () => GetRestaurantListFromHotel(Cookies.get('restaurant_username')),
    { enabled: Cookies.get('user-type') === 'hotel' }
  )

  const handleChangeRest = (rest_username) => {
    setIsActiveRest(rest_username)
    Cookies.set('hotel-rest-username', rest_username)
    location.reload()
  }

  const pathname = usePathname()
  const isFeedbackPage = pathname.includes('/feedback')

  return (
    <>
      <nav className="navbar flex justify-between items-center">
        <div className="flex justify-between items-center gap-[100px]">
          <div
            className="ms-aside-toggler ms-toggler pl-0"
            onClick={() => dispatch(handleSidebar())}
          >
            <span
              className={`ms-toggler-bar ${isFeedbackPage ? 'bg-[#1877f2]' : 'bg-primary'
                }`}
            />
            <span
              className={`ms-toggler-bar ${isFeedbackPage ? 'bg-[#1877f2]' : 'bg-primary'
                }`}
            />
            <span
              className={`ms-toggler-bar ${isFeedbackPage ? 'bg-[#1877f2]' : 'bg-primary'
                }`}
            />
          </div>
          <div className="flex gap-2 items-center">
            {hotelRestaurantList?.data?.results?.map((item, i) => (
              <button
                key={i}
                onClick={() => handleChangeRest(item?.username)}
                className={`${isActiveRest === item?.username
                  ? styles.topMenuButton_selected
                  : styles.topMenuButton_disabled
                  } ${isFeedbackPage && '!bg-[#1877f2]'}`}
              >
                {item?.username}
              </button>
            ))}
          </div>
        </div>
        <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">
          <li className="cursor-pointer ms-nav-item ms-nav-user dropdown">
            {isLoading ? (
              <Skeleton
                circle
                width={40}
                height={40}
                containerClassName="avatar-skeleton"
              />
            ) : data?.data?.profile_photo ? (
              <div
                onClick={() => dispatch(handleToggleBar())}
                className="flex gap-3"
              >
                <Image
                  onClick={() => dispatch(handleToggleBar())}
                  src={
                    data?.data?.profile_photo
                      ? data?.data?.profile_photo
                      : userProfile
                  }
                  width={40}
                  height={40}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50px',
                  }}
                  alt="profile-user"
                />
                <Image src={polygon} alt="polygon" />
              </div>
            ) : (
              <Image
                onClick={() => dispatch(handleToggleBar())}
                src={userProfile}
                width={40}
                height={40}
                style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                alt="profile-user"
              />
            )}
          </li>
        </ul>
        <ProfileToggleBar />
      </nav>
    </>
  )
}

export default page

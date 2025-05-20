import Image from 'next/image'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import styles from './ThanksPopUp.module.css'
import popUpAreYouSure from '../../../assets/images/Hotel/Vector.png'

const ThanksPopUp = ({ isActiveThanksPopUp, setActiveThanksPopUp }) => {
  const t = useTranslations('Home')

  useEffect(() => {
    if (isActiveThanksPopUp) {
      document.body.style.overflow = 'hidden'
      const timeoutId = setTimeout(() => {
        setActiveThanksPopUp(false)
      }, 1500)

      return () => clearTimeout(timeoutId)
    } else {
      document.body.style.overflow = ''
    }
  }, [isActiveThanksPopUp, setActiveThanksPopUp])
  return (
    <>
      {isActiveThanksPopUp && (
        <>
          <div
            className={`w-full left-0 right-0 z-[1000]  absolute inset-y-[30vh] opening-animation`}
          >
            <div
              className={`${styles.popUpAreYouSureContainer} relative px-[41px] pb-[34px] pt-[80px] rounded-[10px] bg-[#13C36F] flex flex-col justify-between items-center z-[1000]`}
            >
              <>
                <div className="relative top-[-80px] flex justify-center items-center">
                  <div
                    className={`${styles.blurylyBorder} flex items-center justify-center absolute h-[100px] w-[100px] bg-[#fff] border-solid border-[#fff] border-[3.3px] border-opacity-40 rounded-[50%] p-[20px]`}
                  >
                    <Image
                      loading="eager"
                      src={popUpAreYouSure}
                      width={50}
                      height={50}
                      alt="Vector"
                    />
                  </div>
                </div>
                <h3 className="text-[#FFF] font-bold text-[32px] leading-normal">
                  Thank You
                </h3>
                <p className="font-normal text-[14px] leading-normal text-[#fff]">
                  Our staff will come to your room now
                </p>
              </>
            </div>
          </div>

          <div
            className={`fixed top-0 left-0 w-screen h-screen z-[999] ${styles.backgroundBlur}`}
          />
        </>
      )}
    </>
  )
}
export default ThanksPopUp

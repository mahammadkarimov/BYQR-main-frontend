import React from 'react'
import Image from 'next/image'
import XmarkIcon from '../../../../assets/icons/Feedback/Xmark.svg'
import styles from './Xmark.module.css'
import { usePathname, useRouter } from 'next/navigation'

const Xmark = (props) => {
  const { xmarkContainer } = props
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div onClick={() => router.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`)} className={` ${styles.xmarkContainer} ${xmarkContainer}`}>
      <Image
        className="rounded-full object-cover w-[24px] h-[24px] sm:w-[36px] sm:h-[36px]"
        alt="Xmark"
        width={100}
        height={100}
        loading='lazy'
        src={XmarkIcon}
      />
    </div>
  )
}

export default Xmark

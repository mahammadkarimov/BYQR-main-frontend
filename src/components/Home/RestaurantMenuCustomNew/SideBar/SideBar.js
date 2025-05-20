import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import byqrLogo from '../../../../assets/images/Home/byqrLogo.svg'
import exitUser from '../../../../assets/icons/Home/exitUser.svg'
import fb from '../../../../assets/icons/Home/fb.svg'
import tiktok from '../../../../assets/icons/Home/tiktok.svg'
import instagram from '../../../../assets/icons/Home/instagram.svg'
import wp from '../../../../assets/icons/Home/wp.svg'
import close from '../../../../assets/icons/Home/closex.svg'
import Link from 'next/link'

const SideBar = ({ t, isActiveSidebar, setIsActiveSidebar, restaurantData, pathname, setIsActiveLang }) => {

    const handleContentClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div onClick={() => setIsActiveSidebar(false)} className={isActiveSidebar && styles.overlay}>
            <div className='relative' onClick={handleContentClick}>
                <div className={isActiveSidebar ? styles.container : styles.deactiveSidebar}>
                    <div className={styles.sideHead}>
                        <Image src={restaurantData?.data?.profile_photo} width={1000} height={1000} className='w-[68px] h-[68px] rounded-[4px]' alt='restaurant-logo' />
                        {/* <span>Welcome Asu,</span> */}
                    </div>
                    <div className={styles.sideNav}>
                        <nav>
                            <ul>
                                {/* <li>
                                    <Link href='#'>My account</Link>
                                </li> */}
                                <li>
                                    <button onClick={() => setIsActiveLang(true)}>{t('Language')}</button>
                                </li>
                                {(restaurantData?.data?.package?.name === 'gold' || restaurantData?.data?.package?.name === 'gold+' || restaurantData?.data?.package?.name === 'diamond') &&
                                    <li>
                                        <Link href={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}/feedback`}>{t('Give feedback')}</Link>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </div>
                    <div>
                        {/* <div className={styles.user}>
                            <Image src={exitUser} alt='user-exit' />
                            Login
                        </div> */}
                        <div className={styles.address}>
                            <span>
                                {restaurantData?.data?.address}
                            </span>
                        </div>
                    </div>
                    <div className={styles.socialContainer}>
                        {restaurantData?.data?.facebook &&
                            <Link target='_blank' href={restaurantData?.data?.facebook}>
                                <Image src={fb} alt='facebook' />
                            </Link>
                        }
                        {
                            restaurantData?.data?.instagram &&
                            <Link target='_blank' href={restaurantData?.data?.instagram}>
                                <Image src={instagram} alt='instagram' />
                            </Link>
                        }
                        {
                            restaurantData?.data?.tiktok &&
                            <Link target='_blank' href={restaurantData?.data?.tiktok}>
                                <Image width={18} height={18} src={tiktok} alt='tiktok' />
                            </Link>
                        }
                        {
                            restaurantData?.data?.whatsapp &&
                            <Link target='_blank' href={restaurantData?.data?.whatsapp}>
                                <Image src={wp} alt='whatsapp' />
                            </Link>
                        }
                    </div>
                    <div className={styles.close} onClick={() => setIsActiveSidebar(false)}>
                        <Image src={close} alt='close' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
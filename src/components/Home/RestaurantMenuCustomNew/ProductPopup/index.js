import React from 'react'
import agabalaBlack from '../../../../assets/images/Home/headerImgBg.jpg'
import share from '../../../../assets/icons/Home/share2.svg'
import fire from '../../../../assets/icons/Home/fire.svg'
import manat from '../../../../assets/icons/Home/manat.svg'
import styles from './style.module.css'
import Image from 'next/image'
import Slider from 'react-slick'
import "@/../slick-carousel/slick/slick.css";
import "@/../slick-carousel/slick/slick-theme.css";
import './style.css'

const index = () => {

    const settings = {
        dots: true,
        speed: 500,
        arrows: false,
        infinity: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        draggable: true,
        touchMove: true,
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContain}>
                <div>
                    <Slider {...settings}>
                        <Image src={agabalaBlack} alt='agabala' />
                        <Image src={agabalaBlack} alt='agabala' />
                        <Image src={agabalaBlack} alt='agabala' />
                    </Slider>
                    <div className={styles.topArea}>
                        <button>
                            <Image src={share} alt='share' />
                        </button>
                        <div>
                            +
                        </div>
                    </div>
                    <div>
                        <span>10 min</span>
                        <span>
                            <Image src={fire} alt='fire' />
                            256 kCal
                        </span>
                    </div>
                    <div></div>
                </div>
                <div>
                    <h2>Touyugun cigirdilmasi</h2>
                    <span>toyuq qisqirdilaraq bisirilir ve sobada servis edilir</span>
                    <div>
                        <div>
                            <Image className='inline w-6' src={manat} alt='manat' />
                            10
                        </div>
                        -
                        <div>
                            <Image className='inline w-6' src={manat} alt='manat' />
                            20
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
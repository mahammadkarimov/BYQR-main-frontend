'use client'
import React, { useEffect, useRef, useState } from 'react'
import arrow from '../../../../assets/icons/Home/arrow.svg'
import share from '../../../../assets/icons/Home/share.svg'
import favHeart from '../../../../assets/icons/Home/favHeart.svg'
import plus from '../../../../assets/icons/Home/plus.svg'
import manat from '../../../../assets/icons/Home/manat.svg'
import calories from '../../../../assets/icons/Home/calories.svg'
import styles from './style.module.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image'
import Slider from 'react-slick'
import "@/../slick-carousel/slick/slick.css";
import "@/../slick-carousel/slick/slick-theme.css";
import './style.css'

const ProductModal = ({ router, productDetail, isLoading, setIsActiveShareModal }) => {
    const modalBottomRef = useRef(null)
    const productImgRef = useRef(null)

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

    useEffect(() => {
        AOS.init();
        window.addEventListener('scroll', () => {
            var scrollPosition = window.scrollY || window.pageYOffset;
            const brightnessPercent = scrollPosition / 150
            const brightnessScale = scrollPosition / 500
            if (productImgRef.current && modalBottomRef.current) {
                // productImgRef.current.style.transform = `scale(${1 + brightnessScale})`
                productImgRef.current.style.filter = `brightness(${1 - brightnessPercent})`
                modalBottomRef.current.style.top = `${scrollPosition}px`
            }
        })
    }, [])

    if (isLoading) {
        return null
    }

    return (
        <div className='relative'>
            <div className={styles.modalButtons}>
                <div className={styles.modalImgTop}>
                    <div className={styles.leftArr} onClick={() => router.back()}>
                        <Image src={arrow} alt='left-arrow' width={14} height={14} />
                    </div>
                    <div className={styles.rightShare} onClick={() => setIsActiveShareModal(true)}>
                        <Image src={share} alt='share' width={14} height={14} />
                    </div>
                </div>
            </div>
            <div ref={productImgRef} className={styles.productImg}>
                {!isLoading &&
                    <Slider {...settings}>
                        {productDetail?.data?.images?.map((el) => (
                            <div key={el.id}>
                                <img src={el?.image} sizes="100vw" style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                    alt='product-image' />
                            </div>
                        ))}
                        {
                            productDetail?.data?.video &&
                            <video width="320" height="240" controls>
                                <source src={productDetail?.data?.video} type="video/mp4" />
                                Tarayıcınız bu videoyu oynatmayı desteklemiyor.
                            </video>
                        }
                    </Slider>
                }
                <div className='flex items-center'>
                {
                    productDetail?.data?.etp &&
                    <div data-aos="fade-up" data-aos-delay="100" className={styles.minute}>
                        <span>{productDetail?.data?.etp} min</span>
                    </div>
                }
                {
                    productDetail?.data?.calorie &&
                    <div data-aos="fade-up" data-aos-delay="100" className={styles.calorie}>
                        <Image src={calories} alt='calorie' />
                        <span>{productDetail?.data?.calorie} kcal</span>
                    </div>
                }
                </div>
            </div>
            <div className={styles.modalBottom} ref={modalBottomRef}>
                <div className='flex items-start justify-between mb-[14px]'>
                    <div className={styles.detailHead}>
                        <h3>{productDetail?.data?.name}</h3>
                        <span>{productDetail?.data?.ingredient}</span>
                        {(productDetail?.data?.sizes[0]?.price && productDetail?.data?.sizes[1]?.price)
                            ?
                            <div>{productDetail?.data?.sizes[0]?.price}{productDetail?.data?.currency[0]?.name === 'tenqe' ? <span className={`${styles.manat} pl-1`}>₸</span> : <Image className='inline w-6' src={manat} alt='manat' />} - {productDetail?.data?.sizes[productDetail?.data?.sizes?.length - 1].price}{productDetail?.data?.currency[0]?.name === 'tenqe' ? <span className={`${styles.manat} pl-1`}>₸</span> : <Image className='inline w-6' src={manat} alt='manat' />}</div>
                            :
                            <div>{productDetail?.data?.price}{productDetail?.data?.currency[0]?.name === 'tenqe' ? <span className={`${styles.manat} pl-1`}>₸</span> : <Image className='inline w-6' src={manat} alt='manat' />}</div>
                        }
                    </div>
                    {/* <div className={styles.favBtn}>
                        <Image src={favHeart} alt='favorite' />
                        <span>3</span>
                    </div> */}
                </div>
                <div>
                    {/* <div className={styles.reviewBtn}>
                        <span>Doesn't have any review yet</span>
                        <div>
                            <span>Add Review</span>
                            <Image src={plus} alt='plus' />
                        </div>
                    </div> */}
                    <div className='flex flex-col gap-[14px]'>
                        {productDetail?.data?.sizes?.map((size) => (
                            (size?.price && size?.size) &&
                            <div className={styles.mealSize} key={size?.id}>
                                <span>{size?.size}</span>
                                <span>{size?.price}{productDetail?.data?.currency[0]?.name === 'tenqe' ? <span className={`${styles.manat} pl-1`}>₸</span> : <Image className='inline w-6' src={manat} alt='manat' />}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductModal
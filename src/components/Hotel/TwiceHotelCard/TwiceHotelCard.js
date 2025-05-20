'use client'
import { colors } from '@/styles/color/colors'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../common/TwiceCards/TwiceCards.module.css'

import manat from '../../../assets/icons/Home/manat.svg'
import {
    handleScrollCategoryId,
    handleScrollIndex,
    selectProductSlug,
} from '@/redux/features/categorySlugSlice'
import { useDispatch, useSelector } from 'react-redux'
import DeliveryMinute from '../../common/DeliveryMinute/DeliveryMinute'
import { handleMainCategoryID } from '@/redux/features/scrollSlice'
import StarPriceContent from '@/components/common/StarPriceContent/StarPriceContent'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const TwiceCards = (props) => {
    const { service, index } = props
    const dispatch = useDispatch()
    const router = useRouter();

    const handleGetProductSlug = (product) => {
        router.push(`?service=${product.slug}`)
        dispatch(selectProductSlug(product))
    }

    return (
        <>
            <div
                style={{ border: ' 1px solid var(--Soft-Grey, #EDF1F8', borderRadius: '16px', paddingBottom: '16px' }}
                data-index={index}
                key={index}
                id={service?.id}
            >
                <>
                    <div
                        onClick={() => handleGetProductSlug(service)}
                        key={index}
                    >
                        <div className="relative ">
                            <Image
                                width={100}
                                height={100}
                                className={styles.productImage}
                                style={{ width: '100%', height: '128px' }}
                                src={service?.photo}
                                alt="product_image"
                            />
                        </div>
                        <div className="flex justify-start pl-2.5 flex-col text-center">
                            <div
                                className={styles['cardText']}
                                style={{ fontSize: '14px !important' }}
                            >
                                <h2>
                                    {service?.title?.length > 14
                                        ? service?.title?.slice(0, 14) + '...'
                                        : service?.title}
                                </h2>
                            </div>
                            <div className="flex justify-between h-[20px] pr-3">
                                {/* <StarPriceContent
                                    justifyContent="start"
                                    price={service?.price}
                                    fontWeight="600"
                                    imageSize={24}
                                    imageSrc={manat}
                                /> */}
                                {/* {service?.etp && (
                                    <DeliveryMinute
                                        isTwiceCard="active"
                                        preparationTime={service?.etp}
                                        className={styles.deliveryMinute}
                                    />
                                )} */}
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default TwiceCards
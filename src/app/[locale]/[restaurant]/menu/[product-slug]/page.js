'use client'
import React, { useEffect, useState } from 'react'
import ProductModal from '@/components/Home/RestaurantMenu/ProductModal/ProductModal'
import { usePathname, useRouter } from 'next/navigation'
import { GetMealWithSlugQr } from '@/services/api/dataApi'
import './style.css'
import { useQuery } from 'react-query'
import ShareModal from '@/components/Home/RestaurantMenu/ShareModal/ShareModal'
import SuccessModal from '@/components/Home/RestaurantMenu/SuccessModal/SuccessModal'
import '../../style.css'

const page = ({ params }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isActiveShareModal, setIsActiveShareModal] = useState(false)
    const [previousScrollPosition, setPreviousScrollPosition] = useState(0)
    const [copied, setCopied] = useState(false);
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        document.body.className = localStorage.getItem('theme');
        document.body.className += (pathname.split('/')[1] === 'ar') ? ' rtl' : ' ltr';
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 200);

        return () => clearTimeout(timer); // Cleanup
    }, []);

    const { data: productDetail, isLoading } = useQuery(
        ['product-detail', params['product-slug']],
        () => GetMealWithSlugQr(params['product-slug'], pathname.split('/')[1]),
    )

    useEffect(() => {
        if (isActiveShareModal) {
            setPreviousScrollPosition(window.scrollY)
            document.body.style.position = 'fixed'
            document.body.style.top = `-${previousScrollPosition}px`
            document.body.style.width = '100%'
        } else {
            document.body.style.position = ''
            document.body.style.top = ''
            window.scrollTo(0, previousScrollPosition)
        }

        return () => {
            document.body.style.position = ''
            document.body.style.top = ''
        }
    }, [isActiveShareModal, previousScrollPosition])

    if (isLoading) {
        return null
    }
    return (
        <>
            <div>
                <div className={`content ${isLoaded ? 'loaded' : ''}`}>
                    <div className='max-w-xl mx-auto relative'>
                        <ProductModal pathname={pathname} setIsActiveShareModal={setIsActiveShareModal} isLoading={isLoading} productDetail={productDetail} router={router} />
                        <SuccessModal copied={copied} />
                    </div>
                </div>
                <ShareModal setCopied={setCopied} setIsActiveShareModal={setIsActiveShareModal} isActiveShareModal={isActiveShareModal} />
            </div>
        </>

    )
}

export default page
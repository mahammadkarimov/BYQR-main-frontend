import Image from 'next/image'
import React, { useState } from 'react'
import insta from '../../../../assets/icons/Home/insta.svg'
import wpred from '../../../../assets/icons/Home/wpred.svg'
import fbred from '../../../../assets/icons/Home/fbred.svg'
import link from '../../../../assets/icons/Home/link.svg'
import tiktok from '../../../../assets/icons/Home/tiktok.svg'
import Link from 'next/link'
import SuccessModal from '../../RestaurantMenu/SuccessModal/SuccessModal'

const SocialArea = ({ allData }) => {
    const [copied, setCopied] = useState(false);

    const copyUrlToClipboard = async () => {
        try {
            if (window.location.href) {
                await navigator.clipboard.writeText(window.location.href);
                // setIsActiveShareModal(false);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy the URL: ', err);
        }
    };
    return (
        <>
            <div className='pt-[44px] pb-[74px] flex gap-[14px] justify-center' id='socialAreaBtn'>
                {
                    allData?.data?.whatsapp &&
                    <Link target='_blank' href={allData?.data?.whatsapp}>
                        <Image width={26} height={26} src={wpred} alt='whatsapp' />
                    </Link>
                }
                {
                    allData?.data?.instagram &&
                    <Link target='_blank' href={allData?.data?.instagram}>
                        <Image width={26} height={26} src={insta} alt='instagram' />
                    </Link>
                }
                {
                    allData?.data?.tiktok &&
                    <Link target='_blank' href={allData?.data?.tiktok}>
                        <Image width={26} height={26} src={tiktok} alt='tiktok' />
                    </Link>
                }
                {
                    allData?.data?.facebook &&
                    <Link target='_blank' href={allData?.data?.facebook}>
                        <Image width={26} height={26} src={fbred} alt='facebook' />
                    </Link>
                }
                <button onClick={copyUrlToClipboard}>
                    <div className='p-1 rounded-full'>
                        <Image width={26} height={26} src={link} alt='link' />
                    </div>
                </button>
            </div>
            <SuccessModal copied={copied} />
        </>
    )
}

export default SocialArea
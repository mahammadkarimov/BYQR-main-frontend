import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import close from '../../../../assets/icons/Home/Close.svg'
import sms from '../../../../assets/icons/Home/sms.svg'
import wpBlack from '../../../../assets/icons/Home/wpBlack.svg'
import linkBlack from '../../../../assets/icons/Home/linkBlack.svg'
import { useTranslations } from 'next-intl'

const ShareModal = ({ isActiveShareModal, setIsActiveShareModal, setCopied }) => {
    const t = useTranslations('Home')
    const handleCloseModal = (e) => {
        if ((e.target.id).includes('overlay')) {
            setIsActiveShareModal(false)
        }
    }

    const copyUrlToClipboard = async () => {
        try {
            if (window.location.href) {
                await navigator.clipboard.writeText(window.location.href);
                setIsActiveShareModal(false);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy the URL: ', err);
        }
    };

    const handleWhatsAppRedirect = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${window.location.href}`;
        window.open(whatsappUrl, '_blank');
        setIsActiveShareModal(false)
    };

    const handleSmsAppRedirect = () => {
        const smsUrl = `sms:?body=${window.location.href}`
        window.open(smsUrl, '_blank');
        setIsActiveShareModal(false)
    }

    return (
        <div className={isActiveShareModal && styles.overlay} id='overlay' onClick={handleCloseModal}>
            <div className={isActiveShareModal ? styles.container : styles.deactive}>
                <div className={styles.head}>
                    <span>{t('Share with')}</span>
                    <div onClick={() => setIsActiveShareModal(false)}>
                        <Image src={close} alt='close' />
                    </div>
                </div>
                <div className={styles.socialContainer}>
                    <div>
                        <Image src={wpBlack} alt='whatsapp' onClick={handleWhatsAppRedirect} width={18} height={18} />
                    </div>
                    <div onClick={() => copyUrlToClipboard()}>
                        <Image src={linkBlack} alt='link' width={18} height={18} />
                    </div>
                    <div>
                        <Image src={sms} onClick={handleSmsAppRedirect} width={18} height={18} className='w-[16px] h-[16px]' alt='sms' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareModal
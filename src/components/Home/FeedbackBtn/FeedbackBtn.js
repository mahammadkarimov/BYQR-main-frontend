import Image from 'next/image'
import React from 'react'
import feedbackSmile from '../../../assets/icons/Home/feedbackSmile.svg'
import styles from './feedbackbtn.module.css'
import { useTransform, motion, useScroll } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const FeedbackBtn = () => {
    const { scrollY } = useScroll()
    const isMaxH600 = useMediaQuery({ maxHeight: 600 })
    const router = useRouter()
    const pathname = usePathname()
    const width = useTransform(scrollY, [0, 300], [140, 0])
    const height = useTransform(scrollY, [0, 300], [68, 0])
    const heightIcon = useTransform(scrollY, [0, 300], [35, 0])
    const heightIconY600 = useTransform(scrollY, [0, 300], [28, 0])
    const opacity = useTransform(scrollY, [0, 150], [1, 0])

    const t = useTranslations('Home')

    return (
        <>
            <motion.button
                onClick={() => router.push(`${pathname}/feedback`)}
                className={styles.feedBackBtn}
                style={{ opacity, height, width }}
            >
                <motion.div className='flex items-center' style={{ height: isMaxH600 ? heightIconY600 : heightIcon }}>
                    <Image className={styles.feedbackSmile} src={feedbackSmile} alt="feedback-smile" />
                    {t('Feedback')}
                </motion.div>
            </motion.button>
        </>
    )
}

export default FeedbackBtn
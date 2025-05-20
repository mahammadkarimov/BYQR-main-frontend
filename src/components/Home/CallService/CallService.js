import { useDispatch } from 'react-redux'
import { handleService } from '@/redux/features/callServiceSlice'
import { useTranslations } from 'next-intl'
import styles from './callservice.module.css'
import Image from 'next/image'
import callService from '../../../assets/icons/Home/callService.png'
import { useTransform, motion, useScroll } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const CallService = () => {
  const { scrollY } = useScroll()
  const isMaxH600 = useMediaQuery({ maxHeight: 600 })

  const width = useTransform(scrollY, [0, 300], ['33.3%', '0%']);
  const height = useTransform(scrollY, [0, 300], [68, 0])
  const heightIcon = useTransform(scrollY, [0, 300], [35, 0])
  const heightIconY600 = useTransform(scrollY, [0, 300], [28, 0])
  const opacity = useTransform(scrollY, [0, 150], [1, 0])

  const dispatch = useDispatch()
  const t = useTranslations('Home')

  const handleClick = () => {
    dispatch(handleService(true))
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        className={`${styles.serviceCard}`}
        style={{ opacity, height, width }}
      >
        <motion.div style={{ height: isMaxH600 ? heightIconY600 : heightIcon }}>
          <Image src={callService} width={30} height={30} alt="call-service" />
        </motion.div>
        <p className={styles.callServiceText}>{t('Call Service')}</p>
      </motion.button>
    </>
  )
}
export default CallService

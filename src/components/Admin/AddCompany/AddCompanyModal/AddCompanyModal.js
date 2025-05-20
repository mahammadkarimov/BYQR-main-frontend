import React, { useRef, useState } from 'react'
import styles from './style.module.css'
import x from '../../../../assets/icons/Admin/Entry/x.svg'
import upload from '../../../../assets/icons/Admin/Entry/upload.svg'
import Image from 'next/image'

const AddCompanyModal = ({ router, t, searchParams, createCampaign, restaurantCampaign, deleteRestCampaign, refetch2 }) => {
    const imgRef = useRef(null)
    const [isActiveImg, setIsActiveImg] = useState(restaurantCampaign?.data?.results[(restaurantCampaign?.data?.results)?.length - 1]?.cover ? true : false)
    const [imgPreview, setImgPreview] = useState(restaurantCampaign?.data?.results[(restaurantCampaign?.data?.results)?.length - 1]?.cover ? restaurantCampaign?.data?.results[(restaurantCampaign?.data?.results)?.length - 1]?.cover : upload)

    const handleSaveCampaign = () => {
        const file = imgRef.current.files[0]
        createCampaign({
            name: 'campaign',
            cover: file
        })
        refetch2()
    }

    const handleDelete = () => {
        deleteRestCampaign()
        refetch2()
    }

    const handleChangeImg = () => {
        const file = imgRef.current.files[0]
        if (file) {
            setIsActiveImg(true)
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgPreview(reader.result);
            });
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className={searchParams.get('modal') ? styles.modal : styles.deactive}>
            <div className={styles.modalhead}>
                <h3>{t('Campaigns')}</h3>
                <div onClick={() => router.back()}>
                    <Image src={x} alt='x' />
                </div>
            </div>
            <div className={styles.imgBg}>
                {isActiveImg ?
                    <Image src={imgPreview} className={styles.campaign} width={500} height={500} alt='upload' />
                    :
                    <Image src={imgPreview} width={500} height={500} alt='campaing' />
                }
                <input type="file" onChange={handleChangeImg} ref={imgRef} accept="image/*" />
            </div>
            <div className='flex justify-start gap-4 items-center flex-row-reverse'>
                <div className={styles.save} onClick={handleSaveCampaign}>
                    <button>{t('Save')}</button>
                </div>
                <div className={styles.delete} onClick={handleDelete}>
                    <button>
                        {t('Delete')}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AddCompanyModal
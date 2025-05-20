import React from 'react'
import styles from './style.module.css'

const InfoModal = ({ allData, t, searchParams, router }) => {
    const workingHours = Object.entries(allData?.data?.working_hours).map(([day, time]) => {
        return { day, ...time };
    });
    return (
        <>
            {searchParams.get('infomodal') &&
                <div className='w-full fixed z-20 inset-0'>
                    <div className={styles.infoModalContainer}>
                        <div>
                            <h2>{allData?.data?.first_name} {allData?.data?.last_name}</h2>
                            <button onClick={() => router.back()}>
                                +
                            </button>
                        </div>
                        <div>
                            <h3>{t('Address')}</h3>
                            <span>{allData?.data?.address}</span>
                        </div>
                        <div>
                            <h3>{t('Contact number')}</h3>
                            <span>{allData?.data?.phone_number}</span>
                            <div>
                                <h3>{t('Service fee')}</h3>
                                <span>%{allData?.data?.service_fee}</span>
                            </div>
                        </div>
                        <div>
                            <h3>{t('Working hours')}</h3>
                            {workingHours?.map((el) => (
                                <div>
                                    <span>{el?.day === 'monday' ? t('Bazar ertəsi')
                                        : el?.day === 'tuesday' ? t("Çərşənbə axşamı") : el?.day === 'wednesday' ? t('Çərşənbə') : el?.day === 'thursday' ? t("Cümə axşamı") : el?.day === 'friday' ? t('Cümə') : el?.day === 'saturday' ? t("Şənbə") : el?.day === 'sunday' ? t('Bazar') : null}</span>
                                    <span>{el?.start} - {el?.end}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>


    )
}

export default InfoModal
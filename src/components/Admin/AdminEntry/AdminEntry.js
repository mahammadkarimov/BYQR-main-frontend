import React from 'react'
import styles from './style.module.css'
import check from '../../../assets/icons/Admin/Entry/check.svg'
import rightArr from '../../../assets/icons/Admin/Entry/rightArr.svg'
import Image from 'next/image'
import AddCompany from '../AddCompany/AddCompany'
import AddCompanyModal from '../AddCompany/AddCompanyModal/AddCompanyModal'
import AddInfo from '../AddInfo/AddInfo'
import InfoModal from './InfoModal/InfoModal'

const AdminEntry = ({
  router,
  t,
  searchParams,
  pathname,
  createCampaign,
  restaurantCampaign,
  createInfo,
  restInfo,
  refetch,
  deleteRestCampaign,
  refetch2,
  putInfo,
  restInfo2,
  refetch3
}) => {
  return (
    <>
      <div className={styles.entryHead}>
        <h2>{t('Addition of restaurant information')}</h2>
        {(searchParams.get('company') || searchParams.get('info')) && (
          <button
            className={styles.backBtn}
            onClick={() => router.push(`/${pathname.split('/')[1]}/admin`)}
          >
            {t('Back')}
          </button>
        )}
      </div>
      <div>
        {searchParams.get('company') ? (
          <AddCompany t={t} router={router} pathname={pathname} />
        ) : searchParams.get('info') ? (
          <AddInfo
            t={t}
            refetch={refetch}
            router={router}
            pathname={pathname}
          />
        ) : (
          <>
            <div
              className={styles.entryCard}
              onClick={() => router.push('?company=true')}
            >
              <div className={styles.left}>
                <div className={styles.checkBg}>
                  <Image src={check} alt='check' />
                </div>
                <div className={styles.campanyText}>
                  <h3>{t('Easily add your campaigns')}</h3>
                  <span>
                    {t(
                      'You can share your weekly or daily campaigns with your customers'
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.checkBg}>
                <Image src={rightArr} alt='right-arr' />
              </div>
            </div>
            <div
              className={styles.entryCard}
              onClick={() => router.push('?info=true')}
            >
              <div className={styles.left}>
                <div className={styles.checkBg}>
                  <Image src={check} alt='check' />
                </div>
                <div className={styles.campanyText}>
                  <h3>{t('Information about your restaurants')}</h3>
                  <span>
                    {t(
                      'General information about the restaurant (address, social you can add network links)'
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.checkBg}>
                <Image src={rightArr} alt='right-arr' />
              </div>
            </div>
          </>
        )}
      </div>
      <AddCompanyModal
        t={t}
        refetch2={refetch2}
        deleteRestCampaign={deleteRestCampaign}
        restaurantCampaign={restaurantCampaign}
        createCampaign={createCampaign}
        searchParams={searchParams}
        router={router}
      />
      <InfoModal
        t={t}
        refetch3={refetch3}
        restInfo2={restInfo2}
        pathname={pathname}
        putInfo={putInfo}
        restInfo={restInfo}
        createInfo={createInfo}
        searchParams={searchParams}
        router={router}
      />
    </>
  )
}

export default AdminEntry

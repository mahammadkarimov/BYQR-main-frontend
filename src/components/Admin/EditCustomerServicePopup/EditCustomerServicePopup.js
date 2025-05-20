'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../components/AdminCommon/AdminLayout/AdminLayout'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  GetHotelCustomerServiceWithSlug,
  GetHotelServiceWithSlug,
  HotelCustomerServiceUpdate,
  HotelServiceUpdate
} from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const Page = () => {
  const [serviceData, setServiceData] = useState()
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [isActivePopup, setIsActivePopup] = useState(true)
  const [selectedImage, setSelectedImage] = useState([])
  const [photo, setPhoto] = useState(null)
  const router = useRouter()
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('Admin')

  useEffect(() => {
    if (searchParams.get('service') === 'edit-service') {
      setIsActivePopup(false)
    }
    const getServicePopup = async () => {
      const data = await GetHotelCustomerServiceWithSlug(
        searchParams.get('customer-service-slug')
      )
      let updatedObject = { ...serviceData }
      updatedObject.title_az = data?.data?.title_az
      updatedObject.title_en = data?.data?.title_en
      updatedObject.title_ru = data?.data?.title_ru
      updatedObject.title_tr = data?.data?.title_tr
      updatedObject.title_ar = data?.data?.title_ar
      updatedObject.photo = data?.data?.photo
      updatedObject.images = data?.data?.images
      updatedObject.etp = data?.data?.etp
      updatedObject.price = data?.data?.price
      updatedObject.description_az = data?.data?.description_az
      updatedObject.description_en = data?.data?.description_en
      updatedObject.description_ru = data?.data?.description_ru
      updatedObject.description_tr = data?.data?.description_tr
      updatedObject.description_ar = data?.data?.description_ar
      setServiceData(updatedObject)
    }
    getServicePopup()
    return () => {
      getServicePopup()
    }
  }, [searchParams.get('service')])

  const { mutate: updateCustomerService } = useMutation(
    data =>
      HotelCustomerServiceUpdate(
        data,
        searchParams.get('customer-service-slug')
      ),
    {
      onSuccess: () => {
        setIsActivePopup(true)
        setIsDisabledButton(false)
        router.push('?')
        toast.success(t('Edited successfully'))
        queryClient.invalidateQueries(['customer-service'])
      },
      onError: () => {
        setIsActivePopup(true)
        setIsDisabledButton(false)
        router.push('?')
        toast.error(t('Oops, Something went wrong!'))
      }
    }
  )

  const handleImageChange = event => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
      files.forEach(el => {
        if (!el.type.includes('video')) {
          setPhoto(el)
        }
      })
    }
    if (files.length > 0) {
      setSelectedImage(files)
    } else {
      return
    }
  }

  const handleSubmit = () => {
      updateCustomerService({
          title_az: serviceData?.title_az,
          title_en: serviceData?.title_en,
          title_ru: serviceData?.title_ru,
          title_ar: serviceData?.title_ar,
          title_tr: serviceData?.title_tr,
          photo: photo,
          images: selectedImage ? selectedImage : null,
          price: serviceData?.price,
          etp: serviceData?.etp,
          description_az: serviceData?.description_az,
          description_ru: serviceData?.description_ru,
          description_tr: serviceData?.description_tr,
          description_ar: serviceData?.description_ar,
          description_en: serviceData?.description_en
        })
  }

  const handleServiceName = e => {
    const updatedObject = { ...serviceData }
    updatedObject[`title_${searchParams.get('lang')}`] = e.target.value
    setServiceData(updatedObject)
  }
  const handleServicePrice = e => {
    const updatedObject = { ...serviceData }
    updatedObject.price = e.target.value
    setServiceData(updatedObject)
  }
  const handleServiceTime = e => {
    const updatedObject = { ...serviceData }
    updatedObject.etp = e.target.value
    setServiceData(updatedObject)
  }
  const handleServiceDescription = e => {
    const updatedObject = { ...serviceData }
    updatedObject[`description_${searchParams.get('lang')}`] = e.target.value
    setServiceData(updatedObject)
  }

  const handleClosePopup = e => {
    if (e.target.id === 'overlay') {
      setIsActivePopup(true)
      router.push('?')
    }
  }

  const handleChangeLang = e => {
    router.push(
      `?service=edit-service&customer-service-slug=${searchParams.get(
        'customer-service-slug'
      )}&lang=${e.target.value}`
    )
    Cookies.set('active-lang', e.target.value)
  }

  return (
    <div className={isActivePopup ? styles.deactivePopup : styles.activePopup}>
      <div onClick={handleClosePopup} id='overlay' className={styles.overlay}>
        <div
          id='content'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%]'
        >
          <div className='row w-[528px]'>
            <div>
              <div className='ms-panel ms-panel-fh'>
                <div className={styles.categoryHead}>
                  <h6>{t('Edit Service Form')}</h6>
                </div>
                <div className='ms-panel-body'>
                  <form
                    className='needs-validation clearfix'
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className='form-row'>
                      <div className='col-md-12 mb-2'>
                        <label
                          htmlFor='validationCustom18'
                          className={styles.label}
                        >
                          {t('Service Name')}
                        </label>
                        <div className={styles.categoryName}>
                          <input
                            type='text'
                            id='validationCustom18'
                            placeholder={t('Service Name')}
                            required
                            value={
                              serviceData?.[
                                `title_${searchParams.get('lang')}`
                              ] === null
                                ? ''
                                : serviceData?.[
                                    `title_${searchParams.get('lang')}`
                                  ]
                            }
                            onChange={handleServiceName}
                          />
                          <div className='valid-feedback'>
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                      <div className='col-md-12 mb-2'>
                        <label
                          htmlFor='validationCustom18'
                          className={styles.label}
                        >
                          {t('Service Time')}
                        </label>
                        <div className={styles.categoryName}>
                          <input
                            type='text'
                            id='validationCustom18'
                            placeholder={t('Service Time')}
                            required
                            value={serviceData?.etp}
                            onChange={handleServiceTime}
                          />
                          <div className='valid-feedback'>
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                      <div className='col-md-12 mb-2'>
                        <label
                          htmlFor='validationCustom18'
                          className={styles.label}
                        >
                          {t('Service Price')}
                        </label>
                        <div className={styles.categoryName}>
                          <input
                            type='text'
                            id='validationCustom18'
                            placeholder={t('Service Price')}
                            required
                            value={serviceData?.price}
                            onChange={handleServicePrice}
                          />
                          <div className='valid-feedback'>
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                      <div className='col-md-12 mb-2'>
                        <label
                          htmlFor='validationCustom18'
                          className={styles.label}
                        >
                          {t('Description')}
                        </label>
                        <div className={styles.categoryArea}>
                          <textarea
                            type='text'
                            id='validationCustom18'
                            placeholder={t('Description')}
                            required
                            value={
                              serviceData?.[
                                `description_${searchParams.get('lang')}`
                              ] === null
                                ? ''
                                : serviceData?.[
                                    `description_${searchParams.get('lang')}`
                                  ]
                            }
                            onChange={handleServiceDescription}
                          />
                          <div className='valid-feedback'>
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                      <div className='w-full mt-[12px] mb-4 flex flex-col gap-[40px]'>
                        <div className={styles.paragraph}>
                          <h1>Choose Upload Language</h1>
                          <select
                            onChange={handleChangeLang}
                            className='block w-64 p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            name='language'
                            id='lang'
                          >
                            <option
                              value='en'
                              selected={searchParams.get('lang') === 'en'}
                            >
                              EN
                            </option>
                            <option
                              value='az'
                              selected={searchParams.get('lang') === 'az'}
                            >
                              AZ
                            </option>
                            <option
                              value='ru'
                              selected={searchParams.get('lang') === 'ru'}
                            >
                              RU
                            </option>
                            <option
                              value='tr'
                              selected={searchParams.get('lang') === 'tr'}
                            >
                              TR
                            </option>
                            <option
                              value='ar'
                              selected={searchParams.get('lang') === 'ar'}
                            >
                              AR
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <label
                          className={styles.label}
                          htmlFor='validatedCustomFile'
                          style={{ marginBottom: '12px' }}
                        >
                          {t('Service Icon')}
                        </label>
                        <div className='custom-file'>
                          <input
                            type='file'
                            value={selectedImage}
                            multiple
                            accept='image/*,video/*'
                            className='custom-file-input'
                            id='validatedCustomFile'
                            onChange={handleImageChange}
                          />
                          <label
                            className='custom-file-label'
                            htmlFor='validatedCustomFile'
                          >
                            {selectedImage
                              ? selectedImage?.name?.slice(0, 10)
                              : t('Upload Images')}
                          </label>
                          <div className='invalid-feedback'>
                            Example invalid custom file feedback
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className='ms-panel-header new'>
                  <button
                    disabled={isDisabledButton}
                    className={styles.addBtn}
                    type='submit'
                    onClick={handleSubmit}
                  >
                    {t('Save')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

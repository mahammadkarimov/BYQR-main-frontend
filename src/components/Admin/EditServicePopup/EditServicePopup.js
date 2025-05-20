'use client'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import {
  GetHotelServiceWithSlug,
  HotelServiceUpdate,
  getTechnicalServiceHotel,
} from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [serviceData, setServiceData] = useState()
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [isActivePopup, setIsActivePopup] = useState(true)
  const [selectedImage, setSelectedImage] = useState()
  const router = useRouter()
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('Admin')

  useEffect(() => {
    if (searchParams.get('service') === 'edit-technical-service') {
      setIsActivePopup(false)
    }
    const getServicePopup = async () => {
      const data = await getTechnicalServiceHotel(
        searchParams.get('service-slug')
      )
      console.log(data)
      let updatedObject = { ...serviceData }
      updatedObject.title_az = data?.data?.title_az
      updatedObject.title_tr = data?.data?.title_tr
      updatedObject.title_en = data?.data?.title_en
      updatedObject.title_ru = data?.data?.title_ru
      updatedObject.title_ar = data?.data?.title_ar
      updatedObject.icon = data?.data?.icon
      updatedObject.order_number = data?.data?.order_number
      setServiceData(updatedObject)
    }
    getServicePopup()
    return () => {
      getServicePopup()
    }
  }, [searchParams.get('service')])

  const { mutate: updateService } = useMutation(
    (data) => HotelServiceUpdate(data, searchParams.get('service-slug')),
    {
      onSuccess: () => {
        setIsActivePopup(true)
        setIsDisabledButton(false)
        router.push('?')
        toast.success(t('Edited successfully'))
        queryClient.invalidateQueries(['service'])
      },
      onError: () => {
        setIsActivePopup(true)
        setIsDisabledButton(false)
        router.push('?')
        toast.error(t('Oops, Something went wrong!'))
      },
    }
  )

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
    } else {
      return
    }
  }

  const handleSubmit = () => {
    updateService({
      title_az: serviceData?.title_az,
      title_ru: serviceData?.title_ru,
      title_en: serviceData?.title_en,
      title_tr: serviceData?.title_tr,
      title_ar: serviceData?.title_ar,
      icon: selectedImage ? selectedImage : null,
      order_number: serviceData?.order_number,
    })
  }

  const handleChangeCategoryOrder = (e) => {
    const updatedObject = { ...serviceData }
    updatedObject.order_number = e.target.value
    setServiceData(updatedObject)
  }

  const setServiceName = (e) => {
    const updatedObject = { ...serviceData }
    updatedObject[`title_${searchParams.get('lang')}`] = e.target.value
    setServiceData(updatedObject)
  }

  const handleClosePopup = (e) => {
    if (e.target.id === 'overlay') {
      setIsActivePopup(true)
      router.push('?')
    }
  }

  const handleChangeLang = (e) => {
    router.push(`?service=edit-technical-service&service-slug=${searchParams.get('service-slug')}&lang=${e.target.value}`)
    Cookies.set('active-lang', e.target.value)
  }

console.log(serviceData)
  return (
    <div className={isActivePopup ? styles.deactivePopup : styles.activePopup}>
      <div onClick={handleClosePopup} id="overlay" className={styles.overlay}>
        <div
          id="content"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="row w-[458px]">
            <div>
              <div className="ms-panel ms-panel-fh">
                <div className={styles.categoryHead}>
                  <h6>{t('Edit Technical Service Form')}</h6>
                </div>
                <div className="ms-panel-body">
                  <form
                    className="needs-validation clearfix"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className="form-row">
                      <div className="col-md-12 mb-6">
                        <label
                          htmlFor="validationCustom18"
                          className={styles.label}
                        >
                          {t('Service Name')}
                        </label>
                        <div className={styles.categoryName}>
                          <input
                            type="text"
                            id="validationCustom18"
                            placeholder={t('Service Name')}
                            value={serviceData?.[`title_${searchParams.get('lang')}`] === null ? '' : serviceData?.[`title_${searchParams.get('lang')}`]}
                            required
                            onChange={setServiceName}
                          />
                          <div className="valid-feedback">
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-6">
                        <label
                          htmlFor="validationCustom18"
                          className={styles.label}
                        >
                          {t('Service Order')}
                        </label>
                        <div className={styles.categoryName}>
                          <input
                            type="text"
                            id="validationCustom18"
                            placeholder={t('Service Order')}
                            value={serviceData?.order_number}
                            required
                            onChange={(e) => handleChangeCategoryOrder(e)}
                          />
                          <div className="valid-feedback">
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-[12px] mb-4 flex flex-col gap-[40px]">
                        <div className={styles.paragraph}>
                          <h1>Choose Upload Language</h1>
                          <select
                            onChange={handleChangeLang}
                            className="block w-64 p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            name="language"
                            id="lang"
                          >
                            <option value="en" selected={searchParams.get('lang') === 'en'}>EN</option>
                            <option value="az" selected={searchParams.get('lang') === 'az'}>AZ</option>
                            <option value="ru" selected={searchParams.get('lang') === 'ru'}>RU</option>
                            <option value="tr" selected={searchParams.get('lang') === 'tr'}>TR</option>
                            <option value="ar" selected={searchParams.get('lang') === 'ar'}>AR</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label
                          className={styles.label}
                          htmlFor="validatedCustomFile"
                          style={{ marginBottom: '12px' }}
                        >
                          {t('Service Icon')}
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="validatedCustomFile"
                            onChange={handleImageChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="validatedCustomFile"
                          >
                            {selectedImage
                              ? selectedImage?.name?.slice(0, 10)
                              : t('Upload Images')}
                          </label>
                          <div className="invalid-feedback">
                            Example invalid custom file feedback
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="ms-panel-header new">
                  <button
                    disabled={isDisabledButton}
                    className={styles.addBtn}
                    type="submit"
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

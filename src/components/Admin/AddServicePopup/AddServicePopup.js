'use client'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CreateHotelCustomerService } from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const Page = () => {
  const [isActivePopup, setIsActivePopup] = useState(true)
  const [isDisabledButton, setIsDisabledButton] = useState(true)
  const [categoryName, setCategoryName] = useState('')
  const [etp, setEtp] = useState('')
  const [description, setDescription] = useState('')
  const [isActiveLang, setIsActiveLang] = useState('en')
  const [selectedImage, setSelectedImage] = useState([])
  const [categoryOrder, setCategoryOrder] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [customerService, setCustomerService] = useState({
    title_az: '',
    title_tr: '',
    title_ru: '',
    title_ar: '',
    title_en: '',
    description_az: '',
    description_tr: '',
    description_ru: '',
    description_ar: '',
    description_en: ''
  })
  const [categoryPriority, setCategoryPriority] = useState()
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams(null)
  const t = useTranslations('Admin')

  useEffect(() => {
    if (searchParams.get('service') === 'add-service') {
      setIsActivePopup(false)
    }
  }, [searchParams.get('service')])

  const { mutate: addService } = useMutation(
    data => CreateHotelCustomerService(data),
    {
      onSuccess: () => {
        setIsActivePopup(true)
        setIsDisabledButton(false)
        document.querySelectorAll('input').forEach(inp => (inp.value = ''))
        document.querySelector('textarea').value = ''
        router.push('?')
        toast.success(t('Add Category'))
        queryClient.invalidateQueries(['customer-service'])
      },
      onError: () => {
        setIsActivePopup(true)
        setIsDisabledButton(false)
        router.push('?')
        toast.error('Oops... Something went wrong!')
      }
    }
  )

  const handleServiceName = e => {
    const updatedObject = { ...customerService }
    updatedObject[`title_${isActiveLang}`] = e.target.value
    setCustomerService(updatedObject)
  }

  const handleDescription = e => {
    const updatedObject = { ...customerService }
    updatedObject[`description_${isActiveLang}`] = e.target.value
    setCustomerService(updatedObject)
  }

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
      setSelectedImage(prevMedia => [...(prevMedia || []), ...files])
      setIsDisabledButton(false)
    }
  }

  const handleChangeCategoryOrder = e => {
    setCategoryOrder(e.target.value)
  }

  const handleSubmit = () => {
    addService({
      ...customerService,
      images: selectedImage ? selectedImage : null,
      photo: photo,
      price: categoryOrder,
      etp: etp,
      description: description
    })
  }

  const handleChangeLang = e => {
    Cookies.set('active-lang', e.target.value)
    setIsActiveLang(e.target.value)
  }

  const handleClosePopup = e => {
    if (e.target.id === 'overlay') {
      setIsActivePopup(true)
      router.push('?')
    }
  }

  return (
    <div className={isActivePopup ? styles.deactivePopup : styles.activePopup}>
      <div onClick={handleClosePopup} id='overlay' className={styles.overlay}>
        <div
          id='content'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%]'
        >
          <div className='row w-[478px]'>
            <div>
              <div className='ms-panel ms-panel-fh'>
                <div className={styles.categoryHead}>
                  <h6>{t('Add Service Form')}</h6>
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
                            onChange={handleServiceName}
                            value={customerService[`title_${isActiveLang}`]}
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
                            onChange={e => setEtp(e.target.value)}
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
                            onChange={e => handleChangeCategoryOrder(e)}
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
                            onChange={handleDescription}
                            value={
                              customerService[`description_${isActiveLang}`]
                            }
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
                              selected={Cookies.get('active-lang') === 'en'}
                            >
                              EN
                            </option>
                            <option
                              value='az'
                              selected={Cookies.get('active-lang') === 'az'}
                            >
                              AZ
                            </option>
                            <option
                              value='ru'
                              selected={Cookies.get('active-lang') === 'ru'}
                            >
                              RU
                            </option>
                            <option
                              value='tr'
                              selected={Cookies.get('active-lang') === 'tr'}
                            >
                              TR
                            </option>
                            <option
                              value='ar'
                              selected={Cookies.get('active-lang') === 'ar'}
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
                            className='custom-file-input'
                            id='validatedCustomFile'
                            multiple
                            accept='image/*,video/*'
                            onChange={handleImageChange}
                          />
                          <label
                            className='custom-file-label'
                            htmlFor='validatedCustomFile'
                          >
                            {t('Upload Images')}
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
                    {t('Add')}
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

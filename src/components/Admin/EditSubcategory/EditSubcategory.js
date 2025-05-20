'use client'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  HotelRestMaincategoryList,
  MealCategoryList,
  MealSubCategoryRead,
  MealSubCategoryUpdate
} from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import styles from '../CategoryPopup/categorypopup.module.css'
import Cookies from 'js-cookie'

const Page = () => {
  const [subcategoryNameLang, setSubcategoryNameLang] = useState({})
  const [isActivePopup, setIsActivePopup] = useState(true)
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [subCategoryOrder, setSubCategoryOrder] = useState(null)
  const [mainCategorySlug, setMainCategorySlug] = useState(null)
  const [mainCategoryName, setMainCategoryName] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isImage, setIsImage] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('Admin')

  useEffect(() => {
    if (searchParams.get('edit-subcategory')) {
      setIsActivePopup(false)
    }
    const getSubCategory = async () => {
      if (searchParams.get('subcategory-slug')) {
        const data = await MealSubCategoryRead(
          searchParams.get('subcategory-slug'),
          pathname.split('/')[1]
        )
        setSubcategoryNameLang({
          name_az: data?.data?.name_az,
          name_en: data?.data?.name_en,
          name_ko: data?.data?.name_ko,
          name_ru: data?.data?.name_ru,
          name_ar: data?.data?.name_ar
        })

        setSelectedImage({ name: data?.data?.image })
        setSubCategoryOrder(data?.data?.order)
        setMainCategoryName(data?.data?.main_category?.name)
        setMainCategorySlug(data?.data?.main_category?.slug)
        setIsImage(data?.data?.is_image)
        setIsActive(data?.data?.is_active)
      }
    }
    getSubCategory()
    return () => {
      getSubCategory()
    }
  }, [searchParams.get('edit-subcategory')])

  const { data: HotelRestMainCategoryData } = useQuery(
    'hotel-rest-maincategory',
    HotelRestMaincategoryList
  )

  const { mutate: updateSubcategory } = useMutation(
    data => MealSubCategoryUpdate(data, searchParams.get('subcategory-slug')),
    {
      onSuccess: () => {
        setIsActivePopup(true)
        setIsDisabledButton(false)
        router.push('?')
        toast.success('Updated Subcategory!')
        queryClient.invalidateQueries(['subcategory'])
        router.push(`/${pathname.slice(1, 3)}/admin/categories`)
      },
      onError: error => {
        setIsDisabledButton(false)
        setIsActivePopup(true)
        router.push('?')
        toast.error(t('Oops, Something went wrong!'))
      }
    }
  )

  const handleChangeSubcategoryName = e => {
    const updatedObj = { ...subcategoryNameLang }
    updatedObj[`name_${searchParams.get('lang')}`] = e.target.value
    setSubcategoryNameLang(updatedObj)
  }

  const handleChangeMainCategorySlug = e => {
    const selectedMainCategorySlug =
      e.target.options[e.target.selectedIndex].getAttribute('data-id')
    setMainCategoryName(e.target.value)
    setMainCategorySlug(selectedMainCategorySlug)
  }

  const handleSubmit = () => {
    setIsDisabledButton(true)
    updateSubcategory({
      ...subcategoryNameLang,
      order: subCategoryOrder,
      image: selectedImage,
      main_category_slug: mainCategorySlug
        ? mainCategorySlug
        : HotelRestMainCategoryData?.data?.results[0]?.slug,
      is_image: isImage,
      is_active : isActive
    })
  }

  const handleClosePopup = e => {
    if (e.target.id === 'overlay') {
      setIsActivePopup(true)
      router.push('?')
    }
  }

  const handleChangeLang = e => {
    router.push(
      `?edit-subcategory=true&subcategory-slug=${searchParams.get(
        'subcategory-slug'
      )}&lang=${e.target.value}`
    )
    Cookies.set('active-lang', e.target.value)
  }

  const handleImageChange = event => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
    } else {
      return
    }
  }

  return (
    <div className={isActivePopup ? styles.deactivePopup : styles.activePopup}>
      <div onClick={handleClosePopup} id='overlay' className={styles.overlay}>
        <div
          id='content'
          className='w-[458px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        >
          <div className='row'>
            <div className='col-xl-12 col-md-12'>
              <div className='ms-panel ms-panel-fh w-[420px]'>
                <div className={styles.categoryHead}>
                  <h6>{t('Edit Subcategory Form')}</h6>
                </div>
                <div className='ms-panel-body'>
                  <form
                    className='needs-validation clearfix'
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className='form-row'>
                      <div className='col-md-12 mb-6'>
                        <label htmlFor='validationCustom18'>
                          {t('Subcategory Name')}
                        </label>
                        <div className={styles.categoryName}>
                          <input
                            type='text'
                            className='form-control'
                            id='validationCustom18'
                            placeholder={t('Category Name')}
                            required
                            value={
                              subcategoryNameLang?.[
                                `name_${searchParams.get('lang')}`
                              ] === null
                                ? ''
                                : subcategoryNameLang?.[
                                    `name_${searchParams.get('lang')}`
                                  ]
                            }
                            onChange={handleChangeSubcategoryName}
                          />
                          <div className='valid-feedback'>
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                      <div className='mb-6'>
                        <label
                          htmlFor='validationCustom18'
                          className={styles.label}
                        >
                          {t('Subcategory Order')}
                        </label>
                        <div className={styles.categoryName}>
                          <input
                            type='text'
                            className='form-control'
                            id='validationCustom18'
                            placeholder={t('Category Order')}
                            required
                            value={subCategoryOrder}
                            onChange={e => setSubCategoryOrder(e.target.value)}
                          />
                          <div className='valid-feedback'>
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                      <div className='mb-4'>
                        <label className={styles.label} for='categories'>
                          Hansı Əsas Kateqoriyaya Aiddir?
                        </label>
                        <select
                          id='categories'
                          value={mainCategoryName}
                          onChange={e => handleChangeMainCategorySlug(e)}
                          className='bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                          {HotelRestMainCategoryData?.data?.results?.map(
                            (mainCategory, i) => (
                              <option key={i} data-id={mainCategory.slug}>
                                {mainCategory[`name_${pathname.split('/')[1]}`]}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={isImage}
                          onChange={(e) => setIsImage(e.target.checked)}
                          id='toggle'
                          className={styles.checkbox}
                        />
                        <label htmlFor='toggle' className={styles.switch}></label>
                        <span>{t('isImage')}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          id='toggle'
                          className={styles.checkbox}
                        />
                        <label htmlFor='toggle' className={styles.switch}></label>
                        <span>{t('isActive')}</span>
                      </div>
                      <button
                        onClick={e => {
                          e.preventDefault()
                          setSelectedImage('')
                        }}
                        className='bg-red px-4 py-1 text-white mb-2'
                      >
                        Sil
                      </button>{' '}
                      <div className='custom-file'>
                        <input
                          type='file'
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
                              value='ko'
                              selected={searchParams.get('lang') === 'ko'}
                            >
                              KO
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
                    </div>
                  </form>
                </div>
                <div className='ms-panel-header !pt-0'>
                  <button
                    disabled={isDisabledButton}
                    type='submit'
                    className={styles.addBtn}
                    onClick={handleSubmit}
                  >
                    {t('Edit')}
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

'use client'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { MealCategoryRead, MealCategoryUpdate } from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import Cookies from 'js-cookie'

const page = () => {
    const [isActivePopup, setIsActivePopup] = useState(true)
    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [activeCategorySlug, setActiveCategorySlug] = useState('')
    const [categoryData, setCategoryData] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const router = useRouter()
    const queryClient = useQueryClient()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const t = useTranslations('Admin')

    useEffect(() => {
        if (searchParams.get('edit-category')) {
            setIsActivePopup(false)
        }
        const getCategory = async () => {
            const data = await MealCategoryRead(searchParams.get('category-slug'))
            console.log(data)
            const updatedObject = { ...categoryData }
            updatedObject.name_az = data?.data?.name_az
            updatedObject.name_en = data?.data?.name_en
            updatedObject.name_ko = data?.data?.name_ko
            updatedObject.name_ru = data?.data?.name_ru
            updatedObject.name_ar = data?.data?.name_ar
            updatedObject.icon = data?.data?.icon
            updatedObject.order = data?.data?.order
            updatedObject.is_active = data?.data?.is_active
            setCategoryData(updatedObject)
        }
        getCategory()

        return () => {
            getCategory()
        }
    }, [searchParams.get('edit-category')])


    const { mutate: updateCategory } = useMutation((data) => MealCategoryUpdate(data, searchParams.get('category-slug')), {
        onSuccess: () => {
            setIsActivePopup(true)
            setIsDisabledButton(false)
            router.push('?')
            toast.success(t('Edited successfully'))
            queryClient.invalidateQueries(['category'])
        },
        onError: () => {
            setIsDisabledButton(false)
            setIsActivePopup(true)
            router.push('?')
            toast.error(t('Oops, Something went wrong!'))
        },
    })

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setSelectedImage(file)
        } else {
            return
        }
    }

    const handleSubmit = () => {
        setIsDisabledButton(true)
        if (selectedImage) {
            const updatedObj = { ...categoryData }
            updatedObj.icon = selectedImage
            updateCategory(updatedObj)
        } else {
            const updatedObj = { ...categoryData }
            updatedObj.icon = null
            updateCategory(updatedObj)
        }
    }

    const handleChangeCategoryName = (e) => {
        const updatedObject = { ...categoryData }
        updatedObject[`name_${searchParams.get('lang')}`] = e.target.value
        setCategoryData(updatedObject)
    }

    const handleChangeCategoryOrder = (e) => {
        const updatedObject = { ...categoryData }
        updatedObject.order = e.target.value
        setCategoryData(updatedObject)
    }

    const handleClosePopup = (e) => {
        if (e.target.id === 'overlay') {
            setIsActivePopup(true)
            router.push('?')
        }
    }

    const handleChangeLang = (e) => {
        router.push(`?edit-category=true&category-slug=${searchParams.get('category-slug')}&lang=${e.target.value}`)
        Cookies.set('active-lang', e.target.value)
    }

    return (
        <div className={isActivePopup ? styles.deactivePopup : styles.activePopup}>
            <div onClick={handleClosePopup} id='overlay' className={styles.overlay}>
                <div id='content' className='w-[458px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className="row">
                        <div className="col-xl-12 col-md-12">
                            <div className="ms-panel ms-panel-fh">
                                <div className={styles.categoryHead}>
                                    <h6>{t('Edit Category Form')}</h6>
                                </div>
                                <div className="ms-panel-body">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="needs-validation clearfix"
                                        noValidate
                                    >
                                        <div className="form-row">
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18">
                                                    {t('Category Name')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom18"
                                                        placeholder={t('Category Name')}
                                                        required
                                                        value={categoryData?.[`name_${searchParams.get('lang')}`] === null ? '' : categoryData?.[`name_${searchParams.get('lang')}`]}
                                                        onChange={handleChangeCategoryName}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18" className={styles.label}>
                                                    {t('Category Order')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom18"
                                                        placeholder={t('Category Order')}
                                                        required
                                                        value={categoryData?.order}
                                                        onChange={(e) => handleChangeCategoryOrder(e)}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                <input id="default-checkbox" type="checkbox" value="" checked={categoryData?.is_active} onChange={(e) => {
                                                    const uptCategory = {...categoryData} 
                                                    uptCategory.is_active = e.target.checked
                                                    setCategoryData(uptCategory)
                                                }} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('In Stock')}</label>
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
                                                        <option value="ko" selected={searchParams.get('lang') === 'ko'}>KO</option>
                                                        <option value="ar" selected={searchParams.get('lang') === 'ar'}>AR</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <label
                                                    htmlFor="validationCustom12"
                                                    style={{ marginBottom: '12px' }}
                                                >
                                                    {t('New Category Icon')}
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
                                                            ? (selectedImage?.name)?.slice(0, 10)
                                                            : t('Upload Images')
                                                        }
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
                                        onClick={handleSubmit}
                                        className={styles.addBtn}
                                        type="submit"
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

export default page

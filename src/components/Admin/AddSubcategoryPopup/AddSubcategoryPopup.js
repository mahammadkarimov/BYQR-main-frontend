'use client'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { HotelRestMaincategoryList, MealCategoryList, MealSubCategoryCreate } from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

const Page = () => {
    const [isActivePopup, setIsActivePopup] = useState(true)
    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [subCategoryOrder, setSubCategoryOrder] = useState(null)
    const [mainCategoryName, setMainCategoryName] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [isActiveLang, setIsActiveLang] = useState('en')
    const [subcategoryNameLang, setSubcategoryNameLang] = useState({
        name_az: '',
        name_ko: '',
        name_ru: '',
        name_ar: '',
        name_en: '',
    })
    const [isImage, setIsImage] = useState(true)
    const [isActive, setIsActive] = useState(true)
    const queryClient = useQueryClient()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const t = useTranslations('Admin')

    useEffect(() => {
        if (searchParams.get('category') === 'add-subcategory') {
            Cookies.set('active-lang', 'en')
            setIsActivePopup(false)
        }
    }, [searchParams.get('category')])

    const { data: HotelRestMainCategoryData } = useQuery('hotel-rest-maincategory', HotelRestMaincategoryList)

    const { mutate: createSubcategory } = useMutation((data) => MealSubCategoryCreate(data), {
        onSuccess: () => {
            setIsActivePopup(true)
            setIsDisabledButton(false)
            setSubcategoryNameLang({
                name_az: '',
                name_ko: '',
                name_ru: '',
                name_ar: '',
                name_en: '',
            })
            // document.querySelectorAll('input').forEach((inp) => inp.value = '')
            router.push('?')
            toast.success('Created Subcategory!')
            queryClient.invalidateQueries(['subcategory'])
            router.push(`/${pathname.slice(1, 3)}/admin/categories`)
        },
        onError: (error) => {
            setIsActivePopup(true)
            setIsDisabledButton(false)
            router.push('?')
        },
    })

    const handleSubCategoryName = (e) => {
        const updatedObject = { ...subcategoryNameLang }
        updatedObject[`name_${isActiveLang}`] = e.target.value
        setSubcategoryNameLang(updatedObject)
    }

    const handleChangeMainCategory = (e) => {
        setMainCategoryName(e.target.value)
    }

    const handleSubmit = () => {
        setIsDisabledButton(true)
        createSubcategory({
            ...subcategoryNameLang,
            order: subCategoryOrder,
            image: selectedImage ? selectedImage : '',
            main_category_slug: mainCategoryName === null ? HotelRestMainCategoryData?.data?.results[0]?.slug : mainCategoryName,
            is_image: isImage,
            is_active : isActive
        })
    }

    const handleClosePopup = (e) => {
        if (e.target.id === 'overlay') {
            setIsActivePopup(true)
            router.push('?')
        }
    }

    const handleChangeLang = (e) => {
        Cookies.set('active-lang', e.target.value)
        setIsActiveLang(e.target.value)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setIsDisabledButton(false)
            setSelectedImage(file)
        }
    }

    return (
        <div className={isActivePopup ? styles.deactivePopup : styles.activePopup}>
            <div onClick={handleClosePopup} id='overlay' className={styles.overlay}>
                <div id='content' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='w-[458px]'>
                        <div className="row">
                            <div className="col-xl-12 col-md-12">
                                <div className="ms-panel ms-panel-fh">
                                    <div className={styles.categoryHead}>
                                        <h6>{t('Add Subcategory Form')}</h6>
                                    </div>
                                    <div className="ms-panel-body">
                                        <form
                                            className="needs-validation clearfix"
                                            noValidate
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                handleSubmit()
                                            }}
                                        >
                                            <div className="form-row">
                                                <div className="col-md-12 mb-6">
                                                    <label htmlFor="validationCustom18">
                                                        {t('Subcategory Name')}
                                                    </label>
                                                    <div className={styles.categoryName}>
                                                        <input
                                                            type="text"
                                                            id="validationCustom18"
                                                            placeholder={t('Category Name')}
                                                            value={subcategoryNameLang[`name_${isActiveLang}`]}
                                                            required
                                                            onChange={handleSubCategoryName}
                                                        />
                                                        <div className="valid-feedback">{t('Looks good!')}</div>
                                                    </div>
                                                </div>
                                                <div className="mb-6">
                                                    <label htmlFor="validationCustom18" className={styles.label}>
                                                        {t('Subcategory Order')}
                                                    </label>
                                                    <div className={styles.categoryName}>
                                                        <input
                                                            type="text"
                                                            id="validationCustom18"
                                                            placeholder={t('Category Order')}
                                                            required
                                                            onChange={(e) => setSubCategoryOrder(e.target.value)}
                                                        />
                                                        <div className="valid-feedback">{t('Looks good!')}</div>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        className={styles.label}
                                                        for="countries"
                                                    >
                                                        Hansı Əsas Kateqoriyaya Aiddir?
                                                    </label>
                                                    <select
                                                        id="countries"
                                                        onChange={handleChangeMainCategory}
                                                        className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                        {HotelRestMainCategoryData?.data?.results?.map((mainCategory) => (
                                                            <option value={mainCategory.slug}>
                                                                {mainCategory[`name_${isActiveLang}`]}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-12">
                                                    <label
                                                        className={styles.label}
                                                        htmlFor="validatedCustomFile"
                                                        style={{ marginBottom: '12px' }}
                                                    >
                                                        {t('Category Icon')}
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
                                                                : t('Upload Images')}
                                                        </label>
                                                        <div className="invalid-feedback">
                                                            Example invalid custom file feedback
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
                                                            <option value="en" selected={Cookies.get('active-lang') === 'en'}>EN</option>
                                                            <option value="az" selected={Cookies.get('active-lang') === 'az'}>AZ</option>
                                                            <option value="ru" selected={Cookies.get('active-lang') === 'ru'}>RU</option>
                                                            <option value="ko" selected={Cookies.get('active-lang') === 'ko'}>KO</option>
                                                            <option value="ar" selected={Cookies.get('active-lang') === 'ar'}>AR</option>
                                                        </select>
                                                    </div>
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
                                            </div>
                                        </form>
                                    </div>
                                    <div className="ms-panel-header !pt-0">
                                        <button
                                            disabled={isDisabledButton}
                                            className={styles.addBtn}
                                            type="submit"
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
        </div>
    )
}

export default Page

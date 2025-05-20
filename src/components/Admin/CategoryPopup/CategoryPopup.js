'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../components/AdminCommon/AdminLayout/AdminLayout'
import { useMutation, useQueryClient } from 'react-query'
import { MealCategoryCreate } from '@/services/api/dataApi'
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
    const [selectedImage, setSelectedImage] = useState(null)
    const [categoryOrder, setCategoryOrder] = useState(null)
    const [categoryPriority, setCategoryPriority] = useState()
    const [isActiveLang, setIsActiveLang] = useState('en')
    const [categoryNameLang, setCategoryNameLang] = useState({
        name_az: '',
        name_ko: '',
        name_ru: '',
        name_ar: '',
        name_en: '',
    })
    const queryClient = useQueryClient()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams(null)
    const t = useTranslations('Admin')

    const body = {
        ...categoryNameLang,
        icon: selectedImage ? selectedImage : '',
        order: categoryOrder,
        is_active: true,
    }

    const { mutate: addCategory } = useMutation((data) => MealCategoryCreate(data), {
        onSuccess: () => {
            setIsActivePopup(true)
            setCategoryNameLang({
                name_az: '',
                name_ko: '',
                name_ru: '',
                name_ar: '',
                name_en: '',
            })
            setSelectedImage(null)
            setCategoryOrder(null)
            setIsDisabledButton(true)
            document.querySelectorAll('input').forEach((inp) => inp.value = '')
            router.back()
            toast.success(t('Add Category'))
            queryClient.invalidateQueries(['category'])
        },
        onError: () => {
            setIsActivePopup(true)
            setCategoryNameLang({
                name_az: '',
                name_ko: '',
                name_ru: '',
                name_ar: '',
                name_en: '',
            })
            setSelectedImage(null)
            setCategoryOrder(null)
            setIsDisabledButton(true)
            setIsDisabledButton(true)
            toast.error('Oops... Something went wrong!')
        },
    })

    useEffect(() => {
        if (searchParams.get('category') === 'add-category') {
            Cookies.set('active-lang', 'en')
            setIsActivePopup(false)
        }
    }, [searchParams.get('category')])

    const handleCategoryName = (e) => {
        const updatedObject = { ...categoryNameLang }
        updatedObject[`name_${isActiveLang}`] = e.target.value
        setCategoryNameLang(updatedObject)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setIsDisabledButton(false)
            setSelectedImage(file)
        }
    }

    const handleChangeCategoryOrder = (e) => {
        setCategoryOrder(e.target.value)
    }

    const handleSubmit = () => {
        setIsDisabledButton(true)
        addCategory(body)
    }

    const handleClosePopup = (e) => {
        if (e.target.id === 'overlay') {
            setIsActivePopup(true)
            router.back()
        }
    }

    const handleChangeLang = (e) => {
        Cookies.set('active-lang', e.target.value)
        setIsActiveLang(e.target.value)
    }

    return (
        <div className={isActivePopup ? styles.deactivePopup : styles.activePopup}>
            <div onClick={handleClosePopup} id='overlay' className={styles.overlay}>
                <div id='content' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className="row w-[458px]">
                        <div>
                            <div className="ms-panel ms-panel-fh">
                                <div className={styles.categoryHead}>
                                    <h6>{t('Add Category Form')}</h6>
                                </div>
                                <div className="ms-panel-body">
                                    <form
                                        className="needs-validation clearfix"
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="form-row">
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18" className={styles.label}>
                                                    {t('Category Name')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="text"
                                                        id="validationCustom18"
                                                        placeholder={t('Category Name')}
                                                        value={categoryNameLang[`name_${isActiveLang}`]}
                                                        required
                                                        onChange={handleCategoryName}
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
                                                        id="validationCustom18"
                                                        placeholder={t('Category Order')}
                                                        required
                                                        onChange={(e) => handleChangeCategoryOrder(e)}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
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

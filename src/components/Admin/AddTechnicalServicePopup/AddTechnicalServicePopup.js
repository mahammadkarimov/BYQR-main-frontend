'use client'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CreateHotelService } from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'


const Page = () => {
    const [isActivePopup, setIsActivePopup] = useState(true)
    const [isDisabledButton, setIsDisabledButton] = useState(true)
    const [serviceName, setServiceName] = useState('')
    const [serviceOrder, setServiceOrder] = useState('')
    const [isActiveLang, setIsActiveLang] = useState('en')
    const [technicalService, setTechnicalService] = useState({
        title_az: '',
        title_tr: '',
        title_ru: '',
        title_ar: '',
        title_en: '',
    })
    const [selectedImage, setSelectedImage] = useState(null)
    const queryClient = useQueryClient()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams(null)
    const t = useTranslations('Admin')

    useEffect(() => {
        if (searchParams.get('service') === 'add-technical-service') {
            setIsActivePopup(false)
        }
    }, [searchParams.get('service')])

    const { mutate: addService } = useMutation((data) => CreateHotelService(data), {
        onSuccess: () => {
            setIsActivePopup(true)
            setIsDisabledButton(false)
            setTechnicalService({
                title_az: '',
                title_tr: '',
                title_ru: '',
                title_ar: '',
                title_en: ''
            })
            router.push('?')
            toast.success(t('Add Category'))
            queryClient.invalidateQueries(['service'])
        },
        onError: () => {
            setIsActivePopup(true)
            setIsDisabledButton(false)
            router.push('?')
            toast.error('Oops... Something went wrong!')
        },
    })

    const handleServiceName = (e) => {
        const updatedObject = { ...technicalService }
        updatedObject[`title_${isActiveLang}`] = e.target.value
        setTechnicalService(updatedObject)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setSelectedImage(file)
            setIsDisabledButton(false)
        }
    }

    const handleSubmit = () => {
        addService({
            ...technicalService,
            icon: selectedImage,
            order_number: serviceOrder,

        })
    }

    const handleChangeLang = (e) => {
        Cookies.set('active-lang', e.target.value)
        setIsActiveLang(e.target.value)
    }

    const handleClosePopup = (e) => {
        if (e.target.id === 'overlay') {
            setIsActivePopup(true)
            router.push('?')
        }
    }

    return (
        <div className={isActivePopup ? styles.deactivePopup : styles.activePopup}>
            <div onClick={handleClosePopup} id='overlay' className={styles.overlay}>
                <div id='content' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className="row w-[478px]">
                        <div>
                            <div className="ms-panel ms-panel-fh">
                                <div className={styles.categoryHead}>
                                    <h6>{t('Add Technical Service Form')}</h6>
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
                                                    {t('Service Name')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="text"
                                                        id="validationCustom18"
                                                        placeholder={t('Service Name')}
                                                        required
                                                        value={technicalService[`title_${isActiveLang}`]}
                                                        onChange={handleServiceName}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18" className={styles.label}>
                                                    {t('Service Order')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="text"
                                                        id="validationCustom18"
                                                        placeholder={t('Service Order')}
                                                        required
                                                        onChange={(e) => setServiceOrder(e.target.value)}
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
                                                        <option value="tr" selected={Cookies.get('active-lang') === 'tr'}>TR</option>
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
                                                        {t('Upload Images')}
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

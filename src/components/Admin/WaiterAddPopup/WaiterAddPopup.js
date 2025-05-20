'use client'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CreateWaiter } from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'


const Page = () => {
    const [isActivePopup, setIsActivePopup] = useState(true)
    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const queryClient = useQueryClient()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams(null)
    const t = useTranslations('Admin')

    useEffect(() => {
        if (searchParams.get('page') === 'add-waiter') {
            setIsActivePopup(false)
        }
    }, [searchParams.get('page')])

    const { mutate: addWaiter } = useMutation((data) => CreateWaiter(data), {
        onSuccess: () => {
            setIsActivePopup(true)
            setIsDisabledButton(false)
            document.querySelectorAll('input').forEach((inp) => inp.value = '')
            queryClient.invalidateQueries(['waiter-list'])
            router.back()
            toast.success(t('Waiter Added Successfully'))
        },
        onError: () => {
            setIsActivePopup(true)
            setIsDisabledButton(false)
            router.back()
            toast.error('Oops... Something went wrong!')
        },
    })

    const handleSubmit = () => {
        setIsDisabledButton(true)
        addWaiter({
            first_name: firstName,
            last_name: lastName,
            username: username,
            profile_photo: null,
            email: email,
            password: password,
        })
    }

    const handleClosePopup = (e) => {
        if (e.target.id === 'overlay') {
            setIsActivePopup(true)
            router.back()
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
                                    <h6>{t('Add Waiter Form')}</h6>
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
                                                    {t('Name')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="text"
                                                        id="validationCustom18"
                                                        placeholder={t('Name')}
                                                        required
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18" className={styles.label}>
                                                    {t('Last Name')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="text"
                                                        id="validationCustom18"
                                                        placeholder={t('Last Name')}
                                                        required
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18" className={styles.label}>
                                                    {t('Username')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="text"
                                                        id="validationCustom18"
                                                        placeholder={t('Username')}
                                                        required
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18" className={styles.label}>
                                                    {t('Email')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="email"
                                                        id="validationCustom18"
                                                        placeholder={t('Email')}
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18" className={styles.label}>
                                                    {t('Password')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="password"
                                                        id="validationCustom18"
                                                        placeholder={t('Password')}
                                                        required
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
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

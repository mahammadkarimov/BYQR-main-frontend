'use client'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { EditWaiterInfo, EditWaiterPass, GetWaiterWithSlug } from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
    const [isActivePopup, setIsActivePopup] = useState(true)
    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [waiterData, setWaiterData] = useState({})
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
        if (searchParams.get('page') === 'edit-waiter') {
            setIsActivePopup(false)
        }
        const getCategory = async () => {
            const data = await GetWaiterWithSlug(searchParams.get('waiter-slug'))
            const updatedObject = { ...waiterData }
            updatedObject.first_name = data?.data?.first_name
            updatedObject.last_name = data?.data?.last_name
            updatedObject.username = data?.data?.username
            updatedObject.email = data?.data?.email
            setWaiterData(updatedObject)
        }
        getCategory()

        return () => {
            getCategory()
        }
    }, [searchParams.get('page')])

    const { mutate: editWaiter } = useMutation((data) => EditWaiterInfo(data, searchParams.get('waiter-slug')), {
        onSuccess: () => {
            setIsActivePopup(true)
            setIsDisabledButton(false)
            router.back()
            toast.success(t('Edited successfully'))
            queryClient.invalidateQueries(['waiter-list'])
        },
        onError: () => {
            setIsDisabledButton(false)
            setIsActivePopup(true)
            router.back()
            toast.error(t('Oops, Something went wrong!'))
        },
    })

    const { mutate: editPass } = useMutation((data) => EditWaiterPass(data, searchParams.get('waiter-slug')))


    const handleSubmit = () => {
        setIsDisabledButton(true)
        if (waiterData.password) {
            editPass({
                password: waiterData.password,
            })
            editWaiter({
                first_name: waiterData.first_name,
                last_name: waiterData.last_name,
                username: waiterData.username,
                email: waiterData.email,
            })
        } else {
            editWaiter({
                first_name: waiterData.first_name,
                last_name: waiterData.last_name,
                username: waiterData.username,
                email: waiterData.email,
            })
        }

    }

    const handleChangeName = (e) => {
        const updatedObj = { ...waiterData }
        updatedObj.first_name = e.target.value
        setWaiterData(updatedObj)
    }

    const handleChangeLastName = (e) => {
        const updatedObj = { ...waiterData }
        updatedObj.last_name = e.target.value
        setWaiterData(updatedObj)
    }

    const handleChangeUsername = (e) => {
        const updatedObj = { ...waiterData }
        updatedObj.username = e.target.value
        setWaiterData(updatedObj)
    }

    const handleChangeEmail = (e) => {
        const updatedObj = { ...waiterData }
        updatedObj.email = e.target.value
        setWaiterData(updatedObj)
    }

    const handleChangePassword = (e) => {
        const updatedObj = { ...waiterData }
        updatedObj.password = e.target.value
        setWaiterData(updatedObj)
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
                                    <h6>{t('Edit Waiter Form')}</h6>
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
                                                        value={waiterData.first_name}
                                                        onChange={handleChangeName}
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
                                                        value={waiterData.last_name}
                                                        onChange={handleChangeLastName}
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
                                                        value={waiterData.username}
                                                        onChange={handleChangeUsername}
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
                                                        value={waiterData.email}
                                                        onChange={handleChangeEmail}
                                                    />
                                                    <div className="valid-feedback">{t('Looks good!')}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-6">
                                                <label htmlFor="validationCustom18" className={styles.label}>
                                                    {t('New Password')}
                                                </label>
                                                <div className={styles.categoryName}>
                                                    <input
                                                        type="password"
                                                        id="validationCustom18"
                                                        placeholder={t('New Password')}
                                                        required
                                                        onChange={handleChangePassword}
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

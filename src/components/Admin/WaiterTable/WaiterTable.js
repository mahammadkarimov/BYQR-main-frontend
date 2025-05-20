'use client'
import { Modal } from 'react-bootstrap'
import styles2 from '../../../app/[locale]/admin/products/products.module.css'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import closeBtn from '../../../assets/images/Admin/adminModal/close.svg'
import warning from '../../../assets/images/Admin/adminModal/warning.svg'
import { GridLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from "next/image";
import React, { useState } from "react";
import styles from '../../../components/AdminCommon/AdminSearch/adminsearch.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteWaiter, GetWaiterList, HotelServiceDelete } from "@/services/api/dataApi";
import editImg from '../../../assets/icons/Admin/mainAdmin/edit.svg'
import trashImg from '../../../assets/icons/Admin/mainAdmin/trash.svg'
import Cookies from 'js-cookie'

const inter = Inter(
    {
        weight: ['300', '400', '500', '600', '700', '800'],
        style: ['normal'],
        subsets: ['latin'],
        display: "swap"
    })

const AdminCategoryTable = () => {
    const [isActiveDelModal, setIsActiveDelModal] = useState(false);
    const [filteredService, setFilteredService] = useState('')
    const [deleteItem, setDeleteItem] = useState();
    const queryClient = useQueryClient();
    const router = useRouter()
    const searchParams = useSearchParams()
    const t = useTranslations("Admin")

    const { mutate: delCategory } = useMutation((slug) => DeleteWaiter(slug), {
        onSuccess: () => {
            setIsActiveDelModal(false);
            toast.success(t('Waiter deleted successfully'));
            queryClient.invalidateQueries(["waiter-list"]);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { data, isLoading } = useQuery(['waiter-list'], () => GetWaiterList());

    const openServiceEdit = (serviceSlug) => {
        router.push(`?page=edit-waiter&waiter3-slug=${serviceSlug}`)
    }

    const handleDelete = (data) => {
        setDeleteItem(data);
        setIsActiveDelModal(true);
    };

    const handleConfirmDelete = () => {
        delCategory(deleteItem?.slug);
    };

    const handleSearchService = (e) => {
        const filteredService = data?.data?.results?.filter(waiter => (((waiter.first_name) + waiter.last_name).trim().toLowerCase()).includes((e.target.value).trim().toLowerCase()))
        setFilteredService(filteredService)
    }

    if (isLoading) {
        return <div className='flex justify-center items-center mx-0 h-[100vh] my-auto'>
            <GridLoader
                color="#FF1212"
                loading={isLoading ? true : false}
                size={15}
            />
        </div>
    }

    return (
        <>
            <div className={inter.className}>
                <div>
                    <div className="pl-10 mb-28">
                        <div className="mb-12 flex w-[90%] justify-between gap-4">
                            <button onClick={() => router.push(`?restaurant_username=${Cookies.get('restaurant_username')}&page=add-waiter`)} className={`${styles.addBtnCategory} !w-[180px]`}>{t('Add Waiter')}</button>
                            <input
                                type="text"
                                placeholder={t('Search Category')}
                                onChange={handleSearchService}
                                className={styles.searchInp}
                            />
                        </div>
                        <div className="table-responsive">
                            <table className={`table table-hover ${styles.table}`}>
                                <thead className={styles.thead}>
                                    <tr className={styles.thr}>
                                        <th
                                            scope="col"
                                            style={{ background: '#FFC9B5', color: '#07164B', fontSize: '18px', fontWeight: '500' }}
                                        >
                                            {t('Name & Last Name')}
                                        </th>
                                        <th
                                            scope="col"
                                            style={{ background: '#FFC9B5', color: '#07164B', fontSize: '18px', fontWeight: '500', textAlign: 'center' }}
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            style={{ background: '#FFC9B5', color: '#07164B', fontSize: '18px', fontWeight: '500', textAlign: 'end' }}
                                        >
                                            {t('Edit / Delete')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                    {
                                        filteredService ? filteredService.map((item, i) => (
                                            <tr key={item.id} className={styles.tr}>
                                                <td className="font-semibold capitalize">{item.first_name} {item.last_name}</td>
                                                <td className={`${styles.td} font-semibold uppercase`}>{item.waiter_id}</td>
                                                <td>
                                                    <div className='flex justify-end'>
                                                        <button
                                                            onClick={() => router.push(`?page=edit-waiter&waiter-slug=${item?.slug}`)}
                                                            className={styles.editBtn}
                                                        >
                                                            <Image src={editImg} alt="edit-icon" />
                                                        </button>
                                                        <button className={styles.editBtn}>
                                                            <Image
                                                                onClick={() => handleDelete(item)}
                                                                src={trashImg}
                                                                alt="trash-icon"
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                            :
                                            data?.data?.results?.map((item, i) => (
                                                <tr key={item.id} className={styles.tr}>
                                                    <td className="font-semibold capitalize">{item.first_name} {item.last_name}</td>
                                                    <td className={`${styles.td} font-semibold uppercase`}>{item.waiter_id}</td>
                                                    <td>
                                                        <div className='flex justify-end'>
                                                            <button
                                                                onClick={() => router.push(`?page=edit-waiter&waiter-slug=${item?.slug}`)}
                                                                className={styles.editBtn}
                                                            >
                                                                <Image src={editImg} alt="edit-icon" />
                                                            </button>
                                                            <button className={styles.editBtn}>
                                                                <Image
                                                                    onClick={() => handleDelete(item)}
                                                                    src={trashImg}
                                                                    alt="trash-icon"
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isActiveDelModal && (
                <Modal
                    show="true"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <div className="h-[280px] w-[390px] bg-white p-40px flex flex-col items-center justify-center relative rounded-[10px] m-auto">
                            <div
                                onClick={() => setIsActiveDelModal(false)}
                                type="button"
                                className={`w-10px h-10px absolute right-7 top-7 ${styles2.closeBtn}`}
                            >
                                <Image
                                    src={closeBtn}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    width={10}
                                    height={10}
                                    alt="closeBtn"
                                />
                            </div>
                            <div className="flex flex-col gap-[30px] items-center">
                                <div className="w-[60px] h-[60px]">
                                    <Image
                                        src={warning}
                                        alt="warning"
                                        loading="eager"
                                        className="w-full h-full"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <h1 className={styles2.modalTitle}>
                                    {t('Do you want to sure delete product?')}
                                </h1>
                            </div>
                            <div className="flex justify-between gap-[13px] mt-[30px]">
                                <button
                                    type="button"
                                    onClick={handleConfirmDelete}
                                    className={styles2.yesBtn}
                                >
                                    {t('Delete')}
                                </button>
                                <button
                                    onClick={() => setIsActiveDelModal(false)}
                                    type="button"
                                    className={styles2.noBtn}
                                >
                                    {t('Cancel')}
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    )
}

export default AdminCategoryTable

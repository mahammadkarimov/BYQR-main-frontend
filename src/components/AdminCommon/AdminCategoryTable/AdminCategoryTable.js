'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import styles from '../AdminSearch/adminsearch.module.css'
import styles2 from '../../../app/[locale]/admin/products/products.module.css'
import './style.css'
import { Inter } from 'next/font/google'

import editImg from '../../../assets/icons/Admin/mainAdmin/edit.svg'
import trashImg from '../../../assets/icons/Admin/mainAdmin/trash.svg'
import closeBtn from '../../../assets/images/Admin/adminModal/close.svg'
import warning from '../../../assets/images/Admin/adminModal/warning.svg'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  HotelMainCategoryList,
  HotelSubcategoryList,
  MealCategoryDelete,
  MealCategoryList,
  MealSubCategoryDelete,
  MealSubCategoryList,
} from '@/services/api/dataApi'
import { GridLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Cookies from 'js-cookie'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const AdminCategoryTable = () => {
  const [isActiveDelModal, setIsActiveDelModal] = useState(false)
  const [isActiveDelModal2, setIsActiveDelModal2] = useState(false)
  const [isFilteredCategory, setFilteredCategory] = useState(false)
  const [isFilteredSubCategory, setFilteredSubCategory] = useState(null)
  const [deleteItem, setDeleteItem] = useState()
  const [deleteItem2, setDeleteItem2] = useState()
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('Admin')

  const { mutate: delCategory } = useMutation(
    (slug) => MealCategoryDelete(slug),
    {
      onSuccess: () => {
        toast.success(t('Category deleted successfully'))
        queryClient.invalidateQueries(['category'])
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const { mutate: delSubCategory } = useMutation(
    (slug) => MealSubCategoryDelete(slug),
    {
      onSuccess: () => {
        toast.success(t('Subcategory deleted successfully'))
        queryClient.invalidateQueries(['subcategory'])
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  // const { data, isLoading } = useQuery('category', MealCategoryList, {enabled: Cookies.get('user-type') === 'restaurant'})
  const { data: hotelCategoryData, isLoading } = useQuery('category', HotelMainCategoryList)
  // const { data: subCategoryData } = useQuery('subcategory', MealSubCategoryList, {enabled: Cookies.get('user-type') === 'restaurant'})
  const { data: hotelSubCategoryData } = useQuery('subcategory', HotelSubcategoryList)

  const handleDelete = (data) => {
    setDeleteItem(data)
    setIsActiveDelModal(true)
  }

  const handleDeleteCategory = () => {
    if (deleteItem?.slug) {
      delCategory(deleteItem?.slug)
      setIsActiveDelModal(false)
    } else {
      delSubCategory(deleteItem2?.slug)
      setIsActiveDelModal(false)
    }
  }

  const handleDelete2 = (data) => {
    setDeleteItem2(data)
    setIsActiveDelModal(true)
  }

  const handleConfirmDelete = () => {
    delCategory(deleteItem?.slug)
    setIsActiveDelModal(false)
  }

  const handleConfirmDelete2 = () => {
    console.log(deleteItem2)
    delSubCategory(deleteItem2?.slug)
    setIsActiveDelModal2(false)
  }

  const handleChangeCategorySlug = (categorySlug) => {
    router.push(`?edit-category=true&category-slug=${categorySlug}&lang=az`)
  }

  const handleChangeSubCategorySlug = (subCategorySlug) => {
    router.push(`?edit-subcategory=true&subcategory-slug=${subCategorySlug}&lang=az`)
  }

  const handleChangeSearchCategory = (e) => {
    if (hotelCategoryData?.data?.results) {
      console.log(hotelCategoryData?.data?.results)
      let filteredCategory = hotelCategoryData?.data?.results?.filter((category) =>
        (category?.name_az)
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      )
      setFilteredCategory(filteredCategory)
    } else {
      let filteredCategory = hotelCategoryData?.data?.results?.filter((category) =>
        (category?.name_az)
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      )
      setFilteredCategory(filteredCategory)
    }
  }

  const handleChangeSearchSubCategory = (e) => {
    if (hotelSubCategoryData?.data?.results) {
      let filteredCategory = hotelSubCategoryData?.data?.results?.filter((category) =>
        category[`name_${pathname.split('/')[1]}`]
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      )
      setFilteredSubCategory(filteredCategory)
    } else {
      let filteredCategory = hotelSubCategoryData?.data?.results?.filter((category) =>
        category[`name_${pathname.split('/')[1]}`]
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      )
      setFilteredSubCategory(filteredCategory)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-0 h-[100vh] my-auto">
        <GridLoader
          color="#FF1212"
          loading={isLoading ? true : false}
          size={15}
        />
      </div>
    )
  }

  return (
    <>
      <div className={inter.className}>
        <div>
          <div className="pl-10 mb-28">
            <div className="mb-12 flex w-[90%] justify-between gap-4">
              <button
                onClick={() => router.push(`?category=add-category`)}
                className={styles.addBtnCategory}
              >
                {t('Add Category')}
              </button>
              <input
                type="text"
                placeholder={t('Search Category')}
                onChange={(e) => handleChangeSearchCategory(e)}
                className={styles.searchInp}
              />
            </div>
            <div className="table-responsive">
              <table className={`table table-hover ${styles.table}`}>
                <thead className={styles.thead}>
                  <tr className={styles.thr}>
                    <th
                      scope="col"
                      className="w-[100px]"
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                      }}
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                    >
                      {t('Category Name')}
                    </th>
                    <th
                      scope="col"
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                    >
                      {t('Category Icon')}
                    </th>
                    <th
                      scope="col"
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                        textAlign: 'end',
                      }}
                    >
                      {t('Edit / Delete')}
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {isFilteredCategory
                    ? isFilteredCategory.map((item, i) => (
                      <tr key={item.id} className={styles.tr}>
                        <th className="w-[100px] font-semibold">{i + 1}</th>
                        <td className={styles.td}>{item[`name_${pathname.split('/')[1]}`]}</td>
                        <td>
                          <div className={styles.tdFlex}>
                            <Image
                              alt="category"
                              width={200}
                              height={200}
                              className={styles.categoryImg}
                              src={item.icon}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                handleChangeCategorySlug(item?.slug)
                              }
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
                    : hotelCategoryData?.data?.results?.map((item, i) => (
                      <tr key={item.id} className={styles.tr}>
                        <td className="w-[100px] font-semibold">{i + 1}</td>
                        <td className={styles.td}>{item[`name_${pathname.split('/')[1]}`]}</td>
                        <td>
                          <div className={styles.tdFlex}>
                            <Image
                              alt="category"
                              width={200}
                              height={200}
                              className={styles.categoryImg}
                              src={item.icon}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                handleChangeCategorySlug(item?.slug)
                              }
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
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pl-10">
            <div className="mb-12 flex w-[90%] justify-between gap-4">
              <button
                onClick={() => router.push(`?category=add-subcategory`)}
                className={styles.addBtnCategory}
              >
                {t('Add Subcategory')}
              </button>
              <input
                type="text"
                placeholder={t('Search Category')}
                onChange={(e) => handleChangeSearchSubCategory(e)}
                className={styles.searchInp}
              />
            </div>
            <div className="table-responsive">
              <table className={`table table-hover ${styles.table}`}>
                <thead className={styles.thead}>
                  <tr className={styles.thr}>
                    <th
                      scope="col"
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                      }}
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                    >
                      {t('Category Name')}
                    </th>
                    <th
                      scope="col"
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                        textAlign: 'center',
                      }}
                    >
                      {t('Category Icon')}
                    </th>
                    <th
                      scope="col"
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                        textAlign: 'end',
                      }}
                    >
                      {t('Edit / Delete')}
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {isFilteredSubCategory
                    ? isFilteredSubCategory.map((item, i) => (
                      <tr key={item.id} className={styles.tr}>
                        <th className="font-semibold">{i + 1}</th>
                        <td className={styles.td}>{item[`name_${pathname.split('/')[1]}`]}</td>
                        <td>
                          <div className={styles.tdFlex}>
                            {item.image &&
                              <Image
                                alt="category"
                                width={200}
                                height={200}
                                className={styles.categoryImg}
                                src={item?.image}
                              />
                            }
                          </div>
                        </td>
                        <td>
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                handleChangeSubCategorySlug(item?.slug)
                              }
                              className={styles.editBtn}
                            >
                              <Image src={editImg} alt="edit-icon" />
                            </button>
                            <button className={styles.editBtn}>
                              <Image
                                onClick={() => handleDelete2(item)}
                                src={trashImg}
                                alt="trash-icon"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : hotelSubCategoryData?.data?.results?.map((item, i) => (
                      <tr key={item.id} className={styles.tr}>
                        <td className="font-semibold">{i + 1}</td>
                        <td className={styles.td}>{item[`name_${pathname.split('/')[1]}`]}</td>
                        <td>
                          <div className={styles.tdFlex}>
                            {item.image &&
                              <Image
                                alt="category"
                                width={200}
                                height={200}
                                className={styles.categoryImg}
                                src={item?.image}
                              />
                            }
                          </div>
                        </td>
                        <td>
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                handleChangeSubCategorySlug(item?.slug)
                              }
                              className={styles.editBtn}
                            >
                              <Image src={editImg} alt="edit-icon" />
                            </button>
                            <button className={styles.editBtn}>
                              <Image
                                onClick={() => handleDelete2(item)}
                                src={trashImg}
                                alt="trash-icon"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
                className={`w-10px h-10px absolute right-0 top-7 ${styles2.closeBtn}`}
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
                  onClick={() => handleDeleteCategory()}
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

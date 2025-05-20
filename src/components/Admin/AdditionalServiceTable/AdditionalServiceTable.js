'use client'
import { Modal } from 'react-bootstrap'
import styles2 from '../../../app/[locale]/admin/products/products.module.css'
import '../../../styles/style.css'
import { Inter } from 'next/font/google'
import closeBtn from '../../../assets/images/Admin/adminModal/close.svg'
import warning from '../../../assets/images/Admin/adminModal/warning.svg'
import uploaded from '../../../assets/icons/Hotel/uploaded.png'
import { GridLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../../../components/AdminCommon/AdminSearch/adminsearch.module.css'
import '../../../components/AdminCommon/AdminCategoryTable/style.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  GetHotelCustomerServices,
  GetHotelServices,
  HotelCustomerServiceDelete,
  HotelServiceDelete,
} from '@/services/api/dataApi'
import editImg from '../../../assets/icons/Admin/mainAdmin/edit.svg'
import trashImg from '../../../assets/icons/Admin/mainAdmin/trash.svg'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const AdminCategoryTable = () => {
  const [isActiveDelModal, setIsActiveDelModal] = useState(false)
  const [isActiveDelModal2, setIsActiveDelModal2] = useState(false)
  const [filteredService, setFilteredService] = useState('')
  const [deleteItem, setDeleteItem] = useState()
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('Admin')

  const { mutate: delCategory } = useMutation(
    (slug) => HotelCustomerServiceDelete(slug),
    {
      onSuccess: () => {
        setIsActiveDelModal(false)
        toast.success(t('Service deleted successfully'))
        queryClient.invalidateQueries(['customer-service'])
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const { data, isLoading } = useQuery(['customer-service'], () =>
    GetHotelCustomerServices()
  )

  const openServiceEdit = (serviceSlug) => {
    router.push(`?service=edit-service&customer-service-slug=${serviceSlug}&lang=az`)
  }

  const handleDelete = (data) => {
    setDeleteItem(data)
    setIsActiveDelModal(true)
  }

  const handleConfirmDelete = () => {
    delCategory(deleteItem?.slug)
  }

  const handleSearchService = (e) => {
    const filteredService = data?.data?.results?.filter((service) =>
      service.title_az.trim().toLowerCase().includes(e.target.value)
    )
    setFilteredService(filteredService)
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
                onClick={() => router.push(`?service=add-service`)}
                className={`${styles.addBtnCategory} !w-[180px]`}
              >
                {t('Add Service')}
              </button>
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
                      style={{
                        background: '#FFC9B5',
                        color: '#07164B',
                        fontSize: '18px',
                        fontWeight: '500',
                        textAlign: 'start',
                      }}
                    >
                      {t('Service Name')}
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
                      {t('Price')}
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
                      {t('Time')}
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
                      {t('Service Icon')}
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
                  {filteredService
                    ? filteredService.map((item, i) => (
                        <tr key={item.id} className={styles.tr}>
                          <td className={styles.serviceName}>
                            {item.title_az.length > 26
                              ? item.title_az.slice(0, 26) + '...'
                              : item.title_az}
                          </td>
                          <td className={styles.td}>
                            <span
                              style={{
                                border: '1px solid #E6E7EB',
                                padding: '6px 12px',
                                borderRadius: '52px',
                              }}
                            >
                              {item.price} AZN
                            </span>
                          </td>
                          <td className={styles.td}>{item.etp} dəq</td>
                          <td>
                            <div className={styles.tdFlex}>
                              <Image
                                alt="category"
                                width={60}
                                height={60}
                                className={styles.categoryImg}
                                src={item.photo}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="flex justify-end">
                              <button
                                onClick={() => openServiceEdit(item?.slug)}
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
                    : data?.data?.results?.map((item, i) => (
                        <tr key={item.id} className={styles.tr}>
                          <td className={styles.serviceName}>
                            {item.title_az.length > 26
                              ? item.title_az.slice(0, 26) + '...'
                              : item.title_az}
                          </td>
                          <td className={styles.td}>
                            <span
                              style={{
                                border: '1px solid #E6E7EB',
                                padding: '6px 12px',
                                borderRadius: '52px',
                              }}
                            >
                              {item.price} AZN
                            </span>
                          </td>
                          <td className={styles.td}>{item.etp} dəq</td>
                          <td>
                            <div className={styles.tdFlex}>
                              <Image
                                alt="category"
                                width={60}
                                height={60}
                                className={styles.categoryImg}
                                src={item.photo}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="flex justify-end">
                              <button
                                onClick={() => openServiceEdit(item?.slug)}
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
          {/* <div className="pl-10">
                        <div className="mb-12 flex w-[90%] justify-between gap-4">
                            <button onClick={() => router.push(`?category=add-subcategory`)} className={styles.addBtnCategory}>{t('Add Subcategory')}</button>
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
                                            style={{ background: '#FFC9B5', color: '#07164B', fontSize: '18px', fontWeight: '500' }}
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            style={{ background: '#FFC9B5', color: '#07164B', fontSize: '18px', fontWeight: '500', textAlign: 'center' }}
                                        >
                                            {t('Category Name')}
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
                                    {isFilteredSubCategory
                                        ? isFilteredSubCategory.map((item, i) => (
                                            <tr key={item.id} className={styles.tr}>
                                                <th className='font-semibold'>{i + 1}</th>
                                                <td className={styles.td}>{item.name}</td>
                                                <td>
                                                    <div className='flex justify-end'>
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
                                        ))
                                        : subCategoryData?.data?.map((item, i) => (
                                            <tr key={item.id} className={styles.tr}>
                                                <td className='font-semibold'>{i + 1}</td>
                                                <td className={styles.td}>{item.name}</td>
                                                <td>
                                                    <div className='flex justify-end'>
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
                    </div> */}
          {/* <div className="ms-panel-body">
            <div className="mb-6 flex justify-end gap-4">
              <AdminAddBtn>{btnData2}</AdminAddBtn>
              <input
                type="text"
                placeholder={t('Search Category')}
                onChange={(e) => handleChangeSearchSubCategory(e)}
                className={styles.searchInp}
              />
            </div>
            <div className="table-responsive">
              <table className={`table table-hover h-[400px] ${styles.table}`}>
                <thead className={styles.thead}>
                  <tr className={styles.tr}>
                    <th
                      scope="col"
                      style={{ background: '#ff6877', color: '#fff' }}
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      style={{ background: '#ff6877', color: '#fff' }}
                    >
                      {t('Category Name')}
                    </th>
                    <th
                      scope="col"
                      style={{ background: '#ff6877', color: '#fff' }}
                    >
                      {t('Edit / Delete')}
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {isFilteredSubCategory
                    ? isFilteredSubCategory.map((item) => (
                      <tr key={item.id} className={styles.tr}>
                        <th className="columns-3">{item.id}</th>
                        <td className="columns-3">{item.name}</td>
                        <td className="flex gap-2 bg-yellow-500">
                          <button
                            onClick={() =>
                              handleChangeCategorySlug(item?.slug)
                            }
                          >
                            <Image src={editImg} alt="edit-icon" />
                          </button>
                          <button>
                            <Image
                              onClick={() => handleDelete2(item)}
                              src={trashImg}
                              alt="trash-icon"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                    : subCategoryData?.data?.map((item, i) => (
                      <tr key={item.id} className={styles.tr}>
                        <td className="columns-3">{i + 1}</td>
                        <td className="columns-3">{item.name}</td>
                        <td className="flex">
                          <Link
                            href={`/${pathname.slice(
                              1,
                              3
                            )}/admin/categories/edit-subcategory`}
                            onClick={() =>
                              handleChangeSubCategorySlug(item?.slug)
                            }
                          >
                            <Image src={editImg} alt="edit-icon" />
                          </Link>
                          <button>
                            <Image
                              onClick={() => handleDelete2(item)}
                              src={trashImg}
                              alt="trash-icon"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div> */}
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

'use client'
import React, { useRef, useState, useEffect } from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import AdminAddBtn from '@/components/AdminCommon/AdminAddBtn/AdminAddBtn'
import { Modal } from 'react-bootstrap'
import {
  GetHotelFilterRestMeals,
  GetHotelRestMeals,
  HotelSubcategoryList,
  MealOrderUpdate,
  MealsDelete,
  MealsList,
  MealSubCategoryList,
  UserList
} from '@/services/api/dataApi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { GridLoader } from 'react-spinners'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import styles from './products.module.css'
import warning from '../../../../assets/images/Admin/adminModal/warning.svg'
import closeBtn from '../../../../assets/images/Admin/adminModal/close.svg'
import Link from 'next/link'
import Sortable from 'sortablejs'

const page = () => {
  const [isClient, setIsClient] = useState(false)
  const [isActiveDelModal, setIsActiveDelModal] = useState(false)
  const [productSlug, setProductSlug] = useState(false)
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const [searchedProduct, setSearchedProduct] = useState([])
  const [isSearchInitiated, setIsSearchInitiated] = useState(false) 
  const [noResults, setNoResults] = useState(false) 
  const [btnData, setBtnData] = useState({
    categoryName: 'Add Product',
    categoryUrl: '/add-product'
  })
  const [filteredProducts, setFilteredProducts] = useState(false)
  const [filteredCategory, setFilteredCategory] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('Admin')
  const queryClient = useQueryClient()
  const gridRef = useRef(null)
  let items = []

  useEffect(() => {
    console.log('daxil oldu')
    const updatedItems = JSON.parse(localStorage.getItem('items'))
    localStorage.removeItem('items')
    console.log(updatedItems)
    MealOrderUpdate(updatedItems)
  }, [])

  const { _ } = useQuery('user', UserList, {
    onSuccess: data => {
      if (data?.data?.username) {
        Cookies.set('activeRest', data?.data?.username?.toLowerCase())
      }
    }
  })

  const { data: hotelRestMealData, isLoading } = useQuery(
    'mealsList', () => GetHotelRestMeals(pathname.split('/')[1])
  )

  useEffect(() => {
    setTimeout(() => {
      const sortableElements = document.querySelectorAll(
        '.flex.gap-4.flex-wrap'
      )
      sortableElements.forEach(element => {
        Sortable.create(element, {
          animation: 150,
          onEnd: evt => {
            const parent = evt.item.parentNode

            const siblings = Array.from(parent.children)
            items = []

            siblings.forEach((el, i) => {
              items.push({
                id: el.getAttribute('data-id'),
                priority: i
              })
            })

            localStorage.setItem('items', JSON.stringify(items))
          }
        })
      })
    }, 500)
  }, [hotelRestMealData])

  const { data: hotelFilterRestMealData } = useQuery(
    'filterMealsList',
    GetHotelFilterRestMeals
  )

  const { data: hotelSubCategoryData } = useQuery(
    'subcategory',
    HotelSubcategoryList
  )

  const { mutate: delProduct } = useMutation({
    mutationFn: productSlug => MealsDelete(productSlug),
    onSuccess: () => {
      setIsActiveDelModal(false)
      toast.success(t('Product deleted successfully'))
      queryClient.invalidateQueries(['mealsList'])
    },
    onError: () => {
      toast.error(t('Oops, Something went wrong!'))
    }
  })

  const handleDelModal = productSlug => {
    setIsActiveDelModal(true)
    setProductSlug(productSlug)
  }

  const handleDeleteProduct = () => {
    if (productSlug) {
      delProduct(productSlug)
    }
  }

  const handleFilterProductWithCategory = e => {
    const category = e.target.value
    const lang = pathname.split('/')[1]
    const results = hotelFilterRestMealData?.data?.results || []
    const getCategoryName = product => {
      return product?.category ? product.category[`name_${lang}`] : null
    }
    if (e.target.selectedIndex === 0) {
      location.reload()
    } else {
      const filteredData = results.filter(
        product => getCategoryName(product) === category
      )
      setFilteredProducts(filteredData)
    }
    setFilteredCategory(category)
  }

  const handleSearchProduct = e => {
    const productName = e.target.value
    const lang = pathname.split('/')[1]
    const results = hotelFilterRestMealData?.data?.results || []
    setTimeout(() => {
      if (!productName.trim()) {
        setSearchedProduct([])
        setIsSearchInitiated(false) 
        setNoResults(false)
        return
      }

      setIsSearchInitiated(true) 
      const filteredData = results.filter(product =>
        product[`name_${lang}`]
          ?.toLowerCase()
          .trim()
          .includes(productName.toLowerCase().trim())
      )

      if (filteredData.length === 0) {
        setNoResults(true)
        setSearchedProduct([])
      } else {
        setNoResults(false)
        setSearchedProduct(filteredData)
      }
    }, 500)
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mx-0 h-[100vh] my-auto'>
        <GridLoader
          color='#FF1212'
          loading={isLoading ? true : false}
          size={15}
        />
      </div>
    )
  }
console.log(hotelRestMealData)
  return (
    <AdminLayout>
      <div className={styles.adminProductsContainer}>
        <div className='w-full'>
          <div className={styles.content}>
            <div>
              <AdminAddBtn>{btnData}</AdminAddBtn>
            </div>
            <div className='flex items-center '>
              <div className='relative w-[230px] mr-2'>
                <input
                  type='search'
                  onChange={handleSearchProduct}
                  placeholder={t('Search products')}
                  className='w-full py-3 pl-6 pr-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
              </div>
              <select
                id='categories'
                onChange={e => handleFilterProductWithCategory(e)}
                value={filteredCategory}
                className={styles.selectProductsLabel}
              >
                <option selected>{t('All Products')}</option>
                {hotelSubCategoryData && (
                  <>
                    {hotelSubCategoryData?.data?.results?.map(category => (
                      <option key={category.id}>
                        {category[`name_${pathname.split('/')[1]}`]}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
          <div className={styles.productCategories}>
            {isSearchInitiated && noResults ? (
              <div>not found...</div>
            ) : isSearchInitiated &&
              !noResults &&
              searchedProduct.length > 0 ? (
              searchedProduct?.map((product, i) => (
                <div key={i} className={styles.productCard}>
                  <div className={styles.imgContainer}>
                    <img
                      src={product?.image}
                      className={styles.productImg}
                      loading='lazy'
                      width={300}
                      height={300}
                      alt='card_img'
                    />
                    {product?.is_active === true ? (
                      <div className={`${styles.stockCard} bg-[#63b92e]`}>
                        In stock
                      </div>
                    ) : (
                      <div className={`${styles.stockCard} bg-[#FD451C]`}>
                        Out of stock
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col w-full'>
                    <h1 className={styles.productCardName}>
                      {product[`name_${pathname.split('/')[1]}`]}
                    </h1>
                    <h5 className={styles.productCardPrice}>{product.price}</h5>
                    <h4 className={styles.productCardIngredients}>
                      {product.ingredient?.length >
                      32
                        ? product.ingredient?.slice(0, 32) + '...'
                        : product.ingredient}
                      {(product.ingredient
                        ?.length === 0 ||
                        !product.ingredient) &&
                        t('The composition of the product is not mentioned')}
                      .
                    </h4>
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <button
                      type='button'
                      onClick={() => handleDelModal(product?.slug)}
                      className={styles.deleteProductCard}
                    >
                      {t('Remove')}
                    </button>
                    <Link
                      type='button'
                      target='_blank'
                      href={`${pathname}/edit-product?product=${
                        product?.slug
                      }&?lang=${pathname.split('/')[1]}`}
                      className={styles.editProductCard}
                    >
                      {t('Edit')}
                    </Link>
                  </div>
                </div>
              ))
            ) : filteredProducts ? (
              filteredProducts?.map((product, i) => (
                <div key={i} className={styles.productCard}>
                  <div className={styles.imgContainer}>
                    <img
                      src={product?.image}
                      className={styles.productImg}
                      loading='lazy'
                      width={300}
                      height={300}
                      alt='card_img'
                    />
                    {product?.is_active === true ? (
                      <div className={`${styles.stockCard} bg-[#63b92e]`}>
                        In stock
                      </div>
                    ) : (
                      <div className={`${styles.stockCard} bg-[#FD451C]`}>
                        Out of stock
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col w-full'>
                    <h1 className={styles.productCardName}>
                      {product[`name_${pathname.split('/')[1]}`]}
                    </h1>
                    <h5 className={styles.productCardPrice}>{product.price}</h5>
                    <h4 className={styles.productCardIngredients}>
                      {product.ingredient?.length >
                      32
                        ? product.ingredient?.slice(0, 32) + '...'
                        : product.ingredient}
                      {(product.ingredient
                        ?.length === 0 ||
                        !product.ingredient) &&
                        t('The composition of the product is not mentioned')}
                      .
                    </h4>
                  </div>
                  <div className='flex flex-col gap-[6px]'>
                    <button
                      type='button'
                      onClick={() => handleDelModal(product?.slug)}
                      className={styles.deleteProductCard}
                    >
                      {t('Remove')}
                    </button>
                    <Link
                      type='button'
                      target='_blank'
                      href={`${pathname}/edit-product?product=${
                        product?.slug
                      }&?lang=${pathname.split('/')[1]}`}
                      className={styles.editProductCard}
                    >
                      {t('Edit')}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div ref={gridRef}>
                {hotelRestMealData?.data?.meals?.map((meal, i) => (
                  <div key={i}>
                    <h2 className={styles.categoryName}>
                      {meal?.category_name}
                    </h2>
                    <div>
                      {meal?.subcategories?.map((subcategory, i) => (
                        <div key={i}>
                          <h3 className={styles.subCategoryName}>
                            {subcategory?.name}
                          </h3>
                          <div className='flex gap-4 mt-4 flex-wrap'>
                            {subcategory?.meals.map((product, i) => (
                              <div
                                order-id={i}
                                data-id={product.id}
                                key={i}
                                className={styles.productCard}
                              >
                                <div className={styles.imgContainer}>
                                  <img
                                    src={product?.image}
                                    className={styles.productImg}
                                    loading='lazy'
                                    width={300}
                                    height={300}
                                    alt='card_img'
                                  />
                                  {product?.is_active === true ? (
                                    <div
                                      className={`${styles.stockCard} bg-[#63b92e]`}
                                    >
                                      In stock
                                    </div>
                                  ) : (
                                    <div
                                      className={`${styles.stockCard} bg-[#FD451C]`}
                                    >
                                      Out of stock
                                    </div>
                                  )}
                                </div>
                                <div className='flex flex-col w-full'>
                                  <h1 className={styles.productCardName}>
                                    {product.name}
                                  </h1>
                                  <h5 className={styles.productCardPrice}>
                                    {product.price}
                                  </h5>
                                  <h4 className={styles.productCardIngredients}>
                                    {product.ingredient?.length > 32
                                      ? product.ingredient?.slice(0, 32) + '...'
                                      : product.ingredient}
                                    {(product.ingredient?.length === 0 ||
                                      !product.ingredient) &&
                                      t(
                                        'The composition of the product is not mentioned'
                                      )}
                                    .
                                  </h4>
                                </div>
                                <div className='flex flex-col gap-[6px]'>
                                  <button
                                    type='button'
                                    onClick={() =>
                                      handleDelModal(product?.slug)
                                    }
                                    className={styles.deleteProductCard}
                                  >
                                    {t('Remove')}
                                  </button>
                                  <a
                                    type='button'
                                    target='_blank'
                                    href={`${pathname}/edit-product?product=${product?.slug}&lang=${pathname.split('/')[1]}`}
                                    className={styles.editProductCard}
                                  >
                                    {t('Edit')}
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {isActiveDelModal && (
        <Modal
          show='true'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Body>
            <div className='h-[280px] w-[390px] bg-white p-40px flex flex-col items-center justify-center relative rounded-[10px] m-auto'>
              <div
                onClick={() => setIsActiveDelModal(false)}
                type='button'
                className={`w-10px h-10px absolute right-0 top-7 ${styles.closeBtn}`}
              >
                <Image
                  src={closeBtn}
                  className='w-full h-full object-cover'
                  loading='lazy'
                  width={10}
                  height={10}
                  alt='closeBtn'
                />
              </div>
              <div className='flex flex-col gap-[30px] items-center'>
                <div className='w-[60px] h-[60px]'>
                  <Image
                    src={warning}
                    alt='warning'
                    loading='eager'
                    className='w-full h-full'
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className={styles.modalTitle}>
                  {t('Do you want to sure delete product?')}
                </h1>
              </div>
              <div className='flex justify-between gap-[13px] mt-[30px]'>
                <button
                  type='button'
                  onClick={() => handleDeleteProduct()}
                  className={styles.yesBtn}
                >
                  {t('Delete')}
                </button>
                <button
                  onClick={() => setIsActiveDelModal(false)}
                  type='button'
                  className={styles.noBtn}
                >
                  {t('Cancel')}
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </AdminLayout>
  )
}

export default page

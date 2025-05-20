'use client'
import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  AddImg,
  DeleteImg,
  EditDeleteVideoDb,
  EditImg,
  HotelSubcategoryList,
  MealsRead,
  MealSubCategoryList,
  MealsUpdate,
} from '@/services/api/dataApi'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { GridLoader } from 'react-spinners'
import { useTranslations } from 'next-intl'
import edit from '../../../../../assets/images/Admin/adminAddProduct/edit.svg'
import product from '../../../../../assets/images/Admin/AdminProducts/product.png'
import closeBtn from '../../../../../assets/images/Admin/adminModal/close.svg'
import addBtnImg from '../../../../../assets/images/Admin/adminAddProduct/addBtnImg.svg'
import styles from './editProduct.module.css'
import video from '../../../../../assets/images/Admin/adminAddProduct/video-preview.jpg'
import Cookies from 'js-cookie'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import plusBtn from '../../../../../assets/images/Admin/adminAddProduct/plusBtn.svg'
import minusBtn from '../../../../../assets/images/Admin/adminAddProduct/minus.svg'

const page = () => {
  const [productData, setProductData] = useState({})
  const [isLocaleImage, setIsLocaleImage] = useState({})
  const [isSelectedImg, setSelectedImg] = useState([])
  const [activeLang, setActiveLang] = useState('')
  const [isActiveImgModal, setIsActiveImgModal] = useState(false)
  const [priceArr, setPriceArr] = useState([{}])
  const searchParams = useSearchParams()
  const t = useTranslations('Admin')
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const router = useRouter()
  const refs = useRef(null)
  const priorityRef = useRef(null)
  const [inputs, setInputs] = useState([{}]);
  const [langParam, setLangParam] = useState('')


  useEffect(() => {
    const langParam = searchParams.get('lang')
    if (langParam) setLangParam(langParam)
  }, [searchParams.get('lang')])

  const { mutate: editProduct } = useMutation(
    (productData) => MealsUpdate(productData, searchParams.get('product')),
    {
      onSuccess: () => {
        router.push(`/${pathname.slice(1, 3)}/admin/products`)
        queryClient.invalidateQueries(['meals-detail'])
        queryClient.invalidateQueries(['mealsList'])
        toast.success('Product edited successfully')
      },
      onError: () => {
        toast.error('Please Enter Product Details')
      },
    }
  )

  const { mutate: deleteImgDb } = useMutation((img_id) => DeleteImg(img_id), {
    onSuccess: () => {
      location.reload()
    },
    onError: () => {
      console.log('err')
    }
  })

  const { mutate: addImgDb } = useMutation((data) => AddImg(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['meals-detail'])
    },
    onError: () => {
      console.log('err2')
    }
  })

  const { mutate: editImgDb } = useMutation((data) => EditImg(data), {
    onSuccess: () => {
      location.reload()
    },
    onError: () => {
      console.log('err2')
    }
  })

  const { mutate: editDeleteVideoDb } = useMutation((data) => EditDeleteVideoDb(data), {
    onSuccess: () => {
      location.reload()
    },
    onError: () => {
      console.log('err3')
    }
  })

  const { _, isLoading } = useQuery(
    ['meals-detail'],
    () => MealsRead(searchParams.get('product'), pathname.split('/')[1]),
    {
      onSuccess: (data) => {
        const updatedObj = { ...isLocaleImage }
        updatedObj.images = data?.data?.images
        updatedObj.video = data?.data?.video
        setIsLocaleImage(updatedObj)
        setInputs(data?.data?.sizes)
        setProductData({
          name_az: data?.data?.name_az,
          name_en: data?.data?.name_en,
          name_ko: data?.data?.name_ko,
          name_ru: data?.data?.name_ru,
          name_ar: data?.data?.name_ar,
          category: data?.data?.category,
          category_name: data?.data?.category_name,
          price: data?.data?.price,
          ingredient_az: data?.data?.ingredient_az,
          ingredient_en: data?.data?.ingredient_en,
          ingredient_ko: data?.data?.ingredient_ko,
          ingredient_ru: data?.data?.ingredient_ru,
          ingredient_ar: data?.data?.ingredient_ar,
          vegan: data?.data?.vegan,
          is_active: data?.data?.is_active,
          is_halal: data?.data?.is_halal,
          is_new: data?.data?.is_new,
          etp: data?.data?.etp,
          // sizes: inputs,
          calorie: data?.data?.calorie,
          priority: data?.data?.priority
        })
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )

  const { data: hotelSubCategoryData } = useQuery('subcategory-hotel-rest', HotelSubcategoryList)

  const handleChangeProduct = (e) => {
    const updatedObject = { ...productData }
    updatedObject[`name_${langParam}`] = e.target.value
    setProductData(updatedObject)
  }

  const handleChangePrice = (e) => {
    const updatedObject = { ...productData }
    updatedObject.price = e.target.value
    setProductData(updatedObject)
  }

  const handleChangeIngredient = (e) => {
    const updatedObject = { ...productData }
    updatedObject[`ingredient_${langParam}`] = e.target.value
    setProductData(updatedObject)
  }

  const handleChangeRadio = (e) => {
    const updatedObject = { ...productData }
    updatedObject.vegan = e.target.value === 'not-vegan' ? false : true
    setProductData(updatedObject)
  }

  const handleChangeHalal = (e) => {
    const updatedObject = { ...productData }
    updatedObject.is_halal = e.target.checked
    setProductData(updatedObject)
  }

  const handleChangeNew = (e) => {
    const updatedObject = { ...productData }
    updatedObject.is_new = e.target.checked
    setProductData(updatedObject)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && searchParams.get('product')) {
      const imgObj = {
        meal_slug: searchParams.get('product'),
        image: file
      }
      // console.log(imgObj)
      addImgDb(imgObj)
      // const updatedArr = [...isLocaleImage.images];
      // updatedArr.push(file)
      // let imgObj = {
      //   images: updatedArr
      // }
      // console.log(imgObj)
      // setIsLocaleImage(imgObj)
      // setProductData(updatedObject);
      const reader = new FileReader();
      reader.onloadend = () => {
        // const updatedArr = [...isLocaleImage.images];
        // updatedArr.push(reader.result)
        // let imgObj = {
        //   images: updatedArr
        // }
        // console.log(imgObj)
        // setIsLocaleImage(imgObj)
      };
      reader.readAsDataURL(file);
    } else {
      setIsLocaleImage(null);
      const updatedObject = { ...productData };
      updatedObject.image = null
      setProductData(updatedObject);
    }
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const video_extensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'mpeg', 'mpg']
    const fileName = file.name.split('.')[1]
    if (video_extensions.includes(fileName) && searchParams.get('product')) {
      const videoObj = {
        meal_slug: searchParams.get('product'),
        video: file
      }
      editDeleteVideoDb(videoObj)
    }
  }

  const handleChangeActiveProduct = (e) => {
    const updatedObject = { ...productData }
    updatedObject.is_active = e.target.checked
    setProductData(updatedObject)
  }

  const handleChangeActiveProduct2 = (e) => {
    const updatedObject = { ...productData }
    updatedObject.is_active = e.target.checked
    setProductData(updatedObject)
  }

  const handleChangeEtp = (e) => {
    const updatedObject = { ...productData }
    updatedObject.etp = e.target.value
    setProductData(updatedObject)
  }

  const handleChangeCategory = (e) => {
    const categorySlug =
      e.target.options[e.target.selectedIndex].getAttribute('data-set')
    const updatedObject = { ...productData }
    updatedObject.category_name = e.target.value
    updatedObject.category = categorySlug
    setProductData(updatedObject)
  }

  const handleChangeLang = (e) => {
    Cookies.set('active-lang', e.target.value)
    router.push(`?product=${searchParams.get('product')}&lang=${e.target.value}`)
  }

  const deleteImg = (imgId) => {
    const localeImages = [...isLocaleImage.images]
    const lastLocaleImages = localeImages.filter((img) => img.id !== imgId)
    const localeImagesObj = {
      images: lastLocaleImages
    }
    setSelectedImg([])
    setIsLocaleImage(localeImagesObj)
  }

  const handleSelectProductImg = (imgId) => {
    const imgArr = isLocaleImage.images
    const selectedImg = imgArr.find((img) => img.id == imgId)
    setSelectedImg(selectedImg)
  }

  const handleDeleteImg = () => {
    console.log()
    if (typeof isActiveImgModal === 'number') {
      deleteImgDb(isActiveImgModal)
    } else {
      if (searchParams.get('product')) {
        const videoObj = {
          meal_slug: searchParams.get('product'),
          video: ''
        }
        editDeleteVideoDb(videoObj)
      }
    }
  }

  const changeProductImg = (e) => {
    if (typeof isActiveImgModal === 'number') {
      if (e.target.files[0]) {
        const editImgObj = {
          img_id: isActiveImgModal,
          image: e.target.files[0]
        }
        editImgDb(editImgObj)
      }
    } else {
      if (searchParams.get('product') && e.target.files[0]) {
        const videoObj = {
          meal_slug: searchParams.get('product'),
          video: e.target.files[0]
        }
        editDeleteVideoDb(videoObj)
      }
    }
  }

  const addPriceArea = () => {
    const randomId = Math.floor(Math.random() * 99999);
    const lastProductData = { ...productData }
    lastProductData.sizes.push({ id: randomId })
    setProductData(lastProductData)
  }


  const removePriceArea = (priceId) => {
    const lastProductData = { ...productData }
    const lastData = lastProductData.sizes.filter((price) => price.id !== priceId)
    lastProductData.sizes = lastData
    setProductData(lastProductData)
  }

  const handleCalorieData = (e) => {
    const updatedObject = { ...productData }
    updatedObject.calorie = e.target.value
    setProductData(updatedObject)
  }

  const handleChangeSize = (event, sizeId) => {
    const lastProductData = { ...productData }
    lastProductData.sizes.forEach((price) => {
      if (price.id === sizeId) {
        price.size = event.target.value
      }
    })
    setProductData(lastProductData)
  }

  const handleChangeSizePrice = (event, sizeId) => {
    const lastProductData = { ...productData }
    lastProductData.sizes.forEach((price) => {
      if (price.id === sizeId) {
        price.price = event.target.value
      }
    })
    setProductData(lastProductData)
  }

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      { id: inputs.length + 1, size_az: "", size_en: "", size_ru: "", size_ko: "", size_ar: "", price: "" }
    ]);
  };

  const handleRemoveInput = (id) => {
    setInputs(inputs.filter(input => input.id !== id));
  };

  const handleChange = (id, field, value) => {
    setInputs(inputs.map(input =>
      input.id === id ? { ...input, [field]: value } : input
    ));
  };

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
      <AdminLayout>
        <div className="w-full flex justify-between pr-[50px] pl-[30px] pb-[100px]">
          <div className="w-[53%] flex flex-col gap-[27px]">
            <div className="w-full mt-[12px] flex gap-[40px]">
              <div className={styles.paragraph}>
                <h1>{t("Product Text")}</h1>
                <select
                  onChange={handleChangeLang}
                  className="block w-64 p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  name="language"
                  id="lang"
                >
                  <option value="en" selected={langParam === 'en'}>EN</option>
                  <option value="az" selected={langParam === 'az'}>AZ</option>
                  <option value="ru" selected={langParam === 'ru'}>RU</option>
                  <option value="ko" selected={langParam === 'ko'}>KO</option>
                  <option value="ar" selected={langParam === 'ar'}>AR</option>
                </select>
              </div>
              <div className={styles.inputArea}>
                <label htmlFor="productOrder" className='mb-2'>{t("Product Order")}</label>
                <input id='productOrder' value={productData?.priority} onChange={(e) => setProductData((prev) => {
                  if(/[a-zA-Z]/.test(e.target.value)) return {...prev}
                  return { ...prev, priority: +e.target.value }
                })} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" placeholder={t("Product label")} />
              </div>
            </div>
            <div className=" w-full relative overflow-hidden rounded-[16px]">
              {((isLocaleImage?.images)?.length > 0 && isSelectedImg.length < 1) ?
                <div key={isLocaleImage?.images[(isLocaleImage?.images)?.length - 1]?.id}>
                  <Image
                    className="object-cover w-full h-full"
                    src={isLocaleImage?.images[(isLocaleImage?.images)?.length - 1]?.image}
                    width={1000}
                    height={1000}
                    alt="product-image"
                  />
                  <div className={styles.removeImage}>
                    <Image
                      src={edit}
                      width={32}
                      height={32}
                      alt="edit"
                      loading="lazy"
                      className="w-[32px] h-[32px]"
                    />
                  </div>
                </div>
                : (isLocaleImage?.images)?.length > 0 ?
                  <div key={isSelectedImg.id}>
                    <Image
                      className="object-cover w-full h-full"
                      src={isSelectedImg.image}
                      width={1000}
                      height={1000}
                      alt="product-image"
                    />
                    <div onClick={() => setIsActiveImgModal(isSelectedImg.id)} className={styles.removeImage}>
                      <Image
                        src={edit}
                        width={32}
                        height={32}
                        alt="edit"
                        loading="lazy"
                        className="w-[32px] h-[32px]"
                      />
                    </div>
                  </div>
                  :
                  <div className=" w-full relative overflow-hidden rounded-[16px]">
                    <Image
                      src={product}
                      width={1000}
                      height={1000}
                      alt="edit"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
              }
            </div>
            <div className='flex w-full justify-between'>
              <div className='flex flex-col w-3/4'>
                <div className='bg-[#E2E2E5] rounded-md py-2 text-center mb-4'>
                  <h3 className={styles.photo}>Foto</h3>
                </div>
                <div className="flex gap-4 w-full" style={{ borderRight: '1px solid #ccc' }}>
                  {isLocaleImage?.images?.length > 0 &&
                    isLocaleImage?.images?.map(img => (
                      <div key={img?.id} onClick={() => handleSelectProductImg(img.id)} className={isSelectedImg.id === img.id ? styles.activeProductImage : styles.productImageList}>
                        <Image
                          src={img?.image}
                          className="w-full h-full object-cover"
                          width={150}
                          height={150}
                          alt="product-image"
                        />
                      </div>
                    ))
                  }
                  {isLocaleImage?.images?.length < 4 &&
                    <div
                      type="file"
                      onChange={handleFileChange}
                      value=""
                      id="validatedCustomFile"
                      className={styles.productAddProduct}
                    >
                      <Image
                        src={addBtnImg}
                        width={32}
                        height={32}
                        alt="edit"
                        loading="lazy"
                        className="w-[32px] h-[32px]"
                      />
                      <input id="file-upload" type="file" />
                    </div>
                  }
                </div>
              </div>
              <div>
                <div className='bg-[#E2E2E5] rounded-md w-[103px]  py-2 text-center mb-4'>
                  <h3 className={styles.photo}>Video</h3>
                </div>
                {isLocaleImage?.video ?
                  <div
                    value=""
                    id="validatedCustomFile"
                    onClick={() => setIsActiveImgModal(isLocaleImage.video)}
                    className={isActiveImgModal ? styles.productAddProduct : styles.productVideo}
                  >
                    <Image
                      src={video}
                      width={300}
                      height={300}
                      alt="edit"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  :
                  <div
                    type="file"
                    onChange={handleVideoChange}
                    value=""
                    id="validatedCustomFile"
                    className={styles.productAddProduct}
                  >
                    <Image
                      src={addBtnImg}
                      width={32}
                      height={32}
                      alt="edit"
                      loading="lazy"
                      className="w-[32px] h-[32px]"
                    />
                    <input id="file-upload" type="file" />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className={styles.rightPanel}>
            <h1>{t('Add Product Form')}</h1>
            <div className={styles.rightContent}>
              <div className="flex flex-col gap-[8px]">
                <h1>{t('Product name')}</h1>
                <input
                  type="text"
                  onChange={handleChangeProduct}
                  value={productData[`name_${langParam}`] === null ? '' : productData[`name_${langParam}`]}
                  id="validationCustom18"
                  placeholder={t('Product name')}
                  required
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <h1>{t('Product Category')}</h1>
                <select
                  onChange={(e) => handleChangeCategory(e)}
                  id="validationCustom22"
                  required
                  value={productData?.category_name}
                >
                  {hotelSubCategoryData?.data?.results?.map((category, i) => (
                    <option
                      key={category?.id}
                      data-set={category?.slug}
                      value={category[`name_${pathname.split('/')[1]}`]}
                    >
                      {category[`name_${pathname.split('/')[1]}`]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-[20px] justify-between">
                <div className="flex flex-col gap-[8px] w-full">
                  <h1>{t('Price')}</h1>
                  <input
                    type="text"
                    onChange={(e) => handleChangePrice(e)}
                    value={productData?.price}
                    id="validationCustom25"
                    placeholder={t('Price')}
                    required
                  />
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  <h1>{t('Preparation Time')}</h1>
                  <input
                    type="text"
                    onChange={(e) => handleChangeEtp(e)}
                    value={productData?.etp}
                    id="validationCustom25"
                    placeholder={t('Preparation Time')}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <h1>{t("Kalori")}</h1>
                <input
                  type="text"
                  onChange={handleCalorieData}
                  value={productData?.calorie}
                  id="validationCustom25"
                  placeholder='100'
                  required
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <h1>{t('Meal Composition')}</h1>
                <textarea
                  rows={5}
                  id="validationCustom12"
                  onChange={handleChangeIngredient}
                  value={productData[`ingredient_${langParam}`] === null ? '' : productData[`ingredient_${langParam}`]}
                  placeholder={t('Meal Composition')}
                  required
                />
              </div>
              {inputs.map((input, index) => (
                <div key={input.id} className='flex items-center gap-4'>
                  <div className="flex gap-[20px] justify-between">
                    <div className="flex flex-col gap-[8px] w-full">
                      <h1>{t("Product size")}</h1>
                      <input
                        type="text"
                        value={input[`size_${langParam}`]}
                        onChange={(e) => handleChange(input.id, `size_${langParam}`, e.target.value)}
                        id="validationCustom25"
                        placeholder={t("Product size")}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-[8px] w-full">
                      <h1>{t('Price')}</h1>
                      <input
                        type="text"
                        id="validationCustom25"
                        placeholder={t('Price')}
                        value={input.price}
                        onChange={(e) => handleChange(input.id, 'price', e.target.value)}
                        required
                      />
                    </div>
                    <div className='flex pt-[34px]'>
                      {index === inputs.length - 1 ? (
                        <button onClick={handleAddInput}>
                          <Image src={plusBtn} alt='plus-btn' width={30} height={30} />
                        </button>
                      ) : (
                        <button onClick={() => handleRemoveInput(input.id)} >
                          <Image src={minusBtn} alt='minus-btn' width={30} height={30} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between">
                <div
                  className={`ms-list-item pl-0 ${styles.checkInputContainer}`}
                >
                  <label className={`ms-checkbox-wrap ${styles.radioContainer}`}>
                    <input
                      type="radio"
                      name="radioExample"
                      value="vegan"
                      checked={productData?.vegan}
                      onChange={handleChangeRadio}
                    />
                    <span className={styles.radioCheckmark}></span>
                  </label>
                  <span>{t("vegan")}</span>
                </div>
                <div
                  className={`ms-list-item pl-0 ${styles.checkInputContainer}`}
                >
                  <label className={`ms-checkbox-wrap ${styles.radioContainer}`}>
                    <input
                      defaultChecked
                      type="radio"
                      name="radioExample"
                      value="not-vegan"
                      checked={!productData?.vegan}
                      onChange={handleChangeRadio}
                    />
                    <span className={styles.radioCheckmark}></span>
                  </label>
                  <span>{t("notvegan")}</span>
                </div>
                <div
                  className={`ms-list-item pl-0 ${styles.checkInputContainer}`}
                >
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="checkbox1"
                      value="halal"
                      checked={productData.is_halal}
                      onChange={handleChangeHalal}
                    />
                    <span className={styles.checkboxCheckmark}></span>
                  </label>
                  <span>{t("halal")}</span>
                </div>
                <div
                  className={`ms-list-item pl-0 ${styles.checkInputContainer}`}
                >
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="checkbox2"
                      value="new"
                      checked={productData?.is_new}
                      onChange={handleChangeNew}
                    />
                    <span className={styles.checkboxCheckmark}></span>
                  </label>
                  <span>{t("new")}</span>
                </div>
              </div>
              <div className={styles.rightContentFooter}>
                <div className="flex items-center gap-2">
                  {productData?.is_active ? (
                    <input
                      type="checkbox"
                      onChange={(e) => handleChangeActiveProduct(e)}
                      checked
                      id="toggle"
                      className={styles.checkbox}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      onChange={(e) => handleChangeActiveProduct2(e)}
                      id="toggle"
                      className={styles.checkbox}
                    />
                  )}
                  <label for="toggle" className={styles.switch}></label>
                  <span>{t('InStock')}</span>
                </div>
                <button onClick={() => {
                  productData.sizes = inputs
                  console.log(productData)
                  editProduct(productData)
                }
                }>
                  {t('Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
      <Modal
        show={isActiveImgModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="h-[280px] w-[390px] bg-white p-40px flex flex-col items-center justify-center relative rounded-[10px] m-auto">
            <div
              onClick={() => setIsActiveImgModal(false)}
              type="button"
              className={`w-10px h-10px absolute right-0 top-7 ${styles.closeBtn}`}
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
            <div className="flex justify-between gap-[13px] mt-[30px]">
              <button onClick={handleDeleteImg} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Sil
              </button>
              <button onClick={changeProductImg} className="relative bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                <span>Yenisini yüklə</span>
                <input className='absolute opacity-0 left-0' onChange={changeProductImg} type="file" />
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default page

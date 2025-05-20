'use client'
import ProductsSlider from '@/components/AdminCommon/ProductsSlider/ProductsSlider'
import {
  HotelSubcategoryList,
  MealsListCreate,
  MealSubCategoryList
} from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import { GridLoader } from 'react-spinners'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import trash from '../../../../../assets/images/Admin/adminAddProduct/trash.svg'
import addBtnImg from '../../../../../assets/images/Admin/adminAddProduct/addBtnImg.svg'
import plusBtn from '../../../../../assets/images/Admin/adminAddProduct/plusBtn.svg'
import minusBtn from '../../../../../assets/images/Admin/adminAddProduct/minus.svg'
import videoPreview from '../../../../../assets/images/Admin/adminAddProduct/video-preview.jpg'

import styles from './addProduct.module.css'
import Cookies from 'js-cookie'
import { ref } from 'firebase/database'

const page = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [selectPreviewImgs, setSelectPreviewImgs] = useState([])
  const [inputs, setInputs] = useState([
    {
      id: 1,
      size_az: '',
      size_en: '',
      size_ru: '',
      size_ko: '',
      size_ar: '',
      price: ''
    }
  ])
  const [selectPreviewImg, setSelectPreviewImg] = useState(null)
  const [selectedValue, setSelectedValue] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [isHalal, setIsHalal] = useState(null)
  const [isNew, setIsNew] = useState(null)
  const [video, setVideo] = useState(null)
  const [productNameLang, setProductName] = useState({
    name_az: '',
    name_ko: '',
    name_ru: '',
    name_ar: '',
    name_en: ''
  })
  const [ingredientLang, setIngredient] = useState({
    ingredient_az: '',
    ingredient_ko: '',
    ingredient_ru: '',
    ingredient_ar: '',
    ingredient_en: ''
  })
  const t = useTranslations('Admin')
  const productNameRef = useRef(null)
  const selectRef = useRef(null)
  const priceRef = useRef(null)
  const mealCompRef = useRef(null)
  const preparationRef = useRef(null)
  const calorieRef = useRef(null)
  const pathname = usePathname()
  const searchParams = useSearchParams(null)
  const refs = useRef({})
  const priorityRef = useRef(null)
  const [isActiveLang, setIsActiveLang] = useState('')

  const queryClient = useQueryClient()

  const productName = productNameRef.current
  const price = priceRef.current
  const mealComp = mealCompRef.current
  const preparationTime = preparationRef.current

  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('lang')) {
      setIsActiveLang(searchParams.get('lang'));
    }
  }, [searchParams.get('lang')]);

  const { data: categoryData } = useQuery('category', MealSubCategoryList)
  const { data: hotelSubCategoryData } = useQuery(
    'subcategory-hotel-rest',
    () => HotelSubcategoryList(Cookies.get('hotel-rest-username'))
  )

  const { mutate: addProduct, isLoading } = useMutation({
    mutationFn: userData => MealsListCreate(userData),
    onSuccess: () => {
      location.href = `/${pathname.slice(1, 3)}/admin/products`
      toast.success('Product created successfully')
      queryClient.invalidateQueries(['meals'])
    },
    onError: () => {
      toast.error('Please, Enter Product Details...')
    }
  })

  const handleAddProduct = () => {
    const dataToSend = inputs.map(input => {
      return {
        size_az: input.size_az,
        size_en: input.size_en,
        size_ru: input.size_ru,
        size_ar: input.size_ar,
        size_ko: input.size_ko,
        price: input.price
        // id: input.id,
      }
    })

    const formattedArrayString = JSON.stringify(dataToSend)

    addProduct({
      ...productNameLang,
      ...ingredientLang,
      category: handleSelectCategory(),
      calorie: calorieRef.current.value,
      price: price?.value,
      image: selectPreviewImg,
      vegan: selectedValue,
      is_active: isChecked,
      is_halal: isHalal,
      is_new: isNew,
      etp: preparationTime.value,
      video: video,
      uploaded_images: { ...selectPreviewImgs },
      created_sizes: formattedArrayString,
      priority: priorityRef.current.value
    })
  }

  const handleSelectCategory = () => {
    return selectRef.current.value
  }

  const handleFileChange = event => {
    if (event.target.files[0].name.split('.')[1] === 'mp4') {
      setVideo(event.target.files[0])

      const lastSelectedFile = [...selectedFiles, videoPreview]
      setSelectedFiles(lastSelectedFile)

      return
    }
    const file = event.target.files[0]
    if (file) {
      setSelectPreviewImg(file)
      const lastPreviewImgs = [...selectPreviewImgs, file]
      setSelectPreviewImgs(lastPreviewImgs)
      const reader = new FileReader()
      reader.onload = e => {
        const lastSelectedFile = [...selectedFiles, e.target.result]
        setSelectedFiles(lastSelectedFile)
        // setSelectedFile(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      return
    }
  }

  const handleVeganValue = e => {
    if (e.target.checked) {
      setSelectedValue(true)
    }
  }

  const handleVeganValue2 = e => {
    if (e.target.checked) {
      setSelectedValue(false)
    }
  }

  const handleStockChange = () => {
    setIsChecked(!isChecked)
  }

  const handleChangeHalal = e => {
    setIsHalal(e.target.checked)
  }

  const handleChangeNew = e => {
    setIsNew(e.target.checked)
  }

  const handleChangeLang = e => {
    router.push(`?lang=${e.target.value}`)
    Cookies.set('active-lang', e.target.value)
    setIsActiveLang(e.target.value)
  }

  const handleProductName = e => {
    const updatedObject = { ...productNameLang }
    updatedObject[`name_${isActiveLang}`] = e.target.value
    setProductName(updatedObject)
  }

  const handleChangeIngredient = e => {
    const updatedObject = { ...ingredientLang }
    updatedObject[`ingredient_${isActiveLang}`] = e.target.value
    setIngredient(updatedObject)
  }

  const handleDeleteImg = () => {
    const updatedArr = [...selectedFiles]
    if (updatedArr.length > 0) {
      updatedArr.pop()
      setSelectedFiles(updatedArr)
    }
  }

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        id: inputs.length + 1,
        size_az: '',
        size_en: '',
        size_ru: '',
        size_ko: '',
        size_ar: '',
        price: ''
      }
    ])
  }

  const handleRemoveInput = id => {
    setInputs(inputs.filter(input => input.id !== id))
  }

  const handleChange = (id, field, value) => {
    setInputs(
      inputs.map(input =>
        input.id === id ? { ...input, [field]: value } : input
      )
    )
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

  return (
    <AdminLayout>
      <div className='w-full flex justify-between pr-[50px] pl-[30px] pb-[100px]'>
        <div className='w-[53%] flex flex-col gap-[27px]'>
          <div className='w-full mt-[12px] flex items-center gap-[40px]'>
            <div className={styles.paragraph}>
              <h1>{t("Product Text")}</h1>
              <select
                onChange={handleChangeLang}
                className='block w-64 p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                name='language'
                id='lang'
              >
                <option value='en' selected={searchParams.get('lang') === 'en'}>
                  EN
                </option>
                <option value='az' selected={searchParams.get('lang') === 'az'}>
                  AZ
                </option>
                <option value='ru' selected={searchParams.get('lang') === 'ru'}>
                  RU
                </option>
                <option value='ko' selected={searchParams.get('lang') === 'ko'}>
                  KO
                </option>
                <option value='ar' selected={searchParams.get('lang') === 'ar'}>
                  AR
                </option>
              </select>
            </div>
            <div className={styles.inputArea}>
              <label htmlFor='productOrder' className='mb-2'>
               {t("Product Order")}
              </label>
              <input
                id='productOrder'
                ref={priorityRef}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                type='number'
                placeholder={t("Product Order")}
              />
            </div>
          </div>
          <div className='h-[600px] w-full relative overflow-hidden rounded-[16px]'>
            {selectedFiles.length === 0 ? (
              <ProductsSlider selectedFile={null} />
            ) : (
              <ProductsSlider
                selectedFile={
                  selectedFiles.length === 1
                    ? selectedFiles[0]
                    : selectedFiles[selectedFiles.length - 1]
                }
              />
            )}
            <div className={styles.removeImage} onClick={handleDeleteImg}>
              <Image
                src={trash}
                width={32}
                height={32}
                alt='trash'
                loading='lazy'
                className='w-[32px] h-[32px]'
              />
            </div>
          </div>
          <div className='flex gap-4'>
            {selectedFiles.length === 0 ? (
              <div className={styles.productImageList}>
                <ProductsSlider selectedFile={null} />
              </div>
            ) : (
              selectedFiles.map(selectedFile => (
                <div className={styles.productImageList}>
                  <ProductsSlider selectedFile={selectedFile} />
                </div>
              ))
            )}
            {selectedFiles.length < 5 && (
              <div
                type='file'
                multiple
                onChange={handleFileChange}
                id='validatedCustomFile'
                className={styles.productAddProduct}
              >
                <Image
                  src={addBtnImg}
                  width={32}
                  height={32}
                  alt='trash'
                  loading='lazy'
                  className='w-[32px] h-[32px]'
                />
                <input id='file-upload' type='file' multiple />
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightPanel}>
          <h1>{t('Add Product Form')}</h1>
          <div className={styles.rightContent}>
            <div className='flex flex-col gap-[8px]'>
              <h1>{t('Product name')}</h1>
              <input
                type='text'
                ref={productNameRef}
                value={productNameLang[`name_${isActiveLang}`]}
                onChange={handleProductName}
                id='validationCustom18'
                placeholder={t('Product name')}
                required
              />
            </div>
            <div className='flex flex-col gap-[8px]'>
              <h1>{t('Product Category')}</h1>
              <select
                ref={selectRef}
                onChange={handleSelectCategory}
                id='validationCustom22'
              >
                {hotelSubCategoryData?.data?.results?.map((category, i) => (
                  <option
                    key={category?.id}
                    value={category[`name_${pathname.split('/')[1]}`]}
                  >
                    {category[`name_${pathname.split('/')[1]}`]}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex gap-[20px] justify-between'>
              <div className='flex flex-col gap-[8px] w-full'>
                <h1>{t('Price')}</h1>
                <input
                  type='text'
                  ref={priceRef}
                  id='validationCustom25'
                  placeholder={t('Price')}
                  required
                />
              </div>
              <div className='flex flex-col gap-[8px] w-full'>
                <h1>{t('Preparation Time')}</h1>
                <input
                  type='text'
                  ref={preparationRef}
                  id='validationCustom25'
                  placeholder={t('Preparation Time')}
                  required
                />
              </div>
            </div>
            <div className='flex flex-col gap-[8px] w-full'>
              <h1>{t("Kalori")}</h1>
              <input
                type='text'
                ref={calorieRef}
                id='validationCustom25'
                placeholder='100'
                required
              />
            </div>
            <div className='flex flex-col gap-[8px]'>
              <h1>{t('Meal Composition')}</h1>
              <textarea
                rows={5}
                onChange={handleChangeIngredient}
                value={ingredientLang[`ingredient_${isActiveLang}`]}
                ref={mealCompRef}
                id='validationCustom12'
                placeholder={t('Meal Composition')}
                required
              />
            </div>
            {inputs.map((input, index) => (
              <div key={input.id} className='flex items-center gap-4'>
                <div className='flex gap-[20px] justify-between'>
                  <div className='flex flex-col gap-[8px] w-full'>
                    <h1>{t("Product size")}</h1>
                    <input
                      type='text'
                      value={input[`size_${searchParams.get('lang')}`]}
                      onChange={e =>
                        handleChange(
                          input.id,
                          `size_${searchParams.get('lang')}`,
                          e.target.value
                        )
                      }
                      id='validationCustom25'
                      placeholder={t("Product size")}
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-[8px] w-full'>
                    <h1>{t('Price')}</h1>
                    <input
                      type='text'
                      id='validationCustom25'
                      placeholder={t('Price')}
                      value={input.price}
                      onChange={e =>
                        handleChange(input.id, 'price', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className='flex pt-[34px]'>
                    {index === inputs.length - 1 ? (
                      <button onClick={handleAddInput}>
                        <Image
                          src={plusBtn}
                          alt='plus-btn'
                          width={30}
                          height={30}
                        />
                      </button>
                    ) : (
                      <button onClick={() => handleRemoveInput(input.id)}>
                        <Image
                          src={minusBtn}
                          alt='minus-btn'
                          width={30}
                          height={30}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className='flex justify-between'>
              <div
                className={`ms-list-item pl-0 ${styles.checkInputContainer}`}
              >
                <label className={`ms-checkbox-wrap ${styles.radioContainer}`}>
                  <input
                    type='radio'
                    name='radioExample'
                    value={true}
                    onChange={e => handleVeganValue(e)}
                  />{' '}
                  <span className={styles.radioCheckmark}></span>
                </label>{' '}
                <span> {t("vegan")}</span>
              </div>
              <div
                className={`ms-list-item pl-0 ${styles.checkInputContainer}`}
              >
                <label className={`ms-checkbox-wrap ${styles.radioContainer}`}>
                  <input
                    type='radio'
                    name='radioExample'
                    value={false}
                    defaultChecked
                    onChange={e => handleVeganValue2(e)}
                  />{' '}
                  <span className={styles.radioCheckmark}></span>
                </label>{' '}
                <span>{t("notvegan")}</span>
              </div>
              <div
                className={`ms-list-item pl-0 ${styles.checkInputContainer}`}
              >
                <label className={styles.checkboxContainer}>
                  <input
                    type='checkbox'
                    name='checkbox1'
                    value='halal'
                    className='mr-2'
                    checked={isHalal}
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
                    type='checkbox'
                    name='checkbox2'
                    value='new'
                    className='mr-2'
                    checked={isNew}
                    onChange={handleChangeNew}
                  />
                  <span className={styles.checkboxCheckmark}></span>
                </label>
                <span>{t("new")}</span>
              </div>
            </div>
            <div className={styles.rightContentFooter}>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={isChecked}
                  onChange={handleStockChange}
                  defaultChecked
                  id='toggle'
                  className={styles.checkbox}
                />
                <label for='toggle' className={styles.switch}></label>
                <span>{t('InStock')}</span>
              </div>
              <button onClick={handleAddProduct} type='submit'>
                {t('Add Product')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default page

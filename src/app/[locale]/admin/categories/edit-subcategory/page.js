'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  MealCategoryCreate,
  MealCategoryList,
  MealSubCategoryCreate,
  MealSubCategoryList,
  MealSubCategoryRead,
  MealSubCategoryUpdate,
} from '@/services/api/dataApi'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'

const Page = () => {
  const [categoryName, setCategoryName] = useState('')
  const [subCategoryOrder, setSubCategoryOrder] = useState(null)
  const [mainCategorySlug, setMainCategorySlug] = useState(null)
  const [mainCategoryName, setMainCategoryName] = useState(null)
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Admin')

  const { data: mealMainCategoryData, isLoading } = useQuery(
    'category',
    MealCategoryList
  )
  const { _ } = useQuery(
    ['subcategories'],
    () => MealSubCategoryRead(localStorage.getItem('editSubCategory')),
    {
      onSuccess: (data) => {
        setCategoryName(data?.data?.name)
        setSubCategoryOrder(data?.data?.order)
        setMainCategoryName(data?.data?.main_category?.name)
        setMainCategorySlug(data?.data?.main_category?.slug)
      },
    }
  )

  const mutation = useMutation((data) => MealSubCategoryUpdate(data), {
    onSuccess: (response) => {
      toast.success('Updated Subcategory!')
      queryClient.invalidateQueries(['subcategory'])
      router.push(`/${pathname.slice(1, 3)}/admin/categories`)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleChangeMainCategorySlug = (e) => {
    const selectedMainCategorySlug =
      e.target.options[e.target.selectedIndex].getAttribute('data-id')
    setMainCategoryName(e.target.value)
    setMainCategorySlug(selectedMainCategorySlug)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    mutation.mutate({
      name: categoryName,
      order: subCategoryOrder,
      main_category_slug: mainCategorySlug
        ? mainCategorySlug
        : mealMainCategoryData?.data[0]?.slug,
    })
  }

  return (
    <AdminLayout>
      <div className="ms-content-wrapper flex justify-center">
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="ms-panel ms-panel-fh w-[420px]">
              <div className="ms-panel-header">
                <h6>{t('Add Subcategory Form')}</h6>
              </div>
              <div className="ms-panel-body">
                <form
                  className="needs-validation clearfix"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="form-row">
                    <div className="col-md-12 mb-8">
                      <label htmlFor="validationCustom18">
                        {t('Subcategory Name')}
                      </label>
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom18"
                          placeholder={t('Category Name')}
                          required
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <div className="valid-feedback">{t('Looks good!')}</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="validationCustom18">
                        {t('Subcategory Order')}
                      </label>
                      <div className="input-group mt-2">
                        <input
                          type="number"
                          className="form-control"
                          id="validationCustom18"
                          placeholder={t('Category Order')}
                          required
                          value={subCategoryOrder}
                          onChange={(e) => setSubCategoryOrder(e.target.value)}
                        />
                        <div className="valid-feedback">{t('Looks good!')}</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        for="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Hansı Əsas Kateqoriyaya Aiddir?
                      </label>
                      <select
                        id="countries"
                        value={mainCategoryName}
                        onChange={(e) => handleChangeMainCategorySlug(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {mealMainCategoryData?.data?.map((mainCategory, i) => (
                          <option key={i} data-id={mainCategory.slug}>
                            {mainCategory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="ms-panel-header new">
                <button
                  className="btn btn-secondary d-block"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {t('Edit')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Page

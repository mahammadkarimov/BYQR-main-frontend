'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { MealCategoryRead, MealCategoryUpdate } from '@/services/api/dataApi'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

const page = () => {
  const [categoryData, setCategoryData] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const router = useRouter()
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const t = useTranslations('Admin')

  const body = {
    name: categoryData?.name,
    icon: selectedImage ? selectedImage : null,
    order: categoryData?.order,
  }

  const mutation = useMutation((data) => MealCategoryUpdate(data), {
    onSuccess: () => {
      router.push(`/${pathname.slice(1, 3)}/admin/categories`)
      toast.success(t('Edited successfully'))
      queryClient.invalidateQueries(['category'])
    },
    onError: () => {
      toast.error(t('Oops, Something went wrong!'))
    },
  })

  const { _ } = useQuery(
    ['categories'],
    () => MealCategoryRead(localStorage.getItem('editCategory')),
    {
      onSuccess: (data) => {
        const updatedObject = { ...categoryData }
        updatedObject.name = data?.data?.name
        updatedObject.icon = data?.data?.icon
        updatedObject.order = data?.data?.order
        setCategoryData(updatedObject)
      },
    }
  )

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
    } else {
      return
    }
  }

  const handleSubmit = () => {
    mutation.mutate(body)
  }

  const handleChangeCategoryName = (e) => {
    const updatedObject = { ...categoryData }
    updatedObject.name = e.target.value
    setCategoryData(updatedObject)
  }

  const handleChangeCategoryOrder = (e) => {
    const updatedObject = { ...categoryData }
    updatedObject.order = e.target.value
    setCategoryData(updatedObject)
  }

  return (
    <AdminLayout>
      <div className="ms-content-wrapper flex justify-center">
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="ms-panel ms-panel-fh">
              <div className="ms-panel-header">
                <h6>{t('Edit Category Form')}</h6>
              </div>
              <div className="ms-panel-body">
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation clearfix"
                  noValidate
                >
                  <div className="form-row">
                    <div className="col-md-12 mb-4">
                      <label htmlFor="validationCustom18">
                        {t('Category Name')}
                      </label>
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom18"
                          placeholder={t('Category Name')}
                          required
                          value={categoryData?.name}
                          onChange={(e) => handleChangeCategoryName(e)}
                        />
                        <div className="valid-feedback">{t('Looks good!')}</div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-4">
                      <label htmlFor="validationCustom18">
                        {t('Category Order')}
                      </label>
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom18"
                          placeholder={t('Category Order')}
                          required
                          value={categoryData?.order}
                          onChange={(e) => handleChangeCategoryOrder(e)}
                        />
                        <div className="valid-feedback">{t('Looks good!')}</div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label
                        htmlFor="validationCustom12"
                        style={{ marginBottom: '10px' }}
                      >
                        {t('New Category Icon')}
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
                          {selectedImage
                            ? selectedImage.name
                            : t('Upload Images')}
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
                  onClick={handleSubmit}
                  className="btn btn-secondary d-block"
                  type="submit"
                >
                  {t('Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default page

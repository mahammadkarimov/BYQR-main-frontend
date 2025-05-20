'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import { useMutation, useQueryClient } from 'react-query'
import { MealCategoryCreate } from '@/services/api/dataApi'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const Page = () => {
  const [categoryName, setCategoryName] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [categoryOrder, setCategoryOrder] = useState(null)
  const [categoryPriority, setCategoryPriority] = useState()
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Admin')

  const body = {
    name: categoryName,
    icon: selectedImage ? selectedImage : '',
    order: categoryOrder,
  }

  const mutation = useMutation((data) => MealCategoryCreate(data), {
    onSuccess: (response) => {
      console.log('success', response)
      queryClient.invalidateQueries(['category'])
      router.push(`/${pathname.slice(1, 3)}/admin/categories`)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const handleChangeCategoryOrder = (e) => {
    setCategoryOrder(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    mutation.mutate(body)
  }

  return (
    <AdminLayout>
      <div className="ms-content-wrapper flex justify-center">
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="ms-panel ms-panel-fh">
              <div className="ms-panel-header">
                <h6>{t('Add Category Form')}</h6>
              </div>
              <div className="ms-panel-body">
                <form
                  className="needs-validation clearfix"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="form-row">
                    <div className="col-md-12 mb-12">
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
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
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
                          value={categoryOrder}
                          onChange={(e) => handleChangeCategoryOrder(e)}
                        />
                        <div className="valid-feedback">{t('Looks good!')}</div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label
                        htmlFor="validatedCustomFile"
                        style={{ marginBottom: '10px' }}
                      >
                        {t('Category Icon')}
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
                  className="btn btn-secondary d-block"
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
    </AdminLayout>
  )
}

export default Page

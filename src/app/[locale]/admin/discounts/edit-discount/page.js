'use client'
import { DiscountsRead, DiscountsUpdate } from '@/services/api/dataApi'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'

const page = () => {
  const [editDiscount, setEditDiscount] = useState()
  const [selectedFile, setSelectedFile] = useState(null)
  const selEditDiscount = useSelector(
    (state) => state.editproduct.editDiscountSlug
  )
  const router = useRouter()
  const queryClient = useQueryClient()
  const pathname = usePathname()

  const { data: mealDiscount } = useQuery(
    ['discounts', Cookies.get('discountSlug')],
    () => DiscountsRead(Cookies.get('discountSlug')),
    {
      onSuccess: (data) => {
        const updatedObject = { ...editDiscount }
        updatedObject.name = data?.data?.name
        updatedObject.slug = data?.data?.slug
        updatedObject.image = data?.data?.image
        setEditDiscount(updatedObject)
        console.log(editDiscount)
      },
    }
  )

  const { mutate: EditDiscount } = useMutation({
    mutationFn: (editDiscount) => DiscountsUpdate(editDiscount),
    onSuccess: () => {
      toast.success('Edited discount successfully...')
      queryClient.invalidateQueries('discounts')
      router.push(`/${pathname.slice(1, 3)}/admin/discounts`)
    },
    onError: () => {
      toast.error('Oops, Something went wrong!')
    },
  })

  const handleChangeName = (e) => {
    const updatedObject = { ...editDiscount }
    updatedObject.name = e.target.value
    setEditDiscount(updatedObject)
  }

  const handleEditDiscount = () => {
    if (!selectedFile) {
      editDiscount.image = null
      EditDiscount(editDiscount)
    } else {
      editDiscount.image = selectedFile
      EditDiscount(editDiscount)
    }
  }

  const handleChangeImg = (e) => {
    const file = e.target.files[0]

    if (file) {
      setSelectedFile(file)
      const updatedObject = { ...editDiscount }
      updatedObject.image = file
      setEditDiscount(updatedObject)
    } else {
      return
    }
  }

  return (
    <AdminLayout>
      <div className="ms-content-wrapper flex justify-center">
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="ms-panel ms-panel-fh">
              <div className="ms-panel-header">
                <h6>Edit Discount Form</h6>
              </div>
              <div className="ms-panel-body">
                <form className="needs-validation clearfix" noValidate>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom18">Discount Name</label>
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => handleChangeName(e)}
                          value={editDiscount?.name}
                          id="validationCustom18"
                          placeholder="Discount Name"
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-8">
                      <label
                        htmlFor="validationCustom25"
                        style={{ marginBottom: '10px' }}
                      >
                        Discount Expired Time
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom25"
                          placeholder="20.04.2023"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label
                        htmlFor="validationCustom12"
                        style={{ marginBottom: '10px' }}
                      >
                        Discount Image
                      </label>
                      <div className="custom-file">
                        <input
                          type="file"
                          onChange={(e) => handleChangeImg(e)}
                          className="custom-file-input"
                          id="validatedCustomFile"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="validatedCustomFile"
                        >
                          Upload Images...
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
                  className="btn btn-primary d-block"
                  onClick={() => handleEditDiscount()}
                  type="submit"
                >
                  Edit
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

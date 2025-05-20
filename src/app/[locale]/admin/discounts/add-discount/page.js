'use client'
import { DiscountsCreate } from '@/services/api/dataApi'
import { usePathname, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'

const page = () => {
  const [selectPreviewImg, setSelectPreviewImg] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const pathname = usePathname()
  const discountNameRef = useRef(null)
  const expiredTimeRef = useRef(null)
  const discountName = discountNameRef.current
  const expiredTime = expiredTimeRef.current

  const { mutate: addDiscount } = useMutation({
    mutationFn: (dicountData) => DiscountsCreate(dicountData),
    onSuccess: () => {
      location.href = `/${pathname.slice(1, 3)}/admin/discounts`
      toast.success('Product created successfully')
    },
    onError: () => {
      toast.error('Please, Enter Product Details...')
    },
  })

  const handleAddDiscount = () => {
    addDiscount({
      name: discountName?.value,
      image: selectPreviewImg,
      expiration_date: expiredTime?.value,
    })
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectPreviewImg(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedFile(e.target.result)
      }
      reader.readAsDataURL(file)
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
                <h6>Add Discount Form</h6>
              </div>
              <div className="ms-panel-body">
                <form className="needs-validation clearfix" noValidate>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom18">Discount Name</label>
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          ref={discountNameRef}
                          className="form-control"
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
                          ref={expiredTimeRef}
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
                          enctype="multipart/form-data"
                          onChange={(event) => handleFileChange(event)}
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
                  className="btn btn-secondary d-block"
                  onClick={() => handleAddDiscount()}
                  type="submit"
                >
                  Add
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

'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import Image from 'next/image'
import AdminAddBtn from '@/components/AdminCommon/AdminAddBtn/AdminAddBtn'
import { Modal } from 'react-bootstrap'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DiscountsDelete, DiscountsList, MealsDelete } from '@/services/api/dataApi'
import { toast } from 'react-toastify'
import { GridLoader } from 'react-spinners'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'

export const btnData = {
    categoryName: 'Add Discount',
    categoryUrl: 'discounts/add-discount'
}

const page = () => {
    const [isActiveDelModal, setIsActiveDelModal] = useState(false)
    const [activeDiscountSlug, setActiveDiscountSlug] = useState('')
    const pathname = usePathname()
    const queryClient = useQueryClient()
    const { data: discountData, isLoading } = useQuery('discounts', DiscountsList)

    const { mutate: delDiscount } = useMutation({
        mutationFn: (discountSlug) => DiscountsDelete(discountSlug),
        onSuccess: () => {
            setIsActiveDelModal(false)
            toast.success('Product deleted successfully')
            queryClient.invalidateQueries(['discounts'])
        },
        onError: () => {
            toast.error("Oops, Something went wrong!")
        },
    });

    const handleEditDiscount = (discountSlug) => {
        Cookies.set('discountSlug', discountSlug)
        location.href = `/${pathname.slice(1,3)}/admin/discounts/edit-discount`
    }

    const handleDelModal = (discountSlug) => {
        setIsActiveDelModal(true)
        setActiveDiscountSlug(discountSlug)
    }

    const handleDeleteDiscount = () => {
        delDiscount(activeDiscountSlug)
    }

    if (isLoading) {
        return <div className='flex justify-center items-center mx-0 h-[100vh] my-auto'>
            <GridLoader
                color="#FF1212"
                loading={isLoading ? true : false}
                size={15}
            />
        </div>
    }

    return (
        <AdminLayout>
            <div className="ms-content-wrapper box">
                <div className='mb-6 flex justify-end'>
                    <AdminAddBtn>
                        {btnData}
                    </AdminAddBtn>
                </div>
                <div className="row">
                    {discountData?.data?.results?.map((discount, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                            <div className="ms-card">
                                <div className="ms-card-img">
                                    <Image src={discount?.image} width={500} height={500} alt="card_img" />
                                </div>
                                <div className="ms-card-body ">
                                    <div className="wrapper-new2 ">
                                        <h6>{discount?.name}</h6>
                                    </div>
                                    <div className="wrapper-new1">
                                        {/* <span>Total Order: <strong className="color-red">{item.order}</strong> </span> */}
                                    </div>
                                    <button onClick={() => handleEditDiscount(discount?.slug)} className="btn btn-secondary btn-md btn-block mr-4">Edit</button>
                                    <button onClick={() => handleDelModal(discount?.slug)} className="btn btn-primary btn-md btn-block">Remove</button>
                                </div>
                            </div>
                        </div>
                    )).reverse()}
                </div>
            </div>
            {
                isActiveDelModal &&
                <Modal show='true' aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header className="bg-primary">
                        <h3 className="modal-title ms-icon-round text-[20px] text-white"><i className="flaticon-placeholder bg-primary text-white" />Do you want to sure delete product?</h3>
                        <button onClick={() => setIsActiveDelModal(false)} type="button" className="close"><span aria-hidden="true" className='text-2xl'>×</span></button>
                    </Modal.Header>
                    <Modal.Footer>
                        <button type="button" onClick={() => setIsActiveDelModal(false)} className="btn btn-light">Cancel</button>
                        <button type="button" onClick={() => handleDeleteDiscount()} className="btn btn-primary shadow-none">Delete</button>
                    </Modal.Footer>
                </Modal>
            }
        </AdminLayout>
    )
}

export default page
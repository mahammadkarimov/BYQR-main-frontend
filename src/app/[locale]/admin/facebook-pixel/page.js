'use client'
import React from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import FacebookPixel from '../../../../components/Admin/FacebookPixel/index'
import FacebookPixelModal from '../../../../components/Admin/FacebookPixel/FacebookPixelModal/index'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (
        <AdminLayout>
            <FacebookPixel pathname={pathname} router={router} />
            <FacebookPixelModal router={router} searchParams={searchParams} />
        </AdminLayout>
    )
}

export default page
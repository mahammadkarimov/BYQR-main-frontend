'use client'
import React from 'react'
import AdminLayout from '../../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import Header from '../../../../../../components/Admin/MobileApp/MobileEvent/MobileAdd/Header/index'
import Body from '../../../../../../components/Admin/MobileApp/MobileEvent/MobileAdd/Body/index'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (
        <AdminLayout>
            <Header searchParams={searchParams} />
            <Body router={router} pathname={pathname} searchParams={searchParams} />
        </AdminLayout>
    )
}

export default page
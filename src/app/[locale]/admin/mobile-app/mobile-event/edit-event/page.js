'use client'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import Header from '../../../../../../components/Admin/MobileApp/MobileEvent/EventEdit/Header/index'
import Body from '../../../../../../components/Admin/MobileApp/MobileEvent/EventEdit/Body/index'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from 'react-query'
import { getEvent, getEventGenre, getMusicType } from '@/services/api/dataApi'

const page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [eventData, setEventData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { _, refetch } = useQuery('event-data', () => getEvent(searchParams.get('eventId')), {
        onSuccess: (data) => {
            setEventData(data?.data)
            setIsLoading(false)
        }
    })

    const { data: genreData } = useQuery(['event-genre'], () => getEventGenre())
    const { data: musicTypeData } = useQuery(['musict-type'], () => getMusicType())

    useEffect(() => {
        refetch()
    }, [searchParams.get('eventId'), refetch])

    if(isLoading){
        return null
    }     

    return (
        <AdminLayout>
            <Header searchParams={searchParams} />
            <Body eventData={eventData} isLoading={isLoading} eventId={searchParams.get('eventId')} genreData={genreData} musicTypeData={musicTypeData}  setEventData={setEventData} router={router} pathname={pathname} searchParams={searchParams} />
        </AdminLayout>
    )
}

export default page
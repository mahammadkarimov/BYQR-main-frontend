'use client'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import Container from '../../../../../components/Admin/MobileApp/MobileEvent/Container/index'
import Header from '../../../../../components/Admin/MobileApp/MobileEvent/Header/index'
import SearchInput from '../../../../../components/Admin/MobileApp/MobileEvent/SearchInput/index'
import Body from '../../../../../components/Admin/MobileApp/MobileEvent/Body/index'
import Pagination from '../../../../../components/Admin/MobileApp/MobileEvent/Pagination/index'
import DeleteModal from '../../../../../components/Admin/MobileApp/DeleteModal/index'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { deleteRestEvent, getAllEvents, getEvents } from '@/services/api/dataApi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

const page = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const queryClient = useQueryClient()
    const [searchEvent, setSearchEvent] = useState('')

    const { data: events, refetch } = useQuery('events', () => getEvents(searchParams.get('offset')))
    const { data: allEvents, refetch: refetch2 } = useQuery('all-events', () => getAllEvents())
    const { mutate: deleteEvent } = useMutation(['delete-event'], (id) => deleteRestEvent(id), {
        onSuccess: () => {
            router.back()
            toast.success('Uğurla silindi!')
            queryClient.invalidateQueries('events')
        },
        onError: () => {
            toast.error('Gözlənilməz xəta baş verdi!')
        }
    })

    useEffect(() => {
        refetch();
        refetch2()
    }, [searchParams.get('offset'), refetch]);

    return (
        <AdminLayout>
            <Container>
                <Header router={router} pathname={pathname} />
                <SearchInput setSearchEvent={setSearchEvent} searchEvent={searchEvent} />
                <Body searchEvent={searchEvent} allEvents={allEvents} events={events} router={router} pathname={pathname} />
                {!searchEvent && <Pagination searchParams={searchParams} pathname={pathname} router={router} pageCount={Math.ceil(events?.data?.count / 5)} />}
                <DeleteModal deleteEvent={deleteEvent} router={router} searchParams={searchParams} />
            </Container>
        </AdminLayout>
    )
}

export default page
'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import SearchInput from '../../../../components/Admin/Museum/SearchInput/index'
import Container from '../../../../components/Admin/Museum/Container/index'
import TopBtn from '../../../../components/Admin/Museum/TopBtn/index'
import Table from '../../../../components/Admin/Museum/Table/index'
import DeleteModal from '../../../../components/Admin/Museum/DeleteModal/index'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteExhibit, getExhibit, getQrCodes } from '@/services/api/dataApi'
import { toast } from 'react-toastify'

const page = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const [searchedVal, setSearchedVal] = useState('')

  const { data: exhibitsData } = useQuery(['exhibit', searchedVal], () =>
    getExhibit(searchedVal)
  )
  
  const { mutate: delExhibit } = useMutation(
    ['del-exhibit'],
    ids => deleteExhibit(ids),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('exhibit')
        router.back()
        toast.success('Eksponat uğurla silindi..')
        console.log('success')
      },
      onError: () => {
        toast.error('Gözlənilməz xəta baş verdi..')
        router.back()
        console.log('error')
      }
    }
  )

  return (
    <AdminLayout>
      <Container>
        <SearchInput setSearchedVal={setSearchedVal} />
        <TopBtn qrCodes={exhibitsData} router={router} pathname={pathname} />
      </Container>
      <Table
        searchParams={searchParams}
        pathname={pathname}
        router={router}
        exhibitsData={exhibitsData}
        queryClient={queryClient}
        museumId={exhibitsData?.data[0]?.museum?.id}
      />
      {searchParams.get('delModal') && (
        <DeleteModal
          searchParams={searchParams}
          delExhibit={delExhibit}
          museumId={exhibitsData?.data[0]?.museum?.id}
          router={router}
        />
      )}
    </AdminLayout>
  )
}

export default page

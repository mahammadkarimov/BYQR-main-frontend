'use client'
import React from 'react'
import AdminLayout from '../../../components/AdminCommon/AdminLayout/AdminLayout'
import styles from '../../../components/Admin/AdminEntry/style.module.css'
import AdminEntry from '@/components/Admin/AdminEntry/AdminEntry'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createRestCampaign, createRestInfo, deleteCampaign, getInfo, getInfo2, getRestCampaign, putRestInfo } from '../../../services/api/dataApi'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

const page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const t = useTranslations('Home')

  const { data: restaurantCampaign, refetch: refetch2 } = useQuery('campaign', getRestCampaign, {
    onSuccess: () => {
      console.log('success')
    }
  })

  const { data: restInfo, refetch } = useQuery('info', getInfo, {
    onSuccess: () => {
      console.log('success1')
    }
  })

  const { data: restInfo2, refetch: refetch3 } = useQuery('info2', getInfo2, {
    onSuccess: () => {
      console.log('success2')
    }
  })

  const { mutate: createCampaign } = useMutation(['restaurant-campaign'], (data) => createRestCampaign(data), {
    onSuccess: () => {
      toast.success('Kampaniya uğurla yaddaşda saxlanıldı!')
      queryClient.invalidateQueries('campaign')
      router.back()
    },
    onError: () => {
      toast.error('Gözlənilməz xəta baş verdi!')
      router.back()
    }
  })

  const { mutate: deleteRestCampaign } = useMutation(['restaurant-campaign'], deleteCampaign, {
    onSuccess: () => {
      toast.success('Kampaniya uğurla silindi!')
      queryClient.invalidateQueries('campaign')
      router.back()
    },
    onError: (err) => {
      toast.error('Gözlənilməz xəta baş verdi!')
      router.back()
    }
  })

  const { mutate: createInfo } = useMutation(['restaurant-info'], (data) => createRestInfo(data), {
    onSuccess: () => {
      toast.success('Məlumatlar uğurla yaddaşda saxlanıldı!')
      queryClient.invalidateQueries('info')
      router.back()
    },
    onError: (err) => {
      console.log(err)
      toast.error('Gözlənilməz xəta baş verdi!')
      router.back()
    }
  })

  const { mutate: putInfo } = useMutation(['restaurant-info'], (data) => putRestInfo(data), {
    onSuccess: () => {
      toast.success('Məlumatlar uğurla yaddaşda saxlanıldı!')
      queryClient.invalidateQueries('info2')
      router.push(`/${pathname.split('/')[1]}/admin?info=true`)
    },
    onError: (err) => {
      console.log(err)
      toast.error('Gözlənilməz xəta baş verdi!')
      router.back()
    }
  })

  return (
    <AdminLayout>
      <div className={styles.contain}>
        <div className={styles.head}>
          <h1>{t('Welcome to BYQR!')}</h1>
          <span>{t('In this admin panel you can easily manage your business')}</span>
        </div>
        <AdminEntry t={t} refetch3={refetch3} restInfo2={restInfo2} putInfo={putInfo} refetch2={refetch2} deleteRestCampaign={deleteRestCampaign} refetch={refetch} restInfo={restInfo} createInfo={createInfo} createCampaign={createCampaign} restaurantCampaign={restaurantCampaign} router={router} pathname={pathname} searchParams={searchParams} />
      </div>
    </AdminLayout>
  )
}

export default page
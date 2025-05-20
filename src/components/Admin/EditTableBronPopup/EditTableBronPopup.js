'use client'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import {
  GetRestaurantBronTableWithSlug,
  RestaurantBronTableUpdate,
} from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [tableBronData, setTableBronData] = useState()
  const [isActivePopup, setIsActivePopup] = useState(false)
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [bronName, setBronName] = useState('')
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams(null)
  const t = useTranslations('Admin')

  useEffect(() => {
    if (searchParams.get('bron') === 'edit-bron') {
      setIsActivePopup(true)
    }
    const getBronTablePopup = async () => {
      const data = await GetRestaurantBronTableWithSlug(
        searchParams.get('table-bron-slug')
      )
      const updatedObject = { ...tableBronData }
      updatedObject.name = data?.data?.name
      setTableBronData(updatedObject)
    }
    getBronTablePopup()
    return () => {
      getBronTablePopup()
    }
  }, [searchParams.get('bron')])

  const { mutate: updateBronTable } = useMutation(
    (data) =>
      RestaurantBronTableUpdate(data, searchParams.get('table-bron-slug')),
    {
      onSuccess: () => {
        setIsActivePopup(false)
        setIsDisabledButton(false)
        router.back()
        toast.success(t('Edited successfully'))
        queryClient.invalidateQueries(['bron-table'])
        setBronName('')
      },
      onError: () => {
        setIsActivePopup(false)
        setIsDisabledButton(false)
        router.back()
        toast.error('Oops... Something went wrong!')
      },
    }
  )

  const handleChangeBronTableName = (e) => {
    const updatedObject = { ...tableBronData }
    updatedObject.name = e.target.value
    setTableBronData(updatedObject)
  }

  const handleSubmit = () => {
    setIsDisabledButton(true)
    updateBronTable({
      name: tableBronData.name,
    })
  }

  const handleClosePopup = (e) => {
    if (e.target.id === 'overlay') {
      setIsActivePopup(false)
      router.back()
    }
  }

  return (
    <div className={!isActivePopup ? styles.deactivePopup : styles.activePopup}>
      <div onClick={handleClosePopup} id="overlay" className={styles.overlay}>
        <div
          id="content"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="row w-[478px]">
            <div>
              <div className="ms-panel ms-panel-fh">
                <div className={styles.categoryHead}>
                  <h6>{t('Add Technical Service Form')}</h6>
                </div>
                <div className="ms-panel-body">
                  <form
                    className="needs-validation clearfix"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className="form-row">
                      <div className="col-md-12 mb-6">
                        <label
                          htmlFor="validationCustom18"
                          className={styles.label}
                        >
                          {t('Bron Name')}
                        </label>
                        <div className={styles.categoryName}>
                          <input
                            type="text"
                            id="validationCustom18"
                            placeholder={t('Bron Name')}
                            required
                            value={tableBronData?.name}
                            onChange={handleChangeBronTableName}
                          />
                          <div className="valid-feedback">
                            {t('Looks good!')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="ms-panel-header new">
                  <button
                    disabled={isDisabledButton}
                    className={styles.addBtn}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {t('Edit')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

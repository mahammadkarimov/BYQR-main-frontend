'use client'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CreateHotelBron } from '@/services/api/dataApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from '../CategoryPopup/categorypopup.module.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [isActivePopup, setIsActivePopup] = useState(false)
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [bronName, setBronName] = useState('')
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams(null)
  const t = useTranslations('Admin')

  useEffect(() => {
    if (searchParams.get('bron') === 'add-table-bron') {
      setIsActivePopup(true)
    }
  }, [searchParams.get('bron')])

  const { mutate: addBronTable } = useMutation(
    (data) => CreateHotelBron(data),
    {
      onSuccess: () => {
        setIsActivePopup(false)
        setIsDisabledButton(false)
        document.querySelectorAll('input').forEach((inp) => (inp.value = ''))
        router.back()
        toast.success(t('Add Bron'))
        queryClient.invalidateQueries(['bron-table'])
        setBronName('')
      },
      onError: () => {
        setIsActivePopup(false)
        setIsDisabledButton(false)
        document.querySelectorAll('input').forEach((inp) => (inp.value = ''))
        router.back()
        toast.error('Oops... Something went wrong!')
      },
    }
  )

  const handleSubmit = () => {
    setIsDisabledButton(true)
    addBronTable({
      name: bronName,
    })
  }

  const handleClosePopup = (e) => {
    if (e.target.id === 'overlay') {
      setIsActivePopup(false)
      document.querySelectorAll('input').forEach((inp) => (inp.value = ''))
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
                            onChange={(e) => setBronName(e.target.value)}
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
                    disabled={bronName === '' ? true : isDisabledButton}
                    className={styles.addBtn}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {t('Add')}
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

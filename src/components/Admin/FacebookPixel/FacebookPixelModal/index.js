'use client'
import React, { useState } from 'react'
import styles from '../style.module.css'
import { useMutation, useQuery } from 'react-query'
import { changeFacebokPixelId, getPixelId } from '@/services/api/dataApi'
import { toast } from 'react-toastify'

const index = ({ router, searchParams }) => {
    const [pixelId, setPixelId] = useState({
        fbpixel: ""
    })

    const { mutate: addPixelId } = useMutation({
        mutationFn: (data) => changeFacebokPixelId(data),
        onSuccess: () => {
            toast.success('Uğurla yaddaşda saxlanıldı!')
            router.back()
        },
        onError: () => {
            toast.error('Gözlənilməz xəta baş verdi!')
            router.back()
        }
    })

    const { _ } = useQuery('facebook-pixelid', getPixelId, {
        onSuccess: (data) => {
            console.log(data)
            setPixelId((prev) => ({
                ...prev,
                fbpixel: data?.data?.fbpixel
            }))
        }
    })

    return (
        <>
            {
                searchParams.get('modal') &&
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className={styles.pixelModal}>
                        <span>Facebook Pixel ID</span>
                        <input type="text" value={pixelId.fbpixel} onChange={(e) => setPixelId((prev) => ({
                            ...prev,
                            fbpixel: e.target.value
                        }))} />
                        <div>
                            <button onClick={() => router.back()}>Cancel</button>
                            <button onClick={() => addPixelId(pixelId)}>Connect</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default index
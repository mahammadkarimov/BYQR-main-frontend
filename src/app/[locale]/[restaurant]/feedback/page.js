'use client'
import React from 'react'
import RestaurantFeedback from '../../../../components/Hotel/RestaurantFeedback/RestaurantFeedback'
import RestaurantFeedbackSucces from '@/components/Hotel/RestaurantFeedbackSucces/RestaurantFeedbackSucces'
import { useSearchParams } from 'next/navigation'
import '../style.css'

const page = () => {
  const searchParams = useSearchParams()

  return (
    <div>
      {searchParams.get('feedback') === 'success'
        ?
        <RestaurantFeedbackSucces />
        :
        <RestaurantFeedback />
      }
    </div>
  )
}

export default page
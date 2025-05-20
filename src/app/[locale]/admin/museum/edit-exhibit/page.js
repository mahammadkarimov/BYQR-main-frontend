'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import ChooseLang2 from '../../../../../components/Admin/Museum/ChooseLang2/index'
import UploadArea2 from '../../../../../components/Admin/Museum/UploadArea2/index'
import TextArea2 from '../../../../../components/Admin/Museum/TextArea2/index'
import ContainerRow from '../../../../../components/Admin/Museum/ContainerRow/index'
import ContainerCol from '../../../../../components/Admin/Museum/ContainerCol/index'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  editExhibit,
  getExhibitData
} from '@/services/api/dataApi'
import { toast } from 'react-toastify'

const page = () => {
  const [name, setName] = useState({
    name_az: '',
    name_en: '',
    name_ko: '',
    name_ar: '',
    name_ru: ''
  })
  const [text, setText] = useState({
    text_az: '',
    text_en: '',
    text_ko: '',
    text_ar: '',
    text_ru: ''
  })
  const [sound, setSound] = useState({
    sound_az: '',
    sound_en: '',
    sound_ko: '',
    sound_ar: '',
    sound_ru: ''
  })
  const [image, setImage] = useState([{}])
  const [video, setVideo] = useState({
    video_az: '',
    video_en: '',
    video_ko: '',
    video_ar: '',
    video_ru: ''
  })
  const [preview, setPreview] = useState({
    preview_az: '',
    preview_en: '',
    preview_ko: '',
    preview_ar: '',
    preview_ru: ''
  })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  console.log(video, 'test')
  const queryClient = useQueryClient()
  const { data: exhibitData } = useQuery(
    'exhibit-data',
    () =>
      getExhibitData(
        searchParams.get('museumId'),
        searchParams.get('exhibitId')
      ),
    {
      onSuccess: data => {
        setName({
          name_az: data?.data?.name_az,
          name_en: data?.data?.name_en,
          name_ko: data?.data?.name_ko,
          name_ar: data?.data?.name_ar,
          name_ru: data?.data?.name_ru
        })
        setText({
          text_az: data?.data?.text_az,
          text_en: data?.data?.text_en,
          text_ko: data?.data?.text_ko,
          text_ar: data?.data?.text_ar,
          text_ru: data?.data?.text_ru
        })
        setImage({
          images: {
            image_1: data?.data?.image_1,
            image_2: data?.data?.image_2,
            image_3: data?.data?.image_3,
            image_4: data?.data?.image_4,
            image_5: data?.data?.image_5,
          },
          preview: {
            preview_1: '',
            preview_2: '',
            preview_3: '',
            preview_4: '',
            preview_5: '',
          }
         
        })
        setVideo({
          video_az: data?.data?.video_az,
          video_en: data?.data?.video_en,
          video_ko: data?.data?.video_ko,
          video_ar: data?.data?.video_ar,
          video_ru: data?.data?.video_ru
        })
        setSound({
          sound_az: data?.data?.sound_az,
          sound_en: data?.data?.sound_en,
          sound_ko: data?.data?.sound_ko,
          sound_ar: data?.data?.sound_ar,
          sound_ru: data?.data?.sound_ru
        })
        // setName(prev => ({...prev, [`name_${searchParams.get('lang')}`]: data?.data?.[`name_${searchParams.get('lang')}`]}))
      }
    }
  )

  const { mutate: editExhibitData } = useMutation(
    ['exhibit'],
    data => editExhibit(data),
    {
      onSuccess: () => {
        console.log('success')
        router.push(pathname.replace('edit-exhibit', ''))
        queryClient.invalidateQueries('exhibit')
        toast.success('Eskponat uğurla dəyişdirildi!')
      },
      onError: () => {
        console.log('error')
      }
    }
  )

  return (
    <AdminLayout>
      <ContainerRow>
        <ContainerCol>
          <ChooseLang2
            searchParams={searchParams}
            router={router}
            pathname={pathname}
          />
          <UploadArea2
            searchParams={searchParams}
            preview={preview}
            setPreview={setPreview}
            video={video}
            setVideo={setVideo}
            setImage={setImage}
            image={image}
            setSound={setSound}
            sound={sound}
          />
        </ContainerCol>
        <TextArea2
          editExhibitData={editExhibitData}
          sound={sound}
          image={image}
          video={video}
          searchParams={searchParams}
          text={text}
          setText={setText}
          setName={setName}
          name={name}
        />
      </ContainerRow>
    </AdminLayout>
  )
}

export default page

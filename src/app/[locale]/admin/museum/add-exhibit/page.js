'use client'
import React, { useState } from 'react'
import AdminLayout from '../../../../../components/AdminCommon/AdminLayout/AdminLayout'
import ChooseLang from '../../../../../components/Admin/Museum/ChooseLang/index'
import UploadArea from '../../../../../components/Admin/Museum/UploadArea/index'
import TextArea from '../../../../../components/Admin/Museum/TextArea/index'
import ContainerRow from '../../../../../components/Admin/Museum/ContainerRow/index'
import ContainerCol from '../../../../../components/Admin/Museum/ContainerCol/index'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'
import { createExhibit } from '@/services/api/dataApi'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

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
  const [additionalText, setAdditionalText] = useState({
    addText_az: '',
    addText_en: '',
    addText_ko: '',
    addText_ar: '',
    addText_ru: ''
  })
  const [sound, setSound] = useState({
    sound_az: '',
    sound_en: '',
    sound_ko: '',
    sound_ar: '',
    sound_ru: ''
  })
  const [image, setImage] = useState({
    activeId: '',
    previews: [
      {
        id: '',
        preview: '',
        timestamp: 0
      },
      {
        id: '',
        preview: '',
        timestamp: 0
      },
      {
        id: '',
        preview: '',
        timestamp: 0
      },
      {
        id: '',
        preview: '',
        timestamp: 0
      },
      {
        id: '',
        preview: '',
        timestamp: 0
      }
    ],
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: '',
    image_5: ''
  })
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

  const queryClient = useQueryClient()

  const { mutate: addExhibit, isLoading } = useMutation(
    ['exhibit'],
    data => createExhibit(data),
    {
      onSuccess: data => {
        console.log('data', data)
        router.push(pathname.replace('add-exhibit', ''))
        queryClient.invalidateQueries('exhibit')
        toast.success('Eskponat uğurla yaradıldı!')
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
          <ChooseLang
            searchParams={searchParams}
            router={router}
            pathname={pathname}
          />
          <UploadArea
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
        <TextArea
          setAdditionalText={setAdditionalText}
          additionalText={additionalText}
          addExhibit={addExhibit}
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
      {isLoading && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
          <ClipLoader color='#FF1212' loading={true} size={35} />
        </div>
      )}
    </AdminLayout>
  )
}

export default page

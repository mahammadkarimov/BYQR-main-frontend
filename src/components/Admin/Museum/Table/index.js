import React from 'react'
import './style.css'
import img from '../../../../assets/images/Home/product-card.png'
import Image from 'next/image'
import qr from '../../../../assets/icons/Admin/mainAdmin/qr.svg'
import edit from '../../../../assets/icons/Admin/mainAdmin/edit1.svg'
import del from '../../../../assets/icons/Admin/mainAdmin/del.svg'

const index = ({
  exhibitsData,
  searchParams,
  pathname,
  router,
  museumId,
  queryClient
}) => {
  async function handleDownload (imageUrl) {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' }) 
      if (!response.ok) throw new Error('Network response was not ok')
      const blob = await response.blob()

      const blobUrl = URL.createObjectURL(blob)

      let hidden_a = document.createElement('a')
      hidden_a.href = blobUrl
      hidden_a.setAttribute('download', imageUrl.split('/')[5].slice(8))
      document.body.appendChild(hidden_a)
      hidden_a.click()
      hidden_a.remove() 
    } catch (error) {
      console.error('Error while downloading the image:', error)
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Şəkil vəya video</th>
          <th>Eksponatın adı</th>
          <th>Düzəliş/Sil</th>
        </tr>
      </thead>
      <tbody>
        {exhibitsData?.data?.map(el => (
          <tr key={el.id}>
            <td className='text-center'>{el?.id}</td>
            <td>
              <div className='flex justify-center'>
                {el?.image && (
                  <Image
                    src={el?.image}
                    objectFit='cover'
                    width={100}
                    height={100}
                    alt='img'
                  />
                )}
              </div>
            </td>
            <td>{el?.[`name_${pathname.split('/')[1]}`]}</td>
            <td>
              <div className='button-area'>
                <button onClick={() => handleDownload(el?.qr_code)}>
                  <Image src={qr} alt='qr' />
                </button>
                <button
                  onClick={() => {
                    router.push(
                      `${pathname}/edit-exhibit?lang=${
                        pathname.split('/')[1]
                      }&exhibitId=${el.id}&museumId=${museumId}`
                    )
                    queryClient.invalidateQueries('exhibit-data')
                  }}
                >
                  <Image src={edit} alt='edit' />
                </button>
                <button
                  onClick={() =>
                    router.push(`${pathname}?delModal=true&exhibitId=${el.id}`)
                  }
                >
                  <Image src={del} alt='delete' />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default index

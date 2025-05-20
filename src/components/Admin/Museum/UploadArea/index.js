import React, { useRef } from 'react'
import del from '../../../../assets/icons/Admin/mainAdmin/del.svg'
import voice from '../../../../assets/icons/Admin/mainAdmin/voice.svg'
import plus2 from '../../../../assets/icons/Admin/mainAdmin/plus2.svg'
import Image from 'next/image'
import styles from './style.module.css'

const index = ({
  setSound,
  sound,
  image,
  setImage,
  video,
  setVideo,
  preview,
  setPreview,
  searchParams
}) => {
  const canvasRef = useRef(null)
  console.log(image)
  const test = image.previews.filter(preview => preview.preview)
  console.log(test)
  const sortedPreviews = image.previews
  .filter(preview => preview.preview) // Boş olmayanları seç
  .sort((a, b) => b.timestamp - a.timestamp); // Zaman damgasına göre sırala

console.log("Sıralanmış öğeler:", sortedPreviews);
  return (
    <div>
      <div>
        <div className={styles.container}>
          {(
            image.previews
              .filter(preview => preview.preview) // Boş olmayanları al
              .sort((a, b) => b.timestamp - a.timestamp) // Zaman damgasına göre sırala (azalan)
              .slice(0, 1) // Sadece ilkini al (en son ekleneni)
              .map((preview, index) => (
                <>
                  <Image
                    key={index}
                    src={preview.preview}
                    alt='image-preview'
                    width={400}
                    height={400}
                  />
                  <div
                    onClick={() =>
                      setImage(prevState => {
                        const updatedPreview = [...prevState.previews]

                        updatedPreview.forEach(el => {
                          if (el.id === preview.id) {
                            el.preview = ''
                          }
                        })
                        return {
                          ...prevState,
                          previews: updatedPreview,
                          [`image_${preview.id}`]: ''
                        }
                      })
                    }
                  >
                    <Image src={del} alt='del' />
                  </div>
                </>
              ))
          )}
        </div>
        <div className={styles.soundContainer}>
          <span>Sound</span>
          <div>
            <div>
              <Image src={voice} alt='voice' />
            </div>
            <div>
              <div className={styles.inputContainer}>
                <input
                  type='file'
                  onChange={e =>
                    setSound(prev => ({
                      ...prev,
                      [`sound_${searchParams.get('lang')}`]: e.target.files[0]
                    }))
                  }
                  className={styles.hiddenInput}
                />
                <span className={styles.visibleText}>
                  {sound[`sound_${searchParams.get('lang')}`]
                    ? sound[`sound_${searchParams.get('lang')}`].name.length >
                      60
                      ? sound[`sound_${searchParams.get('lang')}`].name.slice(
                          0,
                          60
                        ) + '...'
                      : sound[`sound_${searchParams.get('lang')}`].name.length
                    : 'Upload your media file...'}
                </span>
              </div>
              <div
                className={styles.delBtn}
                onClick={() =>
                  setSound(prev => ({
                    ...prev,
                    [`sound_${searchParams.get('lang')}`]: ''
                  }))
                }
              >
                <Image src={del} alt='del' />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.photoVideoContainer}>
          <div>
            <div>Foto</div>
            <div className='flex gap-3'>
              <div className={styles.borderPlus}>
                <input
                  type='file'
                  onChange={e => {
                    const file = e.target.files[0]
                    setImage(prevState => {
                      return {
                        ...prevState,
                        image_1: file,
                      }
                    })
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = function (e) {
                        setImage(prevState => {
                          const updatedPreview = [...prevState.previews]
                          updatedPreview[0].id = 1
                          updatedPreview[0].preview = e.target.result
                          updatedPreview[0].timestamp = Date.now()
                          return {
                            ...prevState,
                            previews: updatedPreview,
                          }
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className={styles.imgInput}
                />
                {image.previews[0].preview ? (
                  <Image
                    src={image.previews[0].preview}
                    width={200}
                    height={200}
                    className={styles.exhibitImg}
                    alt='image-preview'
                  />
                ) : (
                  <Image src={plus2} alt='plus2' />
                )}
              </div>
              <div className={styles.borderPlus}>
                <input
                  type='file'
                  onChange={e => {
                    const file = e.target.files[0]
                    setImage(prevState => {
                      return {
                        ...prevState,
                        image_2: file,
                        activeId: 2
                      }
                    })
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = function (e) {
                        setImage(prevState => {
                          const updatedPreview = [...prevState.previews]
                          updatedPreview[1].id = 2
                          updatedPreview[1].preview = e.target.result
                          updatedPreview[1].timestamp = Date.now()

                          return {
                            ...prevState,
                            previews: updatedPreview,
                          }
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className={styles.imgInput}
                />
                {image.previews[1].preview ? (
                  <Image
                    src={image.previews[1].preview}
                    width={200}
                    height={200}
                    className={styles.exhibitImg}
                    alt='image-preview'
                  />
                ) : (
                  <Image src={plus2} alt='plus2' />
                )}
              </div>
              <div className={styles.borderPlus}>
                <input
                  type='file'
                  onChange={e => {
                    const file = e.target.files[0]
                    setImage(prevState => {
                      return {
                        ...prevState,
                        image_3: file,
                      }
                    })
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = function (e) {
                        setImage(prevState => {
                          const updatedPreview = [...prevState.previews]
                          updatedPreview[2].id = 3
                          updatedPreview[2].preview = e.target.result
                          updatedPreview[2].timestamp = Date.now()

                          return {
                            ...prevState,
                            previews: updatedPreview,
                          }
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className={styles.imgInput}
                />
                {image.previews[2].preview ? (
                  <Image
                    src={image.previews[2].preview}
                    width={200}
                    height={200}
                    className={styles.exhibitImg}
                    alt='image-preview'
                  />
                ) : (
                  <Image src={plus2} alt='plus2' />
                )}
              </div>
              <div className={styles.borderPlus}>
                <input
                  type='file'
                  onChange={e => {
                    const file = e.target.files[0]
                    setImage(prevState => {
                      return {
                        ...prevState,
                        image_4: file,
                        activeId: 4
                      }
                    })
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = function (e) {
                        setImage(prevState => {
                          const updatedPreview = [...prevState.previews]
                          updatedPreview[3].id = 4
                          updatedPreview[3].preview = e.target.result
                          updatedPreview[3].timestamp = Date.now()

                          return {
                            ...prevState,
                            previews: updatedPreview,
                          }
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className={styles.imgInput}
                />
                {image.previews[3].preview ? (
                  <Image
                    src={image.previews[3].preview}
                    width={200}
                    height={200}
                    className={styles.exhibitImg}
                    alt='image-preview'
                  />
                ) : (
                  <Image src={plus2} alt='plus2' />
                )}
              </div>
              <div className={styles.borderPlus}>
                <input
                  type='file'
                  onChange={e => {
                    const file = e.target.files[0]
                    setImage(prevState => {
                      return {
                        ...prevState,
                        image_5: file,
                        activeId: 5
                      }
                    })
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = function (e) {
                        setImage(prevState => {
                          const updatedPreview = [...prevState.previews]
                          updatedPreview[4].id = 5
                          updatedPreview[4].preview = e.target.result
                          updatedPreview[4].timestamp = Date.now()

                          return {
                            ...prevState,
                            previews: updatedPreview,
                          }
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className={styles.imgInput}
                />
                {image.previews[4].preview ? (
                  <Image
                    src={image.previews[4].preview}
                    width={200}
                    height={200}
                    className={styles.exhibitImg}
                    alt='image-preview'
                  />
                ) : (
                  <Image src={plus2} alt='plus2' />
                )}
              </div>
            </div>
          </div>
          <div>
            <div>Video</div>
            {!preview[`preview_${searchParams.get('lang')}`] && (
              <div className={styles.borderPlus}>
                <input
                  type='file'
                  onChange={e => {
                    const file = e.target.files[0]
                    if (file) {
                      setVideo(prev => ({
                        ...prev,
                        [`video_${searchParams.get('lang')}`]: file
                      }))
                    }

                    const video = document.createElement('video')
                    video.src = URL.createObjectURL(file)

                    video.addEventListener('loadeddata', () => {
                      video.currentTime = 1

                      video.addEventListener(
                        'seeked',
                        () => {
                          const canvas = canvasRef.current
                          const ctx = canvas.getContext('2d')

                          canvas.width = video.videoWidth
                          canvas.height = video.videoHeight

                          ctx.drawImage(
                            video,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                          )

                          const dataURL = canvas.toDataURL('image/png')
                          console.log(dataURL)
                          setPreview(prev => ({
                            ...prev,
                            [`preview_${searchParams.get('lang')}`]: dataURL
                          }))
                        },
                        { once: true }
                      )
                    })
                  }}
                  className={styles.imgInput}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                <Image src={plus2} alt='plus2' />
              </div>
            )}
            {preview[`preview_${searchParams.get('lang')}`] && (
              <div>
                <input
                  type='file'
                  onChange={e => {
                    const file = e.target.files[0]
                    if (file) {
                      setVideo(prev => ({
                        ...prev,
                        [`video_${searchParams.get('lang')}`]: file
                      }))
                    }

                    const video = document.createElement('video')
                    video.src = URL.createObjectURL(file)

                    video.addEventListener('loadeddata', () => {
                      video.currentTime = 1

                      video.addEventListener(
                        'seeked',
                        () => {
                          const canvas = canvasRef.current
                          const ctx = canvas.getContext('2d')

                          canvas.width = video.videoWidth
                          canvas.height = video.videoHeight

                          ctx.drawImage(
                            video,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                          )

                          const dataURL = canvas.toDataURL('image/png')
                          console.log(dataURL)
                          setPreview(prev => ({
                            ...prev,
                            [`preview_${searchParams.get('lang')}`]: dataURL
                          }))
                        },
                        { once: true }
                      )
                    })
                  }}
                  className={styles.imgInput}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                <Image
                  src={preview[`preview_${searchParams.get('lang')}`]}
                  width={400}
                  height={400}
                  alt='preview'
                  className={styles.exhibitImg2}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default index

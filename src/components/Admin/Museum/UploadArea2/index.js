import React from 'react'
import del from '../../../../assets/icons/Admin/mainAdmin/del.svg'
import voice from '../../../../assets/icons/Admin/mainAdmin/voice.svg'
import plus2 from '../../../../assets/icons/Admin/mainAdmin/plus2.svg'
import videoImg from '../../../../assets/icons/Admin/mainAdmin/video.png'
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
  
  return (
    <div>
      <div>
        {/* <div className={styles.container}>
          {image.preview ? (
            <Image
              src={image.preview}
              alt='image-preview'
              width={400}
              height={400}
            />
          ) : image?.image ? (
            <Image
              src={image.image}
              alt='image-preview'
              width={400}
              height={400}
            />
          ) : (
            <Image
              src={image.preview}
              alt='image-preview'
              width={400}
              height={400}
            />
          )}
          <div
            onClick={() =>
              setImage(prev => ({ ...prev, image: '', preview: '' }))
            }
          >
            <Image src={del} alt='del' />
          </div>
        </div> */}
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
                  {typeof sound[`sound_${searchParams.get('lang')}`] ===
                    'string' &&
                  sound[`sound_${searchParams.get('lang')}`]?.startsWith(
                    'https'
                  ) &&
                  sound[`sound_${searchParams.get('lang')}`]?.split('/')[6]
                    ?.length < 40
                    ? sound[`sound_${searchParams.get('lang')}`]
                        .split('/')[6]
                        .slice(0, 40)
                    : typeof sound[`sound_${searchParams.get('lang')}`] ===
                        'object' &&
                      sound[`sound_${searchParams.get('lang')}`]?.name
                    ? sound[`sound_${searchParams.get('lang')}`]?.name?.length >
                      60
                      ? sound[`sound_${searchParams.get('lang')}`]?.name.slice(
                          0,
                          60
                        ) + '...'
                      : sound[`sound_${searchParams.get('lang')}`]?.name
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
            {
              <div className={styles.imgContainer}>
                {image.images &&
                  Object.entries(image.images)?.map((img, i) => (
                    <div key={i}>
                      <input
                        type='file'
                        onChange={e => {
                          const file = e.target.files[0]
                          const lastImages = image.images
                          lastImages[img[0]] = file
                          setImage(prevImages => ({
                            ...prevImages,
                            lastImages
                          }))
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = function (e) {
                              const lastPreview = image.preview
                              lastPreview[`preview_${i + 1}`] = e.target.result
                              setImage(prevImages => ({
                                ...prevImages,
                                lastPreview
                              }))
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className={styles.imgInput}
                      />
                      {!img[1] ? (
                        <Image
                        className='!max-w-6'
                          src={plus2}
                          width={200}
                          height={200}
                          alt='plus2'
                        />
                      ) : typeof img[1] === 'string' ? (
                        <Image
                          className='rounded-[9.6px] w-[123px] h-[83px] object-cover'
                          src={img[1]}
                          width={200}
                          height={200}
                          alt='plus2'
                        />
                      ) : (
                        <Image
                          src={image.preview[`preview_${i + 1}`]}
                          width={200}
                          height={200}
                          alt='plus2'
                        />
                      )}
                    </div>
                  ))}
              </div>
            }
          </div>
          <div className={styles.videoContainer}>
            <div>Video</div>
            {video[`video_${searchParams.get('lang')}`] ? (
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
                  }}
                  className={styles.imgInput}
                />
                <Image src={videoImg} alt='videoImg' />
              </div>
            ) : (
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
                  }}
                  className={styles.imgInput}
                />
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
                  className={styles.exhibitImg}
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

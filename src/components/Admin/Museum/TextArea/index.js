import React from 'react'
import styles from './style.module.css'

const index = ({
  name,
  setName,
  text,
  sound,
  image,
  video,
  setText,
  searchParams,
  addExhibit,
  additionalText,
  setAdditionalText
}) => {
  const { preview, ...restImages } = image

  return (
    <div className={styles.container}>
      <h2>Eksponat əlavə edin</h2>
      <div>
        <label htmlFor='name'>Eksponatın adı</label>
        <input
          type='text'
          value={name[`name_${searchParams.get('lang')}`]}
          onChange={e =>
            setName(prev => ({
              ...prev,
              [`name_${searchParams.get('lang')}`]: e.target.value
            }))
          }
          placeholder='Eksponatın adı'
        />
      </div>
      <div>
        <label htmlFor='about'>Haqqında</label>
        <textarea
          name='about'
          id='about'
          value={text[`text_${searchParams.get('lang')}`]}
          onChange={e =>
            setText(prev => ({
              ...prev,
              [`text_${searchParams.get('lang')}`]: e.target.value
            }))
          }
          placeholder='Ətraflı məlumat'
        ></textarea>
      </div>
      <div className={styles.addBtn}>
        <button
          onClick={() => {
            addExhibit({
              ...name,
              ...text,
              ...restImages,
              ...sound,
              ...video
            })
          }}
        >
          Əlavə et
        </button>
      </div>
    </div>
  )
}

export default index

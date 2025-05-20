import React, { useState } from 'react'
import styles from './style.module.css'
import imageIcon from '../../../../../../assets/icons/Admin/mainAdmin/image.png'
import test from '../../../../../../assets/images/Home/product-card.png'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getEventGenre, getMusicType, createRestEvent } from '@/services/api/dataApi'
import { toast } from 'react-toastify'

const index = ({ router, pathname, searchParams }) => {
    const [eventImg, setEventImg] = useState(imageIcon)
    const [eventData, setEventData] = useState({
        name: "",
        age: "",
        genre: "",
        music_type: "",
        entry_information: "",
        description: "",
        phone: "",
        address: "",
        map_url: "",
        start_date: "",
        image_files: "",
        start_time: "test"
    })
    const queryClient = useQueryClient()

    const { data: genreData } = useQuery(['event-genre'], () => getEventGenre())
    const { data: musicTypeData } = useQuery(['musict-type'], () => getMusicType())
    const { mutate: createEvent } = useMutation(['event-data'], (data) => createRestEvent(data), {
        onSuccess: () => {
            router.push(`${pathname.replace('add-event', '')}`)
            toast.success('Məlumatlar uğurla yeniləndi!')
            queryClient.invalidateQueries('events')
        },
        onError: () => {
            toast.error('Gözlənilməz xəta baş verdi!')
        }
    })

    const handleChangeImg = (e) => {
        const imgFile = e.target.files[0]
        if (imgFile) {
            setEventData(prev => ({ ...prev, image_files: e.target.files[0] }))
            const reader = new FileReader();

            reader.onload = function (e) {
                setEventImg(e.target.result)
            };

            reader.readAsDataURL(imgFile);
        }
    }

    const handleCreateEvent = () => {
        createEvent(eventData)
    }

    return (
        <div className={styles.container}>
            {/* <div>
                <h2>Fetiche Wine Music Tapast</h2>
            </div> */}
            <div className={styles.inputContainer}>
                <div className={styles.imgArea}>
                    <div>
                        <div>
                            <Image src={eventImg} className={(eventImg.src)?.includes('_next') ? '' : styles.eventImg} width={40} height={40} alt='image-icon' />
                            <span>Drop your image here, or <span>browse</span></span>
                        </div>
                        <input type="file" onChange={handleChangeImg} />
                    </div>
                </div>
                {searchParams.get('step2') ?
                    <div className={styles.inputArea}>
                        <div className='!mb-0'></div>
                        <div>
                            <input onChange={(e) => setEventData((prev) => ({ ...prev, phone: e.target.value }))} value={eventData.phone} type="text" placeholder='Enter the phone number' />
                            <input onChange={(e) => setEventData((prev) => ({ ...prev, address: e.target.value }))} value={eventData.address} type="text" placeholder='Address' />
                            <input onChange={(e) => setEventData((prev) => ({ ...prev, map_url: e.target.value }))} value={eventData.map_url} type="text" placeholder='Dowload a map' />
                            <button onClick={() => handleCreateEvent()}>Create Event</button>
                        </div>
                    </div> :
                    <div className={styles.inputArea}>
                        <div>
                            <div>
                                <input onChange={(e) => setEventData((prev) => ({ ...prev, start_date: e.target.value }))} type="text" value={eventData.start_date} placeholder='Time and date' />
                                <input onChange={(e) => setEventData((prev) => ({ ...prev, age: e.target.value }))} type="text" value={eventData.age} placeholder='Age (ex: 0-6, 18+)' />
                            </div>
                            <div>
                                <select onChange={(e) => setEventData((prev) => ({ ...prev, genre: +e.target.value }))} name="genre" id="genre">
                                    <option value="genre" defaultValue={'Genre'}>Genre</option>
                                    {genreData?.data?.results?.map((genre) => (
                                        <option value={genre.id}>{genre.name}</option>
                                    ))}
                                </select>
                                <select onChange={(e) => setEventData((prev) => ({ ...prev, music_type: +e.target.value }))} name="musictype" id="musictype">
                                    <option value="musictype" defaultValue={'Music Type'}>Music Type</option>
                                    {musicTypeData?.data?.results?.map(type => (
                                        <option value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <input type="text" onChange={(e) => setEventData((prev) => ({ ...prev, name: e.target.value }))} value={eventData.name} placeholder='Singer/band/dj name' />
                            <input type="text" onChange={(e) => setEventData((prev) => ({ ...prev, entry_information: e.target.value }))} value={eventData.entry_information} placeholder='Entry Information (entry free or reservation)' />
                            <input type="text" onChange={(e) => setEventData((prev) => ({ ...prev, description: e.target.value }))} value={eventData.description} placeholder='Event Description' />
                            <button onClick={() => router.push(`${pathname}?step2=true`)}>Continue</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default index
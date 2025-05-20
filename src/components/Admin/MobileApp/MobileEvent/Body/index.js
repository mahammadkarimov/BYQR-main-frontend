import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import eventImg from '../../../../../assets/images/Admin/mainAdmin/eventImg.svg'
import Image from 'next/image'

const index = ({ router, pathname, events, searchEvent, allEvents }) => {
    const [activeDots, setActiveDots] = useState(0)
    const [searchedEvents, setSearchedEvents] = useState([{}])
console.log(events)
    useEffect(() =>{
      const data=  allEvents?.data?.results?.filter((event) => ((event.name).toLowerCase().trim()).includes(searchEvent))
      setSearchedEvents(data)
    }, [events, searchEvent])

    return (
        <table className={styles.container}>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Published</th>
                </tr>
            </thead>
            <tbody>
                {searchEvent ? 
                   searchedEvents?.map((event) => (
                    <tr key={event?.id}>
                        <td>
                            <div>
                                {event?.images && <Image src={event?.images[0]?.image} width={200} height={200} alt='event-image' />}
                            </div>
                            <div>
                                <span>{event?.start_date}</span>
                                <h3>{event?.name}</h3>
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>Published</span>
                                <div className={styles.eventDetail}>
                                    <button onClick={() => activeDots !== event?.id ? setActiveDots(event?.id) : setActiveDots(0)} className={styles.dots}>...</button>
                                    <div className={activeDots == event?.id ? '!block' : '!hidden'}>
                                        <button onClick={() => router.push(`${pathname}?eventId=${event?.id}&deleteModal=true`)}>Sil</button>
                                        <button onClick={() => router.push(`${pathname}/edit-event?eventId=${event?.id}`)}>Düzəliş et</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                :
                events?.data?.results?.map((event) => (
                    <tr key={event?.id}>
                        <td>
                            <div>
                                {event?.images && <Image src={event?.images[0]?.image} width={200} height={200} alt='event-image' />}
                            </div>
                            <div>
                                <span>{event?.start_date}</span>
                                <h3>{event?.name}</h3>
                            </div>
                        </td>
                        <td>
                            <div>
                                <span>Published</span>
                                <div className={styles.eventDetail}>
                                    <button onClick={() => activeDots !== event?.id ? setActiveDots(event?.id) : setActiveDots(0)} className={styles.dots}>...</button>
                                    <div className={activeDots == event?.id ? '!block' : '!hidden'}>
                                        <button onClick={() => router.push(`${pathname}?eventId=${event?.id}&deleteModal=true`)}>Sil</button>
                                        <button onClick={() => router.push(`${pathname}/edit-event?eventId=${event?.id}`)}>Düzəliş et</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    )
}

export default index
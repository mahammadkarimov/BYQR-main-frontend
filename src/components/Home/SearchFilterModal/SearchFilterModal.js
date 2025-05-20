'use client'
import Image from 'next/image'
import React from 'react'
import styles from './searchfiltermodal.module.css'

import filterBar from '../../../assets/icons/HomeSearch/filterBar.svg'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { handleSearchFilter } from '@/redux/features/searchSlice'

const SearchFilterModal = () => {
    const selActiveFilter = useSelector((state) => state.searchFilter.isActiveFilter)
    const dispatch = useDispatch()

    const handleStartDrag = (_, data) => {
        console.log(data);
        if (data.y === 0) {
            dispatch(handleSearchFilter())
        }
    }

    return (
        <>
            <Draggable
                axis='y'
                defaultPosition={{ x: 0, y: 0 }}
                bounds={{ top: 0, bottom: 0 }}
                onDrag={handleStartDrag}
            >
                <div className={`${styles.filterContainer} ${selActiveFilter ? styles.showFilterContainer : styles.hiddenFilterContainer}`}>
                    <div>
                        <div className={styles.filterHeadContainer}>
                            <Image src={filterBar} alt='filter-bar' />
                            <h2>Filter</h2>
                        </div>
                        <div className='mb-[72px]'>
                            <div className={styles.searchContainer}>
                                <div className={styles.searchCategory}>
                                    <h3>Category</h3>
                                </div>
                                <div className={styles.filterBtnContainer}>
                                    <button>Breakfast</button>
                                    <button>Lunch</button>
                                    <button>Dinner</button>
                                </div>
                            </div>
                            <div>
                                <div className={styles.searchCategory}>
                                    <h3>Recipe Type</h3>
                                </div>
                                <div className={styles.filterBtnContainer}>
                                    <button>Salad</button>
                                    <button>Egg</button>
                                    <button>Cakes</button>
                                    <button>Chicken</button>
                                    <button>Meals</button>
                                    <button>Vegtables</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.filterBtns}>
                        <button>Apply Filter</button>
                        <button>Clear Filter</button>
                    </div>
                </div>
            </Draggable>

        </>

    )
}

export default SearchFilterModal
'use client'
import React, { useState } from 'react'
import styles from './mealsizearea.module.css'

const MealSizeArea = ({ sizes, mealSizeId, setMealSizeId }) => {
    return (
        <div className={styles.sizeArea}>
            <h3>Size</h3>
            <div className={styles.mealSizes}>
                {sizes?.map(size => (
                    <button className={mealSizeId === size.id ? styles.activeMealSizeBtn : styles.mealSizeBtn} onClick={() => setMealSizeId(size.id)} key={size.id}>{size.size}</button>
                ))}
            </div>
        </div>
    )
}

export default MealSizeArea
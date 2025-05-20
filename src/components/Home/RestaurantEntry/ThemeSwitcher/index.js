'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import moon from '../../../../assets/icons/Home/moon.svg'
import sun from '../../../../assets/icons/Home/sun.svg'

const Index = () => {
    const [theme, setTheme] = useState('light') 

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light'
        setTheme(storedTheme)
        document.body.className = storedTheme
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.body.className = newTheme
    }

    return (
        <button className='pt-4 pl-6' onClick={toggleTheme}>
            {theme === 'dark' ? (
                <Image src={sun} alt='sun' />
            ) : (
                <Image
                    src={moon}
                    style={{
                        filter:
                            'brightness(0) saturate(100%) invert(9%) sepia(6%) saturate(503%) hue-rotate(202deg) brightness(93%) contrast(93%)',
                    }}
                    alt='moon'
                />
            )}
        </button>
    )
}

export default Index

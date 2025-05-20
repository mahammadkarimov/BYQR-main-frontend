'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import azeFlag from '../../../assets/icons/Home/azeFlag.svg'
import russianFlag from '../../../assets/icons/Home/russianFlag.svg'
import ukFlag from '../../../assets/icons/Home/ukFlag.svg'

const page = () => {
    const router = useRouter()

    return (
        <>
            <section>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div>
                        <button onClick={() => router.push('/az/home')}>
                            <Image src={azeFlag} alt='aze-flag' />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => router.push('/en/home')}>
                            <Image src={ukFlag} alt='uk-flag' />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => router.push('/ru/home')}>
                            <Image src={russianFlag} alt='russian-flag' />
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
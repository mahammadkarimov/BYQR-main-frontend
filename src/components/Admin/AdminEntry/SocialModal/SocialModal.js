import React from 'react'

const SocialModal = ({ searchParams, router }) => {
    return (
        <div onClick={() => router.back()} className={searchParams?.get('modal1') ? styles.overlay : styles.deactive}>
            <div onClick={(e) => e.stopPropagation()} className={styles.container}>
                <div className={styles.head}>
                    <h3>Rəy bölməsi</h3>
                    <div onClick={() => router.back()}>
                        <Image src={x} alt='close' />
                    </div>
                </div>
                <div>
                    <div className={styles.input}>
                        <label htmlFor="tripadvisor">Tripadvisor</label>
                        <input type="text" placeholder='Tripadvisor linkini əlavə edin' />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="Google">Google</label>
                        <input type="text" placeholder='Google linkini əlavə edin' />
                    </div>
                </div>
                <div className={styles.save}>
                    <button>Yadda saxla</button>
                </div>
            </div>
        </div>
    )
}

export default SocialModal